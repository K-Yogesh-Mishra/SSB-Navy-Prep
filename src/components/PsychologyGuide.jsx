import React, { useState } from 'react';
import { watGuide, tatGuide, srtGuide, sdtGuide } from '../data/psychologyData';
import { wat200Vault } from '../data/wat200Vault';

const PsychologyGuide = () => {
  const [activeTest, setActiveTest] = useState('WAT');
  const [subTab, setSubTab] = useState('strategy'); // 'strategy' | 'examples' | 'watVault' | 'try'
  const [searchTerm, setSearchTerm] = useState('');
  const [userInput, setUserInput] = useState('');
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Search filter for WAT & SRT examples
  const filteredWat = watGuide.examples.filter(item => 
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ideal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWatVault = wat200Vault.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sentences.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategoryFilter === 'All' || item.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredSrt = srtGuide.examples.filter(item => 
    item.situation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ideal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="psychology-guide">
      {/* Header */}
      <div className="page-header">
        <h2 className="page-title">Psychological Test Masterclass & Solved Library</h2>
        <p className="page-subtitle">
          Master Stage 2 Psychological Tests (TAT, WAT, SRT, SDT). Learn concepts, avoid psychological traps, and explore dozens of solved officer-grade examples.
        </p>
      </div>

      {/* Main Test Category Switcher */}
      <div className="test-selector-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { id: 'WAT', label: '1. WAT (Word Association)' },
          { id: 'TAT', label: '2. TAT (Story Writing)' },
          { id: 'SRT', label: '3. SRT (Situation Reaction)' },
          { id: 'SDT', label: '4. SDT (Self Description)' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setActiveTest(t.id);
              setSubTab('strategy');
              setSearchTerm('');
              setShowAnalysis(false);
            }}
            className={`option-btn ${activeTest === t.id ? 'active' : ''}`}
            style={{
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              background: activeTest === t.id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeTest === t.id ? '#ffffff' : 'var(--text-secondary)',
              border: activeTest === t.id ? 'none' : '1px solid var(--border-color)',
              transition: 'all 0.2s ease'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sub Navigation: Strategy vs Solved Examples */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setSubTab('strategy')}
          style={{
            background: 'none',
            border: 'none',
            color: subTab === 'strategy' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontWeight: subTab === 'strategy' ? '700' : '500',
            fontSize: '1.05rem',
            cursor: 'pointer',
            borderBottom: subTab === 'strategy' ? '2px solid var(--accent-primary)' : 'none',
            paddingBottom: '0.5rem'
          }}
        >
          📖 Concepts, Rules & Frameworks
        </button>
        <button
          onClick={() => setSubTab('examples')}
          style={{
            background: 'none',
            border: 'none',
            color: subTab === 'examples' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            fontWeight: subTab === 'examples' ? '700' : '500',
            fontSize: '1.05rem',
            cursor: 'pointer',
            borderBottom: subTab === 'examples' ? '2px solid var(--accent-primary)' : 'none',
            paddingBottom: '0.5rem'
          }}
        >
          💡 Solved Examples Library
        </button>

        {activeTest === 'WAT' && (
          <button
            onClick={() => setSubTab('watVault')}
            style={{
              background: 'none',
              border: 'none',
              color: subTab === 'watVault' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: subTab === 'watVault' ? '700' : '500',
              fontSize: '1.05rem',
              cursor: 'pointer',
              borderBottom: subTab === 'watVault' ? '2px solid var(--accent-primary)' : 'none',
              paddingBottom: '0.5rem'
            }}
          >
            📚 200 WAT Words Vault (5 Sentences Each)
          </button>
        )}
        {activeTest !== 'SDT' && (
          <button
            onClick={() => setSubTab('try')}
            style={{
              background: 'none',
              border: 'none',
              color: subTab === 'try' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: subTab === 'try' ? '700' : '500',
              fontSize: '1.05rem',
              cursor: 'pointer',
              borderBottom: subTab === 'try' ? '2px solid var(--accent-primary)' : 'none',
              paddingBottom: '0.5rem'
            }}
          >
            🛠️ Interactive Practice & Hints
          </button>
        )}
      </div>

      {/* Content Rendering based on activeTest & subTab */}

      {/* ------------------- WAT SECTION ------------------- */}
      {activeTest === 'WAT' && (
        <div>
          {subTab === 'strategy' && (
            <div className="glass-card">
              <h3 className="card-title">{watGuide.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {watGuide.overview}
              </p>

              <h4 style={{ color: 'var(--accent-primary)', marginTop: '1.5rem', marginBottom: '1rem' }}>The 3 Ideal Sentence Patterns</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {watGuide.frameworks[0].types.map((type, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>{type.name}</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{type.detail}</p>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.85rem', color: '#a0aec0' }}>
                      <strong>Example:</strong> {type.example}
                    </div>
                  </div>
                ))}
              </div>

              {/* Do's and Don'ts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #48bb78', padding: '1.5rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#48bb78', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ✅ Crucial DO's
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                    {watGuide.dosAndDonts.dos.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div style={{ background: 'rgba(245, 101, 101, 0.1)', border: '1px solid #f56565', padding: '1.5rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#f56565', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ❌ Dangerous DON'Ts
                  </h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                    {watGuide.dosAndDonts.donts.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {subTab === 'examples' && (
            <div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="🔍 Search word (e.g. Failure, Danger, Leader...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Showing {filteredWat.length} solved words
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {filteredWat.map((ex, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
                        Word: "{ex.word}"
                      </span>
                    </div>

                    <div style={{ marginBottom: '0.85rem', background: 'rgba(245, 101, 101, 0.08)', borderLeft: '4px solid #f56565', padding: '0.75rem 1rem', borderRadius: '4px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#f56565', fontWeight: 'bold', textTransform: 'uppercase' }}>❌ Avoid / Weak Response</div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>"{ex.weak}"</div>
                    </div>

                    <div style={{ marginBottom: '1rem', background: 'rgba(72, 187, 120, 0.08)', borderLeft: '4px solid #48bb78', padding: '0.75rem 1rem', borderRadius: '4px' }}>
                      <div style={{ fontSize: '0.8rem', color: '#48bb78', fontWeight: 'bold', textTransform: 'uppercase' }}>✅ Recommended SSB Response</div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500', marginTop: '0.25rem' }}>"{ex.ideal}"</div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {ex.olqs.map((olq, oIdx) => (
                        <span key={oIdx} style={{ background: 'var(--bg-secondary)', color: 'var(--accent-primary)', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid var(--border-color)' }}>
                          🏷️ {olq}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subTab === 'watVault' && (
            <div>
              <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
                <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                  📚 200 High-Frequency WAT Words & 5 Sample Sentences Vault
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  For every word below, study 5 distinct officer-grade formed sentences demonstrating Action, Facts, Qualities, and Overcoming Stress/Negative contexts.
                </p>

                {/* Category Filters & Search */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="🔍 Search WAT word or sentence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, minWidth: '250px', padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                  />

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {["All", "Leadership", "Courage", "Stress/Negative", "Defense/Duty", "Teamwork", "Ethics"].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategoryFilter(cat)}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          background: selectedCategoryFilter === cat ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                          color: selectedCategoryFilter === cat ? '#fff' : 'var(--text-secondary)',
                          fontWeight: selectedCategoryFilter === cat ? 'bold' : 'normal',
                          cursor: 'pointer'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Word Cards Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {filteredWatVault.map((item) => (
                  <div key={item.id} className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                        #{item.id}. Word: "{item.word}"
                      </span>

                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          📂 {item.category}
                        </span>
                        {item.olqs.map((olq, oIdx) => (
                          <span key={oIdx} style={{ background: 'rgba(72, 187, 120, 0.15)', color: '#48bb78', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                            ✨ {olq}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        5 Formed Officer-Grade Sample Sentences:
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {item.sentences.map((s, sIdx) => (
                          <div key={sIdx} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.6rem 1rem', borderRadius: '6px', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subTab === 'try' && (
            <div className="glass-card">
              <h3 className="card-title">Interactive WAT Guided Practice</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Select a target word, draft your own 15-second response, and unlock instant expert guidance and OLQ analysis.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Choose Practice Word:</label>
                <select 
                  value={selectedExampleIndex} 
                  onChange={(e) => {
                    setSelectedExampleIndex(Number(e.target.value));
                    setUserInput('');
                    setShowAnalysis(false);
                  }}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', width: '100%', maxWidth: '400px' }}
                >
                  {watGuide.examples.map((item, index) => (
                    <option key={index} value={index}>{index + 1}. {item.word}</option>
                  ))}
                </select>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', tracking: '1px' }}>Target Word</div>
                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-primary)', margin: '0.5rem 0' }}>
                  {watGuide.examples[selectedExampleIndex].word}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Your Response Sentence:</label>
                <input
                  type="text"
                  placeholder="Type your sentence here..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1.05rem' }}
                />
              </div>

              <button
                className="option-btn"
                onClick={() => setShowAnalysis(true)}
                style={{ background: 'var(--accent-primary)', color: '#fff', padding: '0.85rem 2rem', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Reveal Model Solution & OLQ Analysis
              </button>

              {showAnalysis && (
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Expert Analysis & Solution Comparison</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ background: 'rgba(245, 101, 101, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f56565' }}>
                      <div style={{ fontWeight: 'bold', color: '#f56565', fontSize: '0.85rem' }}>❌ Weak Traps to Avoid</div>
                      <p style={{ marginTop: '0.5rem', color: 'var(--text-primary)' }}>"{watGuide.examples[selectedExampleIndex].weak}"</p>
                    </div>

                    <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
                      <div style={{ fontWeight: 'bold', color: '#48bb78', fontSize: '0.85rem' }}>✅ Model Officer Response</div>
                      <p style={{ marginTop: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>"{watGuide.examples[selectedExampleIndex].ideal}"</p>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Key OLQs Projected by Model Sentence:</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {watGuide.examples[selectedExampleIndex].olqs.map((olq, i) => (
                        <span key={i} style={{ background: 'var(--accent-primary)', color: '#fff', padding: '0.3rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500' }}>
                          ✨ {olq}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ------------------- TAT SECTION ------------------- */}
      {activeTest === 'TAT' && (
        <div>
          {subTab === 'strategy' && (
            <div className="glass-card">
              <h3 className="card-title">{tatGuide.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {tatGuide.overview}
              </p>

              <h4 style={{ color: 'var(--accent-primary)', marginTop: '1.5rem', marginBottom: '1rem' }}>The 4-Part Story Structure</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {tatGuide.frameworks[0].types.map((step, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <h5 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{step.name}</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{step.detail}</p>
                  </div>
                ))}
              </div>

              {/* Do's & Don'ts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #48bb78', padding: '1.5rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#48bb78', marginBottom: '1rem' }}>✅ Story Writing DO's</h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                    {tatGuide.dosAndDonts.dos.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div style={{ background: 'rgba(245, 101, 101, 0.1)', border: '1px solid #f56565', padding: '1.5rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#f56565', marginBottom: '1rem' }}>❌ Story Writing DON'Ts</h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                    {tatGuide.dosAndDonts.donts.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {subTab === 'examples' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {tatGuide.examples.map((ex) => (
                <div key={ex.id} className="glass-card" style={{ padding: '2rem' }}>
                  <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{ex.title}</h3>
                  <div style={{ color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '1.5rem' }}>Core Theme: {ex.theme}</div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                      <img 
                        src={ex.image} 
                        alt={ex.title} 
                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ background: 'rgba(245, 101, 101, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f56565' }}>
                        <div style={{ color: '#f56565', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase' }}>❌ Common Weak Perception</div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>{ex.weakSummary}</div>
                      </div>

                      <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                        <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Key OLQs Demonstrated:</div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {ex.olqsHighlighted.map((olq, i) => (
                            <span key={i} style={{ background: 'var(--accent-primary)', color: '#fff', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                              {olq}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(72, 187, 120, 0.06)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(72, 187, 120, 0.3)' }}>
                    <h4 style={{ color: '#48bb78', marginBottom: '0.75rem' }}>✅ Solved Officer-Grade Story</h4>
                    <p style={{ color: 'var(--text-primary)', lineHeight: '1.8', whiteSpace: 'pre-line', fontSize: '1rem' }}>
                      {ex.idealStory}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {subTab === 'try' && (
            <div className="glass-card">
              <h3 className="card-title">Interactive TAT Story Builder</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Analyze the picture below, construct your narrative following the 4-part structure, and compare with the ideal story breakdown.
              </p>

              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <img 
                  src={tatGuide.examples[0].image} 
                  alt="TAT Practice"
                  style={{ maxWidth: '450px', width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Your Draft Story:</label>
                <textarea
                  rows="6"
                  placeholder="Write your story here (Background -> Problem -> Action -> Resolution)..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.6' }}
                />
              </div>

              <button
                className="option-btn"
                onClick={() => setShowAnalysis(true)}
                style={{ background: 'var(--accent-primary)', color: '#fff', padding: '0.85rem 2rem', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                View Model Story Breakdown & Check OLQs
              </button>

              {showAnalysis && (
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>Model Story Reference</h4>
                  <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', color: 'var(--text-primary)', lineHeight: '1.8' }}>
                    {tatGuide.examples[0].idealStory}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ------------------- SRT SECTION ------------------- */}
      {activeTest === 'SRT' && (
        <div>
          {subTab === 'strategy' && (
            <div className="glass-card">
              <h3 className="card-title">{srtGuide.title}</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {srtGuide.overview}
              </p>

              <h4 style={{ color: 'var(--accent-primary)', marginTop: '1.5rem', marginBottom: '1rem' }}>The Reaction Formula</h4>
              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-primary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  [Immediate Action Taken] + [Resource Mobilized] + [Final Solution Achieved]
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Always be practical. State what YOU did directly. Never leave the situation half-solved.
                </p>
              </div>

              {/* Do's and Don'ts */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #48bb78', padding: '1.5rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#48bb78', marginBottom: '1rem' }}>✅ SRT Reaction DO's</h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                    {srtGuide.dosAndDonts.dos.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>

                <div style={{ background: 'rgba(245, 101, 101, 0.1)', border: '1px solid #f56565', padding: '1.5rem', borderRadius: '12px' }}>
                  <h4 style={{ color: '#f56565', marginBottom: '1rem' }}>❌ SRT Reaction DON'Ts</h4>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                    {srtGuide.dosAndDonts.donts.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {subTab === 'examples' && (
            <div>
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="🔍 Search situation (e.g. train, interview, lost, injured...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.85rem 1.25rem',
                    borderRadius: '10px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {filteredSrt.map((ex, idx) => (
                  <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                      Situation {idx + 1}: "{ex.situation}"
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ background: 'rgba(245, 101, 101, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f56565' }}>
                        <div style={{ fontSize: '0.8rem', color: '#f56565', fontWeight: 'bold', textTransform: 'uppercase' }}>❌ Avoid / Incomplete Reaction</div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>"{ex.weak}"</div>
                      </div>

                      <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #48bb78' }}>
                        <div style={{ fontSize: '0.8rem', color: '#48bb78', fontWeight: 'bold', textTransform: 'uppercase' }}>✅ Recommended SSB Reaction</div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500', marginTop: '0.25rem' }}>"{ex.ideal}"</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {ex.olqs.map((olq, oIdx) => (
                        <span key={oIdx} style={{ background: 'var(--bg-secondary)', color: 'var(--accent-primary)', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid var(--border-color)' }}>
                          🏷️ {olq}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subTab === 'try' && (
            <div className="glass-card">
              <h3 className="card-title">Interactive SRT Guided Practice</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Pick a scenario, write your reaction within seconds, and compare against officer-grade solutions.
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Choose Situation:</label>
                <select 
                  value={selectedExampleIndex} 
                  onChange={(e) => {
                    setSelectedExampleIndex(Number(e.target.value));
                    setUserInput('');
                    setShowAnalysis(false);
                  }}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', width: '100%', maxWidth: '500px' }}
                >
                  {srtGuide.examples.map((item, index) => (
                    <option key={index} value={index}>Scenario {index + 1}: {item.situation.substring(0, 50)}...</option>
                  ))}
                </select>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Scenario</div>
                <div style={{ fontSize: '1.15rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                  "{srtGuide.examples[selectedExampleIndex].situation}"
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Your Action Plan / Reaction:</label>
                <textarea
                  rows="3"
                  placeholder="He..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem' }}
                />
              </div>

              <button
                className="option-btn"
                onClick={() => setShowAnalysis(true)}
                style={{ background: 'var(--accent-primary)', color: '#fff', padding: '0.85rem 2rem', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Reveal Recommended Reaction
              </button>

              {showAnalysis && (
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <h4 style={{ color: '#48bb78', marginBottom: '0.5rem' }}>✅ Model SSB Reaction</h4>
                  <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1.25rem', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: '500' }}>
                    "{srtGuide.examples[selectedExampleIndex].ideal}"
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ------------------- SDT SECTION ------------------- */}
      {activeTest === 'SDT' && (
        <div className="glass-card">
          <h3 className="card-title">{sdtGuide.title}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            {sdtGuide.overview}
          </p>

          <h4 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>The 5 Standard Paragraphs Required</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {sdtGuide.paragraphs.map((p, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <h5 style={{ color: 'var(--accent-primary)', fontSize: '1rem', marginBottom: '0.35rem' }}>{p.name}</h5>
                <div style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{p.focus}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>💡 <strong>Focus areas:</strong> {p.keyPoints}</div>
              </div>
            ))}
          </div>

          <h4 style={{ color: '#48bb78', marginBottom: '1rem' }}>Complete Solved Sample Self-Description (SDT)</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>1. Parents' Opinion:</strong>
              <p style={{ color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.6' }}>{sdtGuide.sampleText.parents}</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>2. Teachers' / Employers' Opinion:</strong>
              <p style={{ color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.6' }}>{sdtGuide.sampleText.teachers}</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>3. Friends' / Subordinates' Opinion:</strong>
              <p style={{ color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.6' }}>{sdtGuide.sampleText.friends}</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>4. Own Opinion:</strong>
              <p style={{ color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.6' }}>{sdtGuide.sampleText.self}</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px' }}>
              <strong style={{ color: 'var(--accent-primary)' }}>5. Aim & Qualities to Develop:</strong>
              <p style={{ color: 'var(--text-primary)', marginTop: '0.5rem', lineHeight: '1.6' }}>{sdtGuide.sampleText.aim}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologyGuide;
