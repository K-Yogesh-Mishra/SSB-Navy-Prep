import React, { useState } from 'react';
import { olqVaultData } from '../data/olqVaultData';

const OlqVaultGuide = () => {
  const [selectedFactor, setSelectedFactor] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const factors = [
    'ALL',
    'Factor I: Planning & Reasoning',
    'Factor II: Social Adjustment',
    'Factor III: Social Effectiveness',
    'Factor IV: Dynamic'
  ];

  const filteredOlqs = olqVaultData.filter(olq => {
    const matchesFactor = selectedFactor === 'ALL' || olq.factor === selectedFactor;
    const matchesSearch = olq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          olq.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          olq.assessorCheck.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFactor && matchesSearch;
  });

  return (
    <div className="olq-vault-guide" style={{ padding: '0.5rem' }}>
      {/* Header Banner */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">🎖️ 15 Officer Like Qualities (OLQs) Master Vault</h2>
        <p className="page-subtitle">
          Understand what SSB Assessors evaluate across all 4 Factors. Learn how to explicitly demonstrate every OLQ in your WAT, SRT, TAT, and Personal Interview responses!
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              SEARCH BY OLQ NAME OR KEYWORD:
            </label>
            <input
              type="text"
              placeholder="Search OLQs (e.g. Effective Intelligence, Courage, Teamwork)..."
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

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              FILTER BY SSB FACTOR (I to IV):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {factors.map(fact => (
                <button
                  key={fact}
                  onClick={() => setSelectedFactor(fact)}
                  style={{
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    border: selectedFactor === fact ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    background: selectedFactor === fact ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                    color: selectedFactor === fact ? '#fff' : 'var(--text-primary)',
                    fontWeight: selectedFactor === fact ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  {fact === 'ALL' ? '🌟 All 15 OLQs' : fact}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OLQ Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {filteredOlqs.map((olq, index) => (
          <div
            key={olq.id}
            className="glass-card"
            style={{
              borderLeft: '5px solid var(--accent-primary)',
              padding: '1.5rem'
            }}
          >
            {/* Header / Badges */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.8rem', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {olq.factor}
                </span>
                <h3 className="card-title" style={{ marginTop: '0.5rem', fontSize: '1.35rem', color: 'var(--text-primary)' }}>
                  {index + 1}. {olq.name}
                </h3>
              </div>
            </div>

            {/* Definition & Assessor Criterion */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  📘 Core SSB Definition
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {olq.definition}
                </div>
              </div>

              <div style={{ background: 'rgba(72, 187, 120, 0.08)', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(72, 187, 120, 0.3)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#48bb78', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  🔍 What Assessors Look For
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {olq.assessorCheck}
                </div>
              </div>
            </div>

            {/* Daily Practice Habit */}
            <div style={{ background: 'rgba(236, 72, 153, 0.08)', padding: '0.85rem 1.25rem', borderRadius: '8px', marginBottom: '1.25rem', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
              <strong style={{ color: '#ec4899', fontSize: '0.9rem' }}>⚡ Daily Habit to Build This OLQ: </strong>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{olq.dailyPractice}</span>
            </div>

            {/* Sentence Examples Showcase */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                💡 Examples: How to Showcase "{olq.name}" in SSB Tests
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.92rem' }}>
                  <strong style={{ color: '#3b82f6' }}>📝 WAT Sentence: </strong>
                  <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>"{olq.examples.wat}"</span>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.92rem' }}>
                  <strong style={{ color: '#48bb78' }}>⚡ SRT Reaction: </strong>
                  <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>"{olq.examples.srt}"</span>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.92rem' }}>
                  <strong style={{ color: '#eab308' }}>🎨 TAT Story Excerpt: </strong>
                  <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>"{olq.examples.tat}"</span>
                </div>

                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.92rem' }}>
                  <strong style={{ color: '#ec4899' }}>🎙️ Personal Interview (PI) Spoken Line: </strong>
                  <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>"{olq.examples.pi}"</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OlqVaultGuide;
