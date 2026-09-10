import React, { useState, useEffect } from 'react';
import { evaluateWithGemini } from '../utils/ai';

const defaultWeek1Tasks = {
  day1: { title: "Day 1: OIR Dice Rules & PPDT Box Marking", tasks: [
    { id: "d1_t1", text: "Study OIR Dice & Cube rules in Screening Masterclass", done: false },
    { id: "d1_t2", text: "Solve 25 OIR Practice MCQs (Target: 90%+ accuracy)", done: false },
    { id: "d1_t3", text: "Learn PPDT Perception Box coding format: [Gender][Age][Mood]", done: false },
    { id: "d1_t4", text: "Practice 30-second observation on PPDT Picture 1", done: false }
  ]},
  day2: { title: "Day 2: OIR Coding Shortcuts & PPDT Story Structure", tasks: [
    { id: "d2_t1", text: "Memorize EJOTY alphabet positions & reverse letter pairs", done: false },
    { id: "d2_t2", text: "Solve 25 OIR Verbal Coding MCQs", done: false },
    { id: "d2_t3", text: "Learn 4-part Story Structure (Context -> Trigger -> Action -> Outcome)", done: false },
    { id: "d2_t4", text: "Write 1 PPDT story within 4 minutes timer", done: false }
  ]},
  day3: { title: "Day 3: Blood Relations & 1-Minute Narration Blueprint", tasks: [
    { id: "d3_t1", text: "Master Family Tree (+ male, - female) shortcut method", done: false },
    { id: "d3_t2", text: "Solve 25 OIR Direction & Blood Relation MCQs", done: false },
    { id: "d3_t3", text: "Study the 1-Minute Narration Script Blueprint (0-10s, 10-45s, 45-60s)", done: false },
    { id: "d3_t4", text: "Perform 3 Mirror Narration Drills without looking at sheet", done: false }
  ]},
  day4: { title: "Day 4: Syllogisms & GD Leadership Tactics", tasks: [
    { id: "d4_t1", text: "Master Venn Diagram Syllogism rules", done: false },
    { id: "d4_t2", text: "Solve 25 OIR Syllogism & Logic MCQs", done: false },
    { id: "d4_t3", text: "Study GD tactics: Early entry, supporting others, handling fish-market", done: false },
    { id: "d4_t4", text: "Record 1-minute narration on phone and check for fluency", done: false }
  ]},
  day5: { title: "Day 5: Non-Verbal Figures & Solved PPDT Scenarios", tasks: [
    { id: "d5_t1", text: "Study Non-Verbal rotation & mirror image elimination tricks", done: false },
    { id: "d5_t2", text: "Solve 25 OIR Non-Verbal Reasoning MCQs", done: false },
    { id: "d5_t3", text: "Analyze all 4 Solved PPDT Scenarios & Narration Scripts", done: false },
    { id: "d5_t4", text: "Practice 1 timed PPDT writing test on Picture 2", done: false }
  ]},
  day6: { title: "Day 6: Full Stage 1 Mock Simulation 1", tasks: [
    { id: "d6_t1", text: "Attempt Full OIR Test 1 (40 MCQs in 17 minutes)", done: false },
    { id: "d6_t2", text: "Conduct Full PPDT Mock (30s picture -> 4m story -> 1m narration)", done: false },
    { id: "d6_t3", text: "Review incorrect OIR answers & refine story action plan", done: false }
  ]},
  day7: { title: "Day 7: Full Mock Simulation 2 & AI Evaluation", tasks: [
    { id: "d7_t1", text: "Attempt Full OIR Test 2 (Target OIR-1 rating)", done: false },
    { id: "d7_t2", text: "Write PPDT Story & Narration in AI Evaluator tool below", done: false },
    { id: "d7_t3", text: "Run Gemini AI Evaluation for PPDT Recommendation probability", done: false },
    { id: "d7_t4", text: "Review Navy General Awareness & Fleet commands basics", done: false }
  ]}
};

const Week1Plan = () => {
  const [tasksState, setTasksState] = useState(() => {
    const saved = localStorage.getItem('ssb_week1_tasks');
    return saved ? JSON.parse(saved) : defaultWeek1Tasks;
  });

  const [activeDay, setActiveDay] = useState('day1');

  // AI Practice Tool States
  const [selectedPic, setSelectedPic] = useState('/ppdt1.png');
  const [heroBox, setHeroBox] = useState('M 22 +');
  const [actionBox, setActionBox] = useState('Organizing Rural Water Conservation');
  const [storyText, setStoryText] = useState('');
  const [narrationScript, setNarrationScript] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    localStorage.setItem('ssb_week1_tasks', JSON.stringify(tasksState));
  }, [tasksState]);

  const toggleTask = (dayKey, taskId) => {
    setTasksState(prev => {
      const dayTasks = prev[dayKey].tasks.map(t => 
        t.id === taskId ? { ...t, done: !t.done } : t
      );
      return {
        ...prev,
        [dayKey]: { ...prev[dayKey], tasks: dayTasks }
      };
    });
  };

  // Calculate Overall Progress
  let totalTasks = 0;
  let completedTasks = 0;
  Object.keys(tasksState).forEach(d => {
    tasksState[d].tasks.forEach(t => {
      totalTasks++;
      if (t.done) completedTasks++;
    });
  });
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  // Gemini AI Evaluation for Stage 1 PPDT
  const handleAiEvaluation = async () => {
    if (!storyText.trim()) {
      alert("Please write a PPDT story first before running AI evaluation.");
      return;
    }

    setIsEvaluating(true);
    setAiResult('');
    try {
      const prompt = `You are an expert Indian Armed Forces SSB Psychologist assessing Day 1 Stage-1 Screening (PPDT).

Candidate's PPDT Submission:
- Picture Choice: ${selectedPic}
- Perception Box Coding: ${heroBox}
- Main Theme/Action: ${actionBox}
- Written Story (4 mins): "${storyText}"
- Spoken Narration Draft (1 min): "${narrationScript || 'Same as story'}"

Please provide a detailed evaluation with the following structured format:
1. PPDT Recommendation Probability (High / Medium / Low)
2. Perception Box & Theme Assessment
3. Story Structure & Action Plan Review (Context, Action, Outcome)
4. Officer Like Qualities (OLQs) Demonstrated (e.g. Initiative, Resourcefulness, Organizing Ability)
5. Crucial Improvements for Narration & Group Discussion`;

      const result = await evaluateWithGemini(prompt);
      setAiResult(result);
    } catch (err) {
      setAiResult(`Error evaluating PPDT: ${err.message}`);
    }
    setIsEvaluating(false);
  };

  return (
    <div className="week1-plan">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-title">Week 1 Prep Roadmap (Stage 1 Screening Mastery)</h2>
        <p className="page-subtitle">
          Your 7-day step-by-step blueprint to achieve OIR-1 rating and clear PPDT screening. Track daily tasks and get instant AI evaluations!
        </p>
      </div>

      {/* Progress Bar */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
            Week 1 Screening Progress: {completedTasks} / {totalTasks} Tasks Completed
          </span>
          <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '1.2rem' }}>
            {progressPercent}%
          </span>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), #48bb78)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {Object.keys(tasksState).map((dKey, idx) => {
          const dayInfo = tasksState[dKey];
          const isDone = dayInfo.tasks.every(t => t.done);
          return (
            <button
              key={dKey}
              onClick={() => setActiveDay(dKey)}
              className={`option-btn ${activeDay === dKey ? 'active' : ''}`}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '0.95rem',
                background: activeDay === dKey ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: activeDay === dKey ? '#fff' : 'var(--text-secondary)',
                border: activeDay === dKey ? 'none' : '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              {isDone ? '✅' : `Day ${idx + 1}`}
            </button>
          );
        })}
      </div>

      {/* Active Day Checklist */}
      <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
        <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
          {tasksState[activeDay].title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {tasksState[activeDay].tasks.map(task => (
            <label
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: '10px',
                background: task.done ? 'rgba(72, 187, 120, 0.08)' : 'var(--bg-secondary)',
                border: task.done ? '1px solid #48bb78' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(activeDay, task.id)}
                style={{ width: '20px', height: '20px', accentColor: '#48bb78', cursor: 'pointer' }}
              />
              <span style={{
                fontSize: '1rem',
                color: task.done ? '#48bb78' : 'var(--text-primary)',
                textDecoration: task.done ? 'line-through' : 'none',
                fontWeight: task.done ? '600' : '400'
              }}>
                {task.text}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ----------------- AI STAGE 1 PPDT EVALUATOR ----------------- */}
      <div className="glass-card" style={{ borderTop: '4px solid var(--accent-primary)' }}>
        <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
          🤖 Stage 1 PPDT AI Evaluator (Gemini 3.6 Flash)
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Practice your Day 1 PPDT story & narration script below. Get instant AI evaluation of your perception coding, story structure, OLQs, and screening recommendation probability!
        </p>

        {/* Picture Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Select PPDT Hazy Picture:</label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[
              { id: '/ppdt1.png', label: 'Picture 1 (Rural Bridge)' },
              { id: '/ppdt2.png', label: 'Picture 2 (Study Room)' },
              { id: '/ppdt3.png', label: 'Picture 3 (River Bank)' },
              { id: '/ppdt4.png', label: 'Picture 4 (Factory Floor)' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPic(p.id)}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  border: selectedPic === p.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: selectedPic === p.id ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-secondary)',
                  color: selectedPic === p.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontWeight: selectedPic === p.id ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Picture Display & Box Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div>
            <img 
              src={selectedPic} 
              alt="PPDT Practice" 
              style={{ width: '100%', maxHeight: '280px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Hero Box Coding (Gender Age Mood):</label>
              <input
                type="text"
                value={heroBox}
                onChange={(e) => setHeroBox(e.target.value)}
                placeholder="e.g. M 22 +"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>Main Theme / Action Box:</label>
              <input
                type="text"
                value={actionBox}
                onChange={(e) => setActionBox(e.target.value)}
                placeholder="e.g. Organizing Water Conservation Project"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        </div>

        {/* Written Story Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Written PPDT Story (4 Minutes):</label>
          <textarea
            rows="5"
            placeholder="Write your story following the 4-part structure (Context -> Trigger -> Action Plan -> Outcome)..."
            value={storyText}
            onChange={(e) => setStoryText(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.6' }}
          />
        </div>

        {/* Spoken Narration Draft */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Spoken 1-Minute Narration Script (Optional):</label>
          <textarea
            rows="3"
            placeholder="Good morning friends. I perceived... My story theme is..."
            value={narrationScript}
            onChange={(e) => setNarrationScript(e.target.value)}
            style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}
          />
        </div>

        {/* AI Evaluate Button */}
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
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
          }}
        >
          {isEvaluating ? 'Evaluating with Gemini 3.6 Flash...' : '🚀 Evaluate Stage 1 Readiness with AI'}
        </button>

        {/* AI Output Card */}
        {aiResult && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>🤖 Gemini AI Evaluation Report</h4>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', color: 'var(--text-primary)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
              {aiResult}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Week1Plan;
