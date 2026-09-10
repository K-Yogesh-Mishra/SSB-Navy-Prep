import React, { useState } from 'react';
import { oirAdvancedVault, personalInterviewVault } from '../data/questionBankData';

const QuestionBankMastery = () => {
  const [activeTab, setActiveTab] = useState('oirVault'); // 'oirVault' | 'oirSolved' | 'piVault'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const toggleSolution = (id) => {
    setRevealedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = selectedCategory === 'All' 
    ? oirAdvancedVault.solvedQuestions 
    : oirAdvancedVault.solvedQuestions.filter(q => q.category === selectedCategory);

  return (
    <div className="question-bank-mastery">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-title">OIR & Personal Interview Question Vault</h2>
        <p className="page-subtitle">
          Master un-explained OIR problem types (Cube Cutting, Clock Angles, Seating Rank) with step-by-step formulas and solved SSB Personal Interview (PI) blueprints.
        </p>
      </div>

      {/* Main Switcher */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('oirVault')}
          className={`option-btn ${activeTab === 'oirVault' ? 'active' : ''}`}
          style={{
            padding: '0.85rem 1.5rem',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1rem',
            background: activeTab === 'oirVault' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            color: activeTab === 'oirVault' ? '#fff' : 'var(--text-secondary)',
            border: activeTab === 'oirVault' ? 'none' : '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          🧮 OIR Formula & Solving Algorithms
        </button>

        <button
          onClick={() => setActiveTab('oirSolved')}
          className={`option-btn ${activeTab === 'oirSolved' ? 'active' : ''}`}
          style={{
            padding: '0.85rem 1.5rem',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1rem',
            background: activeTab === 'oirSolved' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            color: activeTab === 'oirSolved' ? '#fff' : 'var(--text-secondary)',
            border: activeTab === 'oirSolved' ? 'none' : '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          📝 Solved OIR Problems & Methods
        </button>

        <button
          onClick={() => setActiveTab('piVault')}
          className={`option-btn ${activeTab === 'piVault' ? 'active' : ''}`}
          style={{
            padding: '0.85rem 1.5rem',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1rem',
            background: activeTab === 'piVault' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            color: activeTab === 'piVault' ? '#fff' : 'var(--text-secondary)',
            border: activeTab === 'piVault' ? 'none' : '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          🎙️ Personal Interview (PI) Question Bank
        </button>
      </div>

      {/* ------------------ OIR FORMULA VAULT ------------------ */}
      {activeTab === 'oirVault' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {oirAdvancedVault.categories.map((cat) => (
            <div key={cat.id} className="glass-card">
              <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{cat.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>{cat.formulaSummary}</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                {cat.formulas.map((f, i) => (
                  <div key={i} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 'bold' }}>{f.label}</div>
                    <div style={{ color: '#48bb78', fontWeight: 'bold', fontSize: '1.05rem', marginTop: '0.35rem' }}>{f.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                ⚡ <strong>Solving Method:</strong> {cat.method}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ------------------ SOLVED OIR PROBLEMS ------------------ */}
      {activeTab === 'oirSolved' && (
        <div>
          {/* Category Filter */}
          <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {["All", "Cube Cutting", "Clock Math", "Line Ranking", "Direction & Shadow", "Missing Matrix Logic"].map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: selectedCategory === c ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: selectedCategory === c ? '#fff' : 'var(--text-secondary)',
                  fontWeight: selectedCategory === c ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Q{idx + 1}. [{q.category}]
                  </span>
                  <span style={{ color: '#48bb78', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Answer: {q.answer}
                  </span>
                </div>

                <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: '500', marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                  {q.question}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                  {q.options.map((opt, oIdx) => (
                    <div 
                      key={oIdx} 
                      style={{
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: opt === q.answer ? '1px solid #48bb78' : '1px solid var(--border-color)',
                        background: opt === q.answer ? 'rgba(72, 187, 120, 0.15)' : 'var(--bg-secondary)',
                        color: opt === q.answer ? '#48bb78' : 'var(--text-primary)',
                        fontWeight: opt === q.answer ? 'bold' : 'normal'
                      }}
                    >
                      {opt} {opt === q.answer && '✓'}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => toggleSolution(q.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-primary)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    padding: '0.5rem 0'
                  }}
                >
                  {revealedSolutions[q.id] ? '▲ Hide Step-by-Step Solving Calculation' : '▼ Reveal Step-by-Step Solving Calculation'}
                </button>

                {revealedSolutions[q.id] && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-primary)', color: 'var(--text-primary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                    <strong>Step-by-Step Method:</strong>
                    <p style={{ marginTop: '0.5rem' }}>{q.method}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------ PERSONAL INTERVIEW VAULT ------------------ */}
      {activeTab === 'piVault' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Rapid Fire Sequences */}
          <div className="glass-card">
            <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              ⚡ Rapid-Fire Question Sequences (Interviewing Officer Barrage)
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              In the SSB interview, the officer asks 5 to 10 questions together without pausing. You must remember all questions in order and answer them sequentially.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {personalInterviewVault.rapidFireSequences.map((rf, idx) => (
                <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ color: '#48bb78', marginBottom: '0.75rem' }}>{rf.title}</h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '1rem', fontSize: '0.95rem' }}>
                    {rf.questions.map((q, qIdx) => <li key={qIdx}>{q}</li>)}
                  </ul>
                  <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.75rem', borderRadius: '8px', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>
                    💡 Strategy: {rf.strategy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Probing Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ color: 'var(--text-primary)' }}>High-Yield Probing Interview Questions</h3>

            {personalInterviewVault.probingQuestions.map((pq) => (
              <div key={pq.id} className="glass-card">
                <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                  Question: "{pq.question}"
                </h4>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', fontStyle: 'italic' }}>
                  🧠 Psychological Intent: {pq.intent}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ background: 'rgba(245, 101, 101, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f56565' }}>
                    <div style={{ color: '#f56565', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>❌ Avoid / Weak Answer</div>
                    <div style={{ color: 'var(--text-primary)', marginTop: '0.25rem', fontSize: '0.95rem' }}>"{pq.weakAnswer}"</div>
                  </div>

                  <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
                    <div style={{ color: '#48bb78', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>✅ Recommended Officer Answer</div>
                    <div style={{ color: 'var(--text-primary)', marginTop: '0.25rem', fontSize: '0.95rem', fontWeight: '500' }}>"{pq.idealAnswer}"</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {pq.keyPoints.map((kp, kIdx) => (
                    <span key={kIdx} style={{ background: 'var(--bg-secondary)', color: 'var(--accent-primary)', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                      ✨ {kp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBankMastery;
