import React, { useState, useEffect } from 'react';
import { evaluateWithGemini } from '../utils/ai';

const mockInterviewCategories = [
  {
    id: "cat1",
    name: "PIQ Rapid-Fire 1: Education, Family & Achievements",
    description: "Classic SSB IO Rapid-Fire covering 5 connected questions in one continuous spoken flow.",
    questions: [
      "Tell me about your academic performance from 10th grade through graduation. Why did your marks fluctuate, which subjects did you enjoy most, and how did you choose your degree?",
      "Describe your family background, your parents' occupations, your relationship with your siblings, and how you manage your personal pocket money or monthly expenses.",
      "What are your top 3 extracurricular achievements, hobbies, and how do you spend your leisure time during weekends?"
    ]
  },
  {
    id: "cat2",
    name: "Naval SSC Motivation & Career Backup Plans",
    description: "Probing your passion for the Indian Navy, technical awareness, and career maturity.",
    questions: [
      "Why specifically do you want to join the Indian Navy as a Short Service Commission Officer rather than joining a corporate IT or engineering job?",
      "What backup plans do you have if you do not get recommended in this SSB attempt?",
      "Tell me about recent naval acquisitions, frigates, or submarine exercises that you have been following in defence news."
    ]
  },
  {
    id: "cat3",
    name: "Crisis, Past Failures & Group Disagreements",
    description: "Testing emotional stability, moral courage, self-reflection, and problem-solving under stress.",
    questions: [
      "Describe a situation in your life where you faced severe failure or disappointment. What was the root cause and what did you learn from it?",
      "Have you ever had a major disagreement with a teacher, professor, or team leader? How did you resolve it without causing conflict?",
      "Tell me about a time when you had to take an unethical shortcut or saw someone breaking rules. How did you react?"
    ]
  }
];

const MockInterviewRoom = () => {
  const [selectedCategory, setSelectedCategory] = useState(mockInterviewCategories[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [spokenAnswersMap, setSpokenAnswersMap] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  
  // AI Evaluation State
  const [aiReport, setAiReport] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Initialize Web Speech Recognition API if supported by browser
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = 'en-US';

      recog.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSpokenAnswersMap(prev => ({
          ...prev,
          [currentQuestionIndex]: (prev[currentQuestionIndex] || '') + ' ' + transcript
        }));
      };

      recog.onerror = (err) => {
        console.error("Speech Recognition Error:", err);
        setIsRecording(false);
      };

      recog.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recog);
    }
  }, [currentQuestionIndex]);

  const currentQuestion = selectedCategory.questions[currentQuestionIndex];

  // Text-to-Speech (IO Speaks Question)
  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeakingQuestion(true);
      utterance.onend = () => setIsSpeakingQuestion(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  // Toggle Voice Recording
  const toggleRecording = () => {
    if (!recognition) {
      alert("Web Speech API Voice Recording is not supported in your browser. You can type your answer directly in the text box below.");
      return;
    }

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start recording:", err);
      }
    }
  };

  // Run Gemini AI Interviewing Officer Evaluation
  const handleAiEvaluation = async () => {
    setIsEvaluating(true);
    setAiReport('');

    const formattedTranscript = selectedCategory.questions.map((q, idx) => {
      return `IO Question ${idx + 1}: "${q}"\nCandidate Spoken Answer: "${spokenAnswersMap[idx] || 'No answer recorded.'}"\n`;
    }).join('\n');

    try {
      const prompt = `You are a STRICT Senior Indian Armed Forces SSB Interviewing Officer (IO / Board President) conducting a face-to-face Personal Interview evaluation.

Interview Category: ${selectedCategory.name}
Full Interview Transcript (Questions & Spoken Candidate Responses):
${formattedTranscript}

Evaluate the candidate strictly according to Indian Armed Forces SSB Standards:

Provide your report in these 5 structured sections:

🏛️ 1. INTERVIEWING OFFICER (IO) VERDICT & RECOMMENDATION ODDS
- Spoken Performance Grade: [ RECOMMENDED / NOT RECOMMENDED ]
- Estimated Selection Probability: [e.g. 82%]
- Overall Spoken Impact Rating: [Out of 10]

🎙️ 2. POWER OF EXPRESSION & SPOKEN DELIVERY AUDIT
- Fluency, Voice Clarity & Structure: [Rating 1-10]
- Confidence & Eye-Contact Tone: [Rating 1-10]
- Factual Accuracy & Naval Knowledge: [Rating 1-10]

📊 3. OLQs DEMONSTRATED IN SPOKEN ANSWERS
- Identify specific OLQs projected (e.g. Effective Intelligence, Self-Confidence, Sense of Responsibility, Moral Courage).

🚨 4. CRITICAL FLAWS & RED FLAGS IN CANDIDATE'S RESPONSES
- Pinpoint vague answers, hesitation, excuses, defensive tone, lack of naval details, or moralizing language.

💡 5. BETTERMENT PLAN & RE-PHRASED SPOKEN SENTENCE REWRITES
- For each answer where the candidate was weak, provide the EXACT, superior officer-grade spoken response they should deliver instead.`;

      const result = await evaluateWithGemini(prompt);
      setAiReport(result);
    } catch (err) {
      setAiReport(`Evaluation Error: ${err.message}`);
    }
    setIsEvaluating(false);
  };

  return (
    <div className="mock-interview-room" style={{ padding: '0.5rem' }}>
      {/* Header */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">🎙️ Interactive SSB Voice Mock Interview Room</h2>
        <p className="page-subtitle">
          Practice speaking your interview responses out loud! Listen to the Interviewing Officer (IO) ask questions, record your voice live, and receive a strict SSB IO Evaluation report with re-phrased betterment tips.
        </p>
      </div>

      {/* Category Selection */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          SELECT INTERVIEW CATEGORY:
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {mockInterviewCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentQuestionIndex(0);
                setAiReport('');
              }}
              style={{
                padding: '1.25rem',
                borderRadius: '12px',
                border: selectedCategory.id === cat.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: selectedCategory.id === cat.id ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '1rem', color: selectedCategory.id === cat.id ? 'var(--accent-primary)' : 'var(--text-primary)' }}>
                {cat.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                {cat.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interview Question & Voice Recorder Stage */}
      <div className="glass-card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--accent-primary)' }}>
        {/* Question Header & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 'bold' }}>
              Question {currentQuestionIndex + 1} of {selectedCategory.questions.length}
            </span>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.6' }}>
              "{currentQuestion}"
            </h3>
          </div>

          <button
            onClick={speakQuestion}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              background: isSpeakingQuestion ? '#eab308' : 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.95rem'
            }}
          >
            🔊 {isSpeakingQuestion ? 'Speaking Question...' : 'Listen to IO Voice'}
          </button>
        </div>

        {/* Spoken Answer Input Area */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Your Spoken Response / Transcript:</label>
            
            <button
              onClick={toggleRecording}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                border: isRecording ? '2px solid #f56565' : '1px solid #48bb78',
                background: isRecording ? 'rgba(245, 101, 101, 0.2)' : 'rgba(72, 187, 120, 0.15)',
                color: isRecording ? '#f56565' : '#48bb78',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {isRecording ? '🔴 Stop Voice Recording' : '🎤 Speak Answer (Voice Mic)'}
            </button>
          </div>

          <textarea
            rows="6"
            placeholder="Click 'Speak Answer' to record your voice or type your spoken response here..."
            value={spokenAnswersMap[currentQuestionIndex] || ''}
            onChange={(e) => setSpokenAnswersMap({ ...spokenAnswersMap, [currentQuestionIndex]: e.target.value })}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              lineHeight: '1.6'
            }}
          />
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentQuestionIndex === 0 ? 0.5 : 1
            }}
          >
            ← Previous Question
          </button>

          {currentQuestionIndex < selectedCategory.questions.length - 1 ? (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Next Question →
            </button>
          ) : (
            <button
              onClick={handleAiEvaluation}
              disabled={isEvaluating}
              style={{
                padding: '0.85rem 2rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-primary), #48bb78)',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              {isEvaluating ? 'Evaluating Interview with Gemini AI...' : '🏆 Submit Full Interview for IO Assessment'}
            </button>
          )}
        </div>
      </div>

      {/* AI Evaluation Report Display */}
      {aiReport && (
        <div className="glass-card" style={{ borderTop: '4px solid #48bb78', padding: '1.75rem' }}>
          <h3 style={{ color: '#48bb78', marginBottom: '1rem' }}>
            🤖 Senior Interviewing Officer (IO) Evaluation & Betterment Report
          </h3>

          <div style={{
            background: 'var(--bg-secondary)',
            padding: '1.5rem',
            borderRadius: '12px',
            color: 'var(--text-primary)',
            lineHeight: '1.8',
            whiteSpace: 'pre-wrap'
          }}>
            {aiReport}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewRoom;
