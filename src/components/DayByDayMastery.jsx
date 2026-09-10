import React, { useState, useEffect } from 'react';
import { master30DaysData } from '../data/master30DaysData';
import { evaluateWithGemini } from '../utils/ai';

const DayByDayMastery = () => {
  const [selectedDayNum, setSelectedDayNum] = useState(1);
  const [completedDays, setCompletedDays] = useState(() => {
    const saved = localStorage.getItem('ssb_30days_completed');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistent Saved Responses map: { [dayNum]: { userStory, userMcqAnswers, userWatAnswers, userSrtAnswers, userPiAnswers, aiReport, testPhase } }
  const [savedResponsesMap, setSavedResponsesMap] = useState(() => {
    const saved = localStorage.getItem('ssb_30days_responses');
    return saved ? JSON.parse(saved) : {};
  });

  // Task 1 Study Timer State
  const [studyTimer, setStudyTimer] = useState(0); // in seconds
  const [studyTimerActive, setStudyTimerActive] = useState(false);

  // Task 2 Test Execution States
  const [testPhase, setTestPhase] = useState('idle'); // 'idle' | 'running' | 'done'
  const [testTimeLeft, setTestTimeLeft] = useState(0);
  const [userMcqAnswers, setUserMcqAnswers] = useState({});
  const [userStory, setUserStory] = useState('');
  const [userTatAnswers, setUserTatAnswers] = useState({});
  const [userWatAnswers, setUserWatAnswers] = useState({});
  const [userSrtAnswers, setUserSrtAnswers] = useState({});
  const [userPiAnswers, setUserPiAnswers] = useState({});
  const [currentWatIndex, setCurrentWatIndex] = useState(0);

  // AI Evaluation State
  const [aiReport, setAiReport] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const currentDayData = master30DaysData.find(d => d.day === selectedDayNum) || master30DaysData[0];

  // Save completion status & responses map to localStorage
  useEffect(() => {
    localStorage.setItem('ssb_30days_completed', JSON.stringify(completedDays));
  }, [completedDays]);

  useEffect(() => {
    localStorage.setItem('ssb_30days_responses', JSON.stringify(savedResponsesMap));
  }, [savedResponsesMap]);

  // Load saved day data whenever selectedDayNum changes
  useEffect(() => {
    setStudyTimer(currentDayData.task1Study.durationMinutes * 60);
    setStudyTimerActive(false);
    setTestTimeLeft(currentDayData.task2Test.timeLimitSeconds || 600);
    setCurrentWatIndex(0);

    const savedForDay = savedResponsesMap[selectedDayNum];
    if (savedForDay) {
      setUserStory(savedForDay.userStory || '');
      setUserTatAnswers(savedForDay.userTatAnswers || {});
      setUserMcqAnswers(savedForDay.userMcqAnswers || {});
      setUserWatAnswers(savedForDay.userWatAnswers || {});
      setUserSrtAnswers(savedForDay.userSrtAnswers || {});
      setUserPiAnswers(savedForDay.userPiAnswers || {});
      setAiReport(savedForDay.aiReport || '');
      setTestPhase(savedForDay.testPhase || 'done');
    } else {
      setUserStory('');
      setUserTatAnswers({});
      setUserMcqAnswers({});
      setUserWatAnswers({});
      setUserSrtAnswers({});
      setUserPiAnswers({});
      setAiReport('');
      setTestPhase('idle');
    }
  }, [selectedDayNum]);

  // Auto-save current day responses helper
  const saveDayResponse = (updatedFields = {}) => {
    setSavedResponsesMap(prev => {
      const currentSaved = prev[selectedDayNum] || {};
      const newDayPayload = {
        ...currentSaved,
        userStory,
        userTatAnswers,
        userMcqAnswers,
        userWatAnswers,
        userSrtAnswers,
        userPiAnswers,
        aiReport,
        testPhase,
        updatedAt: new Date().toISOString(),
        ...updatedFields
      };
      return {
        ...prev,
        [selectedDayNum]: newDayPayload
      };
    });
  };

  // Study Timer Interval
  useEffect(() => {
    let interval = null;
    if (studyTimerActive && studyTimer > 0) {
      interval = setInterval(() => {
        setStudyTimer(t => t - 1);
      }, 1000);
    } else if (studyTimer === 0) {
      setStudyTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [studyTimerActive, studyTimer]);

  // Test Countdown Timer Interval
  useEffect(() => {
    let interval = null;
    if (testPhase === 'running' && testTimeLeft > 0) {
      interval = setInterval(() => {
        setTestTimeLeft(t => t - 1);
      }, 1000);
    } else if (testTimeLeft === 0 && testPhase === 'running') {
      setTestPhase('done');
      saveDayResponse({ testPhase: 'done' });
    }
    return () => clearInterval(interval);
  }, [testPhase, testTimeLeft]);

  const toggleDayCompletion = (dayNum) => {
    if (completedDays.includes(dayNum)) {
      setCompletedDays(completedDays.filter(d => d !== dayNum));
    } else {
      setCompletedDays([...completedDays, dayNum]);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startTest = () => {
    setTestPhase('running');
    setTestTimeLeft(currentDayData.task2Test.timeLimitSeconds || 600);
  };

  const submitTest = () => {
    setTestPhase('done');
    saveDayResponse({ testPhase: 'done' });
  };

  const resetDayResponse = () => {
    if (window.confirm(`Are you sure you want to clear saved answers and AI report for Day ${selectedDayNum}?`)) {
      setUserStory('');
      setUserTatAnswers({});
      setUserMcqAnswers({});
      setUserWatAnswers({});
      setUserSrtAnswers({});
      setUserPiAnswers({});
      setAiReport('');
      setTestPhase('idle');
      
      setSavedResponsesMap(prev => {
        const copy = { ...prev };
        delete copy[selectedDayNum];
        return copy;
      });
    }
  };

  // Run Gemini AI Evaluation for Day's submission & save result
  const handleAiEvaluation = async () => {
    setIsEvaluating(true);
    setAiReport('');
    try {
      const prompt = `You are a STRICT Armed Forces SSB Board Assessor (acting simultaneously as Senior SSB Psychologist, Interviewing Officer IO, and GTO) evaluating Candidate Performance for Day ${currentDayData.day} (${currentDayData.title}).

Evaluation Persona & Guidelines:
- Be realistic, professional, direct, and uncompromising (Strict SSB Selection Standard). Do NOT give superficial praise or inflated marks.
- Assess Officer Like Qualities (OLQs) across all 4 Factors:
  * Factor I: Planning & Reasoning (Effective Intelligence, Reasoning Ability, Organizing Ability, Power of Expression)
  * Factor II: Social Adjustment (Social Adaptability, Cooperation, Sense of Responsibility)
  * Factor III: Social Effectiveness (Self-Confidence, Speed of Decision, Ability to Influence Group, Liveliness)
  * Factor IV: Dynamic (Determination, Courage, Stamina)
- Point out hidden psychological flaws, moralizing tone in WATs (e.g. using 'should/must'), passive/escapist responses in PPDT/TAT/SRT, unrealistic heroism, or vague PI responses.

CANDIDATE SUBMISSION DATA FOR DAY ${currentDayData.day}:
- Focus Area: ${currentDayData.focus}
- Test Type: ${currentDayData.task2Test.type}

1. OIR MCQ Scorecard: ${oirScore ? `${oirScore.correct}/${oirScore.total} (${oirScore.percent}%)` : 'N/A'}

2. PPDT Written Story Response:
"${userStory || 'No response provided'}"

3. TAT Stories Responses (1 to 3):
${JSON.stringify(userTatAnswers, null, 2)}

4. WAT Word Responses:
${JSON.stringify(userWatAnswers, null, 2)}

5. SRT Reactions Responses:
${JSON.stringify(userSrtAnswers, null, 2)}

6. Personal Interview (PI) Spoken Answers Draft:
${JSON.stringify(userPiAnswers, null, 2)}

Format your evaluation report strictly into these 5 clear sections:

🏛️ 1. BOARD OVERALL VERDICT & RECOMMENDATION ODDS
- Recommendation Status: [ RECOMMENDED / NOT RECOMMENDED ]
- Estimated Selection Odds: [e.g. 78%]
- OIR Rating Equivalent: [e.g. OIR 1 / OIR 2]

📊 2. OLQ PROFILE SCORECARD (1 to 10 Scale for each Factor)
- Factor I (Intellectual & Planning): X / 10
- Factor II (Social Adjustment & Teamwork): X / 10
- Factor III (Leadership & Social Effectiveness): X / 10
- Factor IV (Courage, Stamina & Dynamics): X / 10

🚨 3. STRICT ASSESSOR'S CRITIQUE & RED FLAGS IDENTIFIED
- Highlight any passive hero traits, moralizing/preachy WAT words (using 'should/must'), incomplete SRT reactions, or superficial PI answers.

💡 4. ACTIONABLE TACTICS & TIPS FOR DAY 4 IMPROVEMENT
- Provide 3-4 exact, concrete sentences/tactics on how to rewrite or fix identified weaknesses.

🔥 5. STRICT ASSESSOR'S FINAL WORDS OF MOTIVATION & COMMAND
- A sharp, motivating closing command fit for an Armed Forces Officer candidate.`;

      const result = await evaluateWithGemini(prompt);
      setAiReport(result);
      saveDayResponse({ aiReport: result, testPhase: 'done' });
    } catch (err) {
      setAiReport(`AI Evaluation Error: ${err.message}`);
    }
    setIsEvaluating(false);
  };

  // Score calculation for OIR MCQs
  const calculateOirScore = () => {
    const questions = currentDayData.task2Test.oirQuestions || [];
    if (questions.length === 0) return null;
    let correct = 0;
    questions.forEach(q => {
      if (userMcqAnswers[q.id] === q.answer) correct++;
    });
    return { correct, total: questions.length, percent: Math.round((correct / questions.length) * 100) };
  };

  const oirScore = calculateOirScore();
  const isCurrentDayDone = completedDays.includes(selectedDayNum);
  const hasSavedResponse = !!savedResponsesMap[selectedDayNum];

  return (
    <div className="day-by-day-mastery">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-title">🏆 30-Day Master SSB Preparation Operating System</h2>
        <p className="page-subtitle">
          Execute Day 1 to Day 30 systematically. All your daily answers and Gemini AI evaluation reports are automatically saved locally!
        </p>
      </div>

      {/* Global 30-Day Progress Bar */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            Overall SSB Preparation Progress: {completedDays.length} / 30 Days Completed
          </span>
          <span style={{ fontWeight: 'bold', color: '#48bb78', fontSize: '1.3rem' }}>
            {Math.round((completedDays.length / 30) * 100)}%
          </span>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${(completedDays.length / 30) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), #48bb78)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Day Selector Navigation Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
          Select Preparation Day (Days 1 to 30):
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '0.5rem' }}>
          {master30DaysData.map(d => {
            const isDone = completedDays.includes(d.day);
            const isSaved = !!savedResponsesMap[d.day];
            const isSelected = selectedDayNum === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setSelectedDayNum(d.day)}
                style={{
                  padding: '0.6rem 0.2rem',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid var(--accent-primary)' : isDone ? '1px solid #48bb78' : isSaved ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--accent-primary)' : isDone ? 'rgba(72, 187, 120, 0.15)' : isSaved ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-secondary)',
                  color: isSelected ? '#fff' : isDone ? '#48bb78' : isSaved ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                {isDone ? `✓ ${d.day}` : isSaved ? `💾 ${d.day}` : `D${d.day}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Banner */}
      <div className="glass-card" style={{ marginBottom: '2rem', borderLeft: '5px solid var(--accent-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Week {currentDayData.week} • {currentDayData.focus}
            </div>
            <h3 className="card-title" style={{ marginTop: '0.25rem' }}>{currentDayData.title}</h3>
            {hasSavedResponse && (
              <div style={{ color: '#48bb78', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '0.25rem' }}>
                💾 Saved Response & AI Report Loaded from Local Storage
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {hasSavedResponse && (
              <button
                onClick={resetDayResponse}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #f56565',
                  background: 'rgba(245, 101, 101, 0.1)',
                  color: '#f56565',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                🔄 Retake Day {selectedDayNum}
              </button>
            )}

            <button
              onClick={() => toggleDayCompletion(selectedDayNum)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                border: isCurrentDayDone ? 'none' : '1px solid #48bb78',
                background: isCurrentDayDone ? '#48bb78' : 'transparent',
                color: isCurrentDayDone ? '#fff' : '#48bb78',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              {isCurrentDayDone ? '✅ Day Completed!' : 'Mark Day as Complete'}
            </button>
          </div>
        </div>
      </div>

      {/* ----------------- TASK 1: TIMED CONCEPT STUDY SESSION ----------------- */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <h3 className="card-title" style={{ color: 'var(--accent-primary)' }}>
            Task 1: Timed Concept Study Session ({currentDayData.task1Study.durationMinutes} Mins)
          </h3>

          {/* Study Timer Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-error)' }}>
              ⏱️ {formatTime(studyTimer)}
            </span>
            <button
              onClick={() => setStudyTimerActive(!studyTimerActive)}
              style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {studyTimerActive ? 'Pause' : 'Start Study Timer'}
            </button>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', color: 'var(--text-primary)', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
          <h4 style={{ color: '#48bb78', marginBottom: '0.5rem' }}>{currentDayData.task1Study.title}</h4>
          {currentDayData.task1Study.theory}
        </div>
      </div>

      {/* ----------------- TASK 2: REAL-EXAM TIMED PRACTICE TEST ----------------- */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <h3 className="card-title" style={{ color: 'var(--accent-primary)' }}>
            Task 2: Real-Exam Timed Practice Test ({currentDayData.task2Test.type})
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {testPhase === 'running' && (
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-error)' }}>
                ⏱️ Exam Timer: {formatTime(testTimeLeft)}
              </span>
            )}

            {testPhase === 'idle' && (
              <button
                onClick={startTest}
                style={{ padding: '0.75rem 1.75rem', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent-primary), #48bb78)', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
              >
                🚀 Start Real-Exam Timed Test
              </button>
            )}
          </div>
        </div>

        {testPhase === 'idle' && (
          <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              Click <strong>"Start Real-Exam Timed Test"</strong> above to launch the countdown timer and begin your practice session under real SSB examination pressure.
            </p>
          </div>
        )}

        {(testPhase === 'running' || testPhase === 'done') && (
          <div>
            {/* OIR Questions Test Interface */}
            {currentDayData.task2Test.oirQuestions && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {currentDayData.task2Test.oirQuestions.map((q, qIdx) => (
                  <div key={q.id} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                      Q{qIdx + 1}. {q.question}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userMcqAnswers[q.id] === opt;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              const updated = { ...userMcqAnswers, [q.id]: opt };
                              setUserMcqAnswers(updated);
                              saveDayResponse({ userMcqAnswers: updated });
                            }}
                            disabled={testPhase === 'done'}
                            style={{
                              padding: '0.65rem 1rem',
                              borderRadius: '8px',
                              border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                              background: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                              color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                              fontWeight: isSelected ? 'bold' : 'normal',
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {testPhase === 'done' && (
                      <div style={{ background: userMcqAnswers[q.id] === q.answer ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                        <strong style={{ color: userMcqAnswers[q.id] === q.answer ? '#48bb78' : '#f56565' }}>
                          {userMcqAnswers[q.id] === q.answer ? '✓ Correct!' : `✗ Incorrect (Correct: ${q.answer})`}
                        </strong>
                        <div style={{ color: 'var(--text-primary)', marginTop: '0.25rem' }}>{q.explanation}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* PPDT Single Picture Interface */}
            {currentDayData.task2Test.ppdtPicture && (
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                  📸 PPDT Story Practice ({currentDayData.task2Test.ppdtPicture.title})
                </h4>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <img
                    src={currentDayData.task2Test.ppdtPicture.image}
                    alt="PPDT Practice"
                    style={{ maxWidth: '450px', width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Write Your PPDT Story Response:</label>
                  <textarea
                    rows="6"
                    value={userStory}
                    onChange={(e) => {
                      setUserStory(e.target.value);
                      saveDayResponse({ userStory: e.target.value });
                    }}
                    placeholder="Write your story following the 4-part structure (Context -> Trigger -> Action Plan -> Outcome)..."
                    style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.6' }}
                  />
                </div>
              </div>
            )}

            {/* TAT Multi-Picture Interface */}
            {currentDayData.task2Test.tatPictures && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h4 style={{ color: 'var(--accent-primary)', margin: 0 }}>
                  🎨 TAT (Thematic Apperception Test) - 3 Stories
                </h4>
                {currentDayData.task2Test.tatPictures.map((tat, tIdx) => (
                  <div key={tIdx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                      TAT Slide {tIdx + 1}: {tat.title}
                    </div>
                    {tat.image ? (
                      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <img
                          src={tat.image}
                          alt={tat.title}
                          style={{ maxWidth: '400px', width: '100%', borderRadius: '10px', border: '1px solid var(--border-color)' }}
                        />
                      </div>
                    ) : (
                      <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '10px', textAlign: 'center', marginBottom: '1rem', border: '2px dashed var(--accent-primary)' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                          🖼️ Blank Slide (Original Hero Story)
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          Imagine your own hero facing a real-life challenge and achieving a positive outcome.
                        </div>
                      </div>
                    )}
                    <textarea
                      rows="5"
                      placeholder={`Write TAT Story ${tIdx + 1} (Context -> Action -> Outcome)...`}
                      value={userTatAnswers[tIdx] || ''}
                      onChange={(e) => {
                        const updated = { ...userTatAnswers, [tIdx]: e.target.value };
                        setUserTatAnswers(updated);
                        saveDayResponse({ userTatAnswers: updated });
                      }}
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6' }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* WAT Words Interface */}
            {currentDayData.task2Test.watWords && (
              <div>
                <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                    Target Word ({currentWatIndex + 1} of {currentDayData.task2Test.watWords.length})
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', margin: '0.5rem 0' }}>
                    {currentDayData.task2Test.watWords[currentWatIndex]}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Type your sentence..."
                    value={userWatAnswers[currentWatIndex] || ''}
                    onChange={(e) => {
                      const updated = { ...userWatAnswers, [currentWatIndex]: e.target.value };
                      setUserWatAnswers(updated);
                      saveDayResponse({ userWatAnswers: updated });
                    }}
                    style={{ flex: 1, padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem' }}
                  />
                  <button
                    onClick={() => setCurrentWatIndex(prev => (prev + 1) % currentDayData.task2Test.watWords.length)}
                    style={{ padding: '0.85rem 1.5rem', borderRadius: '8px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Next Word →
                  </button>
                </div>
              </div>
            )}

            {/* SRT Scenarios Interface */}
            {currentDayData.task2Test.srtScenarios && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentDayData.task2Test.srtScenarios.map((sc, sIdx) => (
                  <div key={sIdx} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Scenario {sIdx + 1}: "{sc}"
                    </div>
                    <textarea
                      rows="2"
                      placeholder="He..."
                      value={userSrtAnswers[sIdx] || ''}
                      onChange={(e) => {
                        const updated = { ...userSrtAnswers, [sIdx]: e.target.value };
                        setUserSrtAnswers(updated);
                        saveDayResponse({ userSrtAnswers: updated });
                      }}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* PI / GTO Questions Interface */}
            {currentDayData.task2Test.piQuestions && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentDayData.task2Test.piQuestions.map((q, pIdx) => (
                  <div key={pIdx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                      Q{pIdx + 1}: {q}
                    </div>
                    <textarea
                      rows="3"
                      placeholder="Draft your spoken answer..."
                      value={userPiAnswers[pIdx] || ''}
                      onChange={(e) => {
                        const updated = { ...userPiAnswers, [pIdx]: e.target.value };
                        setUserPiAnswers(updated);
                        saveDayResponse({ userPiAnswers: updated });
                      }}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)' }}
                    />
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button
                onClick={submitTest}
                style={{ padding: '0.75rem 2rem', borderRadius: '8px', background: '#48bb78', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
              >
                Submit Test & Save Response
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ----------------- TASK 3: EVALUATION & AI SCORECARD ----------------- */}
      <div className="glass-card" style={{ marginBottom: '2rem', borderTop: '4px solid #48bb78' }}>
        <h3 className="card-title" style={{ color: '#48bb78', marginBottom: '1rem' }}>
          Task 3: Instant Evaluation & AI Scorecard
        </h3>

        {/* OIR Automated Scorecard */}
        {oirScore && (
          <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.1rem' }}>OIR MCQ Test Scorecard:</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
                Correct: {oirScore.correct} / {oirScore.total}
              </div>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: oirScore.percent >= 80 ? '#48bb78' : 'var(--accent-primary)' }}>
              {oirScore.percent}% {oirScore.percent >= 80 ? '(OIR Rating 1 Candidate)' : '(Keep Practicing)'}
            </div>
          </div>
        )}

        {/* Gemini AI Evaluation Trigger */}
        <button
          className="option-btn"
          onClick={handleAiEvaluation}
          disabled={isEvaluating}
          style={{
            background: 'linear-gradient(135deg, var(--accent-primary), #48bb78)',
            color: '#fff',
            padding: '0.9rem 2.5rem',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            fontSize: '1.05rem',
            cursor: 'pointer'
          }}
        >
          {isEvaluating ? 'Evaluating Day Response with Gemini 3.6 Flash...' : aiReport ? `🔄 Re-Evaluate Day ${selectedDayNum} with AI` : `🤖 Evaluate Day ${selectedDayNum} Performance with AI`}
        </button>

        {aiReport && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ color: 'var(--accent-primary)', margin: 0 }}>🤖 Gemini AI Evaluation Report</h4>
              <span style={{ fontSize: '0.8rem', color: '#48bb78', fontWeight: 'bold' }}>
                💾 Saved to Local Storage
              </span>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', color: 'var(--text-primary)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
              {aiReport}
            </div>
          </div>
        )}
      </div>

      {/* ----------------- TASK 4: DAY COMPLETION BADGE ----------------- */}
      <div className="glass-card" style={{ textAlign: 'center', padding: '2rem' }}>
        <h3 className="card-title" style={{ color: isCurrentDayDone ? '#48bb78' : 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {isCurrentDayDone ? `🎉 Day ${selectedDayNum} Mastered & Badge Earned!` : `Complete Day ${selectedDayNum} Tasks`}
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {isCurrentDayDone ? 'Awesome work! Your answers and AI report are saved.' : 'Once you finish your study session, practice test, and evaluation, mark this day as complete.'}
        </p>

        <button
          onClick={() => toggleDayCompletion(selectedDayNum)}
          style={{
            padding: '0.9rem 2.5rem',
            borderRadius: '10px',
            border: 'none',
            background: isCurrentDayDone ? '#48bb78' : 'var(--accent-primary)',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.05rem',
            cursor: 'pointer'
          }}
        >
          {isCurrentDayDone ? '✓ Day Completed (Click to Toggle)' : `Mark Day ${selectedDayNum} as Complete ✓`}
        </button>
      </div>
    </div>
  );
};

export default DayByDayMastery;
