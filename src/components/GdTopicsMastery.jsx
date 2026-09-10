import React, { useState, useEffect } from 'react';
import { gdTopicsData } from '../data/gdTopicsData';
import { evaluateWithGemini } from '../utils/ai';

const categories = [
  'ALL',
  'Defense & Security',
  'International Relations',
  'National Economy',
  'Socio-Economic',
  'Technology & Innovation',
  'Climate & Energy'
];

const GdTopicsMastery = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [morningMode, setMorningMode] = useState(false);
  const [morningTopics, setMorningTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // User Speech Practice & AI Evaluation State
  const [userSpeechText, setUserSpeechText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [aiReport, setAiReport] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSpeakingText, setIsSpeakingText] = useState(false);

  // Setup Web Speech API for voice recording
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
        setUserSpeechText(prev => prev + ' ' + transcript);
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
  }, []);

  // Filter topics
  const filteredTopics = (morningMode ? morningTopics : gdTopicsData).filter(t => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.leads.some(l => l.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          t.keyFacts.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Generate Daily 5 Morning Topics
  const generateMorningRoutine = () => {
    const shuffled = [...gdTopicsData].sort(() => 0.5 - Math.random());
    setMorningTopics(shuffled.slice(0, 5));
    setMorningMode(true);
    setSelectedCategory('ALL');
  };

  // Text-to-Speech (Listen to Opening Line or Facts)
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeakingText(true);
      utterance.onend = () => setIsSpeakingText(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  // Toggle Mic Recording
  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in this browser. You can type your speech draft in the box below.");
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
        console.error("Mic start failed:", err);
      }
    }
  };

  // AI Evaluation for Spoken GD / Lecturette
  const handleAiEvaluation = async () => {
    if (!selectedTopic) return;
    setIsEvaluating(true);
    setAiReport('');

    try {
      const prompt = `You are a STRICT GTO (Group Testing Officer) at an Indian Armed Forces SSB Board evaluating a candidate's Group Discussion / Lecturette presentation on the topic:

Topic: "${selectedTopic.title}"
Category: ${selectedTopic.category}
Standard 3 GTO Leads:
1. ${selectedTopic.leads[0]}
2. ${selectedTopic.leads[1]}
3. ${selectedTopic.leads[2]}

Candidate Spoken Presentation / Speech Text:
"${userSpeechText || 'No speech recorded.'}"

Evaluate strictly according to GTO Assessor Standards:
1. GTO Performance Rating (Out of 10) & Recommendation Odds %
2. Depth of Knowledge & Use of Verified Facts/Data Points (1-10)
3. Clarity of Structure, Group Impact & Power of Expression (1-10)
4. Specific Flaws Identified (e.g. lack of data, shallow arguments, aggressive or passive tone)
5. Actionable GTO Betterment Tips & Suggested High-Impact Speech Points to include next time.`;

      const result = await evaluateWithGemini(prompt);
      setAiReport(result);
    } catch (err) {
      setAiReport(`Evaluation Error: ${err.message}`);
    }
    setIsEvaluating(false);
  };

  return (
    <div className="gd-topics-mastery" style={{ padding: '0.5rem' }}>
      {/* Header Banner */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">🗣️ SSB Group Discussion (GD) & Lecturette Master Vault (55+ Topics)</h2>
        <p className="page-subtitle">
          Over 55 high-yield defense, geopolitical, socio-economic, and technological topics. Read 5 topics every morning, learn GTO discussion leads, key facts, and practice 3-minute speeches with AI feedback!
        </p>
      </div>

      {/* Morning Routine Generator Banner */}
      <div className="glass-card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(72, 187, 120, 0.15))', border: '1px solid var(--accent-primary)', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--accent-primary)', fontSize: '1.2rem' }}>
              🌅 Daily Morning Reading Routine
            </h3>
            <p style={{ margin: '0.3rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              {morningMode ? `Showing 5 randomly picked morning topics (${morningTopics.length} loaded)` : 'Generate a fresh set of 5 curated topics for your morning study & 3-minute speech practice.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={generateMorningRoutine}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-primary), #48bb78)',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              🎲 Generate 5 Morning Topics
            </button>

            {morningMode && (
              <button
                onClick={() => setMorningMode(false)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '10px',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                🌐 Show All 55+ Topics
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <input
              type="text"
              placeholder="Search GD Topics, leads, or facts (e.g. Agnipath, China, Navy, Artificial Intelligence)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1.2rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: selectedCategory === cat ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: selectedCategory === cat ? '#fff' : 'var(--text-primary)',
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                {cat === 'ALL' ? '🌟 All Categories' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics List Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {filteredTopics.map((topic) => {
          const isSelected = selectedTopic?.id === topic.id;
          return (
            <div
              key={topic.id}
              className="glass-card"
              style={{
                borderLeft: '5px solid var(--accent-primary)',
                padding: '1.5rem'
              }}
            >
              {/* Card Title & Category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 'bold' }}>
                    {topic.category}
                  </span>
                  <h3 className="card-title" style={{ marginTop: '0.5rem', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                    {topic.id}. {topic.title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    if (isSelected) {
                      setSelectedTopic(null);
                    } else {
                      setSelectedTopic(topic);
                      setUserSpeechText('');
                      setAiReport('');
                    }
                  }}
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    background: isSelected ? '#eab308' : 'var(--accent-primary)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {isSelected ? 'Close Speech Mode' : '🎤 Practice Speech Mode'}
                </button>
              </div>

              {/* 3 GTO Discussion Leads */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: '10px', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  🎯 3 Standard SSB GTO Discussion Leads:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {topic.leads.map((lead, lIdx) => (
                    <div key={lIdx} style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--accent-primary)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      <strong>Lead {lIdx + 1}:</strong> {lead}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Facts & Statistics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(72, 187, 120, 0.3)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#48bb78', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    📊 Key Verified Facts & Data Points to Quote:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                    {topic.keyFacts.map((fact, fIdx) => (
                      <li key={fIdx}>{fact}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'rgba(236, 72, 153, 0.08)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#ec4899', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    ⚖️ Pros vs Cons Core Arguments:
                  </div>
                  <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    <strong style={{ color: '#48bb78' }}>Pros: </strong>
                    <span style={{ color: 'var(--text-primary)' }}>{topic.pros.join(' • ')}</span>
                    <br />
                    <strong style={{ color: '#f56565', marginTop: '0.5rem', display: 'inline-block' }}>Cons: </strong>
                    <span style={{ color: 'var(--text-primary)' }}>{topic.cons.join(' • ')}</span>
                  </div>
                </div>
              </div>

              {/* Opening & Conclusion Lines */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <strong style={{ color: '#eab308', fontSize: '0.9rem' }}>💬 Sample GTO Opening Statement:</strong>
                  <button
                    onClick={() => speakText(topic.openingLine)}
                    style={{ padding: '0.3rem 0.75rem', borderRadius: '6px', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    🔊 Listen Audio
                  </button>
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  "{topic.openingLine}"
                </div>

                <strong style={{ color: '#48bb78', fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>🤝 Synthesized Group Conclusion Line:</strong>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontStyle: 'italic' }}>
                  "{topic.conclusionLine}"
                </div>
              </div>

              {/* Interactive Speech Practice Box (When Selected) */}
              {isSelected && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '2px dashed var(--accent-primary)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                    🎙️ Practice 3-Minute Speech for Topic #{topic.id}
                  </h4>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Your Spoken Presentation Draft / Speech Transcript:</label>
                      <button
                        onClick={toggleRecording}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          border: isRecording ? '2px solid #f56565' : '1px solid #48bb78',
                          background: isRecording ? 'rgba(245, 101, 101, 0.2)' : 'rgba(72, 187, 120, 0.15)',
                          color: isRecording ? '#f56565' : '#48bb78',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        {isRecording ? '🔴 Stop Mic Recording' : '🎤 Speak Speech (Voice Mic)'}
                      </button>
                    </div>

                    <textarea
                      rows="5"
                      placeholder="Click 'Speak Speech' or type your 3-minute Lecturette speech points here..."
                      value={userSpeechText}
                      onChange={(e) => setUserSpeechText(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color)',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                      }}
                    />
                  </div>

                  <button
                    onClick={handleAiEvaluation}
                    disabled={isEvaluating}
                    style={{
                      padding: '0.75rem 1.75rem',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, var(--accent-primary), #48bb78)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.95rem'
                    }}
                  >
                    {isEvaluating ? 'Evaluating Speech with Gemini AI GTO...' : '🏆 Submit Speech for GTO Evaluation'}
                  </button>

                  {aiReport && (
                    <div style={{ marginTop: '1.25rem', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', borderTop: '3px solid #48bb78', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                      <h4 style={{ color: '#48bb78', margin: '0 0 0.75rem 0' }}>🤖 GTO Assessor Speech Evaluation Report</h4>
                      {aiReport}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GdTopicsMastery;
