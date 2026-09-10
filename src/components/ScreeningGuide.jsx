import React, { useState } from 'react';
import { oirGuide, ppdtGuide } from '../data/screeningData';

const ScreeningGuide = () => {
  const [activeTab, setActiveTab] = useState('OIR'); // 'OIR' | 'PPDT'
  const [subTab, setSubTab] = useState('tricks'); // 'tricks' | 'questions' for OIR, 'rules' | 'narration' | 'solved' for PPDT
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleOptionSelect = (qId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: option }));
  };

  return (
    <div className="screening-guide">
      {/* Page Header */}
      <div className="page-header">
        <h2 className="page-title">Stage 1 Screening Masterclass (OIR & PPDT)</h2>
        <p className="page-subtitle">
          Master Day 1 Screening. Learn OIR shortcuts, PPDT box marking rules, 1-minute narration blueprints, GD tactics, and explore solved questionnaires.
        </p>
      </div>

      {/* Main Switcher: OIR vs PPDT */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => {
            setActiveTab('OIR');
            setSubTab('tricks');
          }}
          className={`option-btn ${activeTab === 'OIR' ? 'active' : ''}`}
          style={{
            padding: '0.85rem 1.75rem',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1.05rem',
            background: activeTab === 'OIR' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            color: activeTab === 'OIR' ? '#ffffff' : 'var(--text-secondary)',
            border: activeTab === 'OIR' ? 'none' : '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          1. OIR Test Masterclass (Verbal & Non-Verbal)
        </button>

        <button
          onClick={() => {
            setActiveTab('PPDT');
            setSubTab('rules');
          }}
          className={`option-btn ${activeTab === 'PPDT' ? 'active' : ''}`}
          style={{
            padding: '0.85rem 1.75rem',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1.05rem',
            background: activeTab === 'PPDT' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
            color: activeTab === 'PPDT' ? '#ffffff' : 'var(--text-secondary)',
            border: activeTab === 'PPDT' ? 'none' : '1px solid var(--border-color)',
            cursor: 'pointer'
          }}
        >
          2. PPDT & Narration / GD Masterclass
        </button>
      </div>

      {/* ------------------- OIR MASTERCLASS ------------------- */}
      {activeTab === 'OIR' && (
        <div>
          {/* Sub Nav */}
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setSubTab('tricks')}
              style={{
                background: 'none', border: 'none', color: subTab === 'tricks' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: subTab === 'tricks' ? '700' : '500', fontSize: '1rem', cursor: 'pointer',
                borderBottom: subTab === 'tricks' ? '2px solid var(--accent-primary)' : 'none', paddingBottom: '0.5rem'
              }}
            >
              ⚡ Shortcut Tricks & Core Rules
            </button>
            <button
              onClick={() => setSubTab('questions')}
              style={{
                background: 'none', border: 'none', color: subTab === 'questions' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: subTab === 'questions' ? '700' : '500', fontSize: '1rem', cursor: 'pointer',
                borderBottom: subTab === 'questions' ? '2px solid var(--accent-primary)' : 'none', paddingBottom: '0.5rem'
              }}
            >
              📝 Solved Questionnaire & Explanations
            </button>
          </div>

          {subTab === 'tricks' && (
            <div className="glass-card">
              <h3 className="card-title">{oirGuide.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {oirGuide.overview}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {oirGuide.topics.map((t, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{t.name}</h4>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      <strong>Core Rule:</strong> {t.rule}
                    </p>
                    
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                      <div style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Sample Problem:</div>
                      <div style={{ color: 'var(--text-primary)', marginTop: '0.25rem' }}>{t.example}</div>
                      <div style={{ color: '#48bb78', marginTop: '0.5rem', fontWeight: '500' }}>Solution: {t.solution}</div>
                    </div>

                    <div style={{ color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.85rem' }}>
                      ⚡ Speed Trick: {t.shortcut}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subTab === 'questions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {oirGuide.solvedQuestions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isSelected = !!userChoice;
                return (
                  <div key={q.id} className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Q{idx + 1}. {q.type}</span>
                    </div>

                    <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: '500', marginBottom: '1rem' }}>
                      {q.question}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                      {q.options.map((opt, oIdx) => {
                        let btnStyle = {
                          padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)',
                          background: 'var(--bg-secondary)', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left'
                        };

                        if (isSelected) {
                          if (opt === q.answer) {
                            btnStyle.background = 'rgba(72, 187, 120, 0.2)';
                            btnStyle.borderColor = '#48bb78';
                            btnStyle.color = '#48bb78';
                            btnStyle.fontWeight = 'bold';
                          } else if (opt === userChoice) {
                            btnStyle.background = 'rgba(245, 101, 101, 0.2)';
                            btnStyle.borderColor = '#f56565';
                            btnStyle.color = '#f56565';
                          }
                        }

                        return (
                          <button key={oIdx} onClick={() => handleOptionSelect(q.id, opt)} style={btnStyle}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isSelected && (
                      <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
                        <div style={{ color: '#48bb78', fontWeight: 'bold', fontSize: '0.9rem' }}>Correct Answer: {q.answer}</div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ------------------- PPDT MASTERCLASS ------------------- */}
      {activeTab === 'PPDT' && (
        <div>
          {/* Sub Nav */}
          <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setSubTab('rules')}
              style={{
                background: 'none', border: 'none', color: subTab === 'rules' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: subTab === 'rules' ? '700' : '500', fontSize: '1rem', cursor: 'pointer',
                borderBottom: subTab === 'rules' ? '2px solid var(--accent-primary)' : 'none', paddingBottom: '0.5rem'
              }}
            >
              📦 Box Rules & Story Structure
            </button>
            <button
              onClick={() => setSubTab('narration')}
              style={{
                background: 'none', border: 'none', color: subTab === 'narration' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: subTab === 'narration' ? '700' : '500', fontSize: '1rem', cursor: 'pointer',
                borderBottom: subTab === 'narration' ? '2px solid var(--accent-primary)' : 'none', paddingBottom: '0.5rem'
              }}
            >
              🗣️ Narration & GD Tactics
            </button>
            <button
              onClick={() => setSubTab('solved')}
              style={{
                background: 'none', border: 'none', color: subTab === 'solved' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: subTab === 'solved' ? '700' : '500', fontSize: '1rem', cursor: 'pointer',
                borderBottom: subTab === 'solved' ? '2px solid var(--accent-primary)' : 'none', paddingBottom: '0.5rem'
              }}
            >
              💡 Solved PPDT Scenarios & Scripts
            </button>
            <button
              onClick={() => setSubTab('ssbace')}
              style={{
                background: 'none', border: 'none', color: subTab === 'ssbace' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: subTab === 'ssbace' ? '700' : '500', fontSize: '1rem', cursor: 'pointer',
                borderBottom: subTab === 'ssbace' ? '2px solid var(--accent-primary)' : 'none', paddingBottom: '0.5rem'
              }}
            >
              🌐 200 PPDT Image Vault (SSBAce)
            </button>
          </div>

          {subTab === 'rules' && (
            <div className="glass-card">
              <h3 className="card-title">{ppdtGuide.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {ppdtGuide.overview}
              </p>

              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{ppdtGuide.boxRules.title}</h4>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
                  {ppdtGuide.boxRules.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ul>
              </div>

              {/* Sample Box Visual Layout */}
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed var(--accent-primary)' }}>
                <h5 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Perception Box Layout Example</h5>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ border: '2px solid var(--border-color)', width: '140px', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                    <div style={{ border: '2px solid var(--accent-primary)', padding: '0.3rem 0.6rem', borderRadius: '50%', fontSize: '0.85rem', fontWeight: 'bold' }}>
                      M 22 +
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>F 20 +</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Main Action Box:</div>
                    <div style={{ color: '#48bb78', fontWeight: '600', marginTop: '0.25rem' }}>"Organizing Flood Relief Camp in Village"</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subTab === 'narration' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-card">
                <h3 className="card-title">{ppdtGuide.narrationBlueprint.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Time Limit: <strong>{ppdtGuide.narrationBlueprint.timeLimit}</strong>
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  {ppdtGuide.narrationBlueprint.structure.map((item, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                      <h5 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{item.step}</h5>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: '1.5' }}>
                        {item.script}
                      </div>
                    </div>
                  ))}
                </div>

                <h4 style={{ color: '#48bb78', marginBottom: '0.75rem' }}>Narration Body Language Rules</h4>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
                  {ppdtGuide.narrationBlueprint.rules.map((rule, idx) => <li key={idx}>{rule}</li>)}
                </ul>
              </div>

              {/* GD Strategy */}
              <div className="glass-card">
                <h3 className="card-title">{ppdtGuide.gdStrategy.title}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #48bb78', padding: '1.5rem', borderRadius: '12px' }}>
                    <h4 style={{ color: '#48bb78', marginBottom: '1rem' }}>✅ High-Score GD Tactics</h4>
                    <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
                      {ppdtGuide.gdStrategy.dos.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(245, 101, 101, 0.1)', border: '1px solid #f56565', padding: '1.5rem', borderRadius: '12px' }}>
                    <h4 style={{ color: '#f56565', marginBottom: '1rem' }}>❌ Fatal GD Mistakes</h4>
                    <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8' }}>
                      {ppdtGuide.gdStrategy.donts.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {subTab === 'solved' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {ppdtGuide.solvedScenarios.map((sc) => (
                <div key={sc.id} className="glass-card" style={{ padding: '2rem' }}>
                  <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{sc.title}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    {sc.image && (
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>PPDT Hazy Picture:</div>
                        <img 
                          src={sc.image} 
                          alt={sc.title} 
                          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                        />
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                      <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid var(--accent-primary)' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>Perception Box Coding</div>
                        <div style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: '0.25rem' }}><strong>Characters:</strong> {sc.perception.characters}</div>
                        <div style={{ color: '#48bb78', fontWeight: 'bold', marginTop: '0.5rem', fontSize: '1.05rem' }}>Main Action: {sc.perception.theme}</div>
                      </div>

                      <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>🤝 Common Group Story (CGS) Outcome:</div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>{sc.cgsSummary}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>📖 Written Story:</h4>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '10px', color: 'var(--text-primary)', lineHeight: '1.7' }}>
                      {sc.story}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: '#48bb78', marginBottom: '0.5rem' }}>🗣️ Spoken 1-Minute Narration Script:</h4>
                    <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1.25rem', borderRadius: '10px', color: 'var(--text-primary)', lineHeight: '1.7', border: '1px solid rgba(72, 187, 120, 0.3)' }}>
                      "{sc.narrationScript}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {subTab === 'ssbace' && (
            <div className="glass-card">
              <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                🌐 SSBAce 200 PPDT Practice Image Library Integration
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Access the official SSBAce practice database of 200+ PPDT images for additional timed practice. Combine these images with your built-in 30-Day Master Timed Story Evaluator!
              </p>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>🔗 Direct Link to SSBAce 200 PPDT Practice Database:</h4>
                <a 
                  href="https://ssbace.com/ppdt_pictures_for_ssb_200_for_practice.html" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.1rem', wordBreak: 'break-all' }}
                >
                  👉 https://ssbace.com/ppdt_pictures_for_ssb_200_for_practice.html
                </a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(72, 187, 120, 0.3)' }}>
                  <h4 style={{ color: '#48bb78', marginBottom: '0.5rem' }}>🎯 How to Practice using SSBAce + Your App:</h4>
                  <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.7' }}>
                    <li>Open SSBAce 200 PPDT webpage in your browser.</li>
                    <li>Pick any image from the 200 PPDT collection.</li>
                    <li>Observe the picture for 30 seconds.</li>
                    <li>Switch to your <strong>30-Day Master Plan</strong> tab and type your story into the 4-minute timer box.</li>
                    <li>Click <strong>"Evaluate with AI (Gemini 3.6 Flash)"</strong> to get instant feedback on your OLQs and screening odds!</li>
                  </ol>
                </div>

                <div style={{ background: 'rgba(59, 130, 246, 0.08)', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>💡 4 Common PPDT Themes on SSBAce:</h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.7' }}>
                    <li><strong>Rescue & Emergency Operations:</strong> Road accident, flood evacuation, fire fighting.</li>
                    <li><strong>Leadership in Crisis:</strong> College tech fest, team sports injury, factory breakdown.</li>
                    <li><strong>Social & Rural Development:</strong> Drip irrigation, literacy drives, clean water initiatives.</li>
                    <li><strong>Innovation & Problem Solving:</strong> Web portals, solar energy adoption, riverbank safety.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScreeningGuide;
