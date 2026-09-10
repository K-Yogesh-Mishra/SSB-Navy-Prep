import React, { useState } from 'react';
import { navalArmedForcesData } from '../data/navalArmedForcesData';

const NavalArmedForcesDeepDive = () => {
  const [activeSubTab, setActiveSubTab] = useState('aviation');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Text-to-Speech Helper
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  return (
    <div className="naval-armed-forces-deep-dive" style={{ padding: '0.5rem' }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">⚓ Armed Forces, Naval Branches & Aviation Masterclass</h2>
        <p className="page-subtitle">
          Comprehensive, in-depth guide for SSC & Pilot Entry candidates: Tri-Service Ranks, 4 Naval Branches, Air Squadrons & Airbases, Naval vs IAF Fighter Jets, and SSB Interviewer Tricky Q&A Blueprints.
        </p>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveSubTab('aviation')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              border: activeSubTab === 'aviation' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: activeSubTab === 'aviation' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeSubTab === 'aviation' ? '#fff' : 'var(--text-primary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ✈️ Naval Air Squadrons & Airbases
          </button>

          <button
            onClick={() => setActiveSubTab('fighters')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              border: activeSubTab === 'fighters' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: activeSubTab === 'fighters' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeSubTab === 'fighters' ? '#fff' : 'var(--text-primary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🛩️ Naval vs IAF Fighter Jets Comparison
          </button>

          <button
            onClick={() => setActiveSubTab('qna')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              border: activeSubTab === 'qna' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: activeSubTab === 'qna' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeSubTab === 'qna' ? '#fff' : 'var(--text-primary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🎙️ SSB Pilot & SSC Interview Q&A Blueprints
          </button>

          <button
            onClick={() => setActiveSubTab('branches')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              border: activeSubTab === 'branches' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: activeSubTab === 'branches' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeSubTab === 'branches' ? '#fff' : 'var(--text-primary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ⚓ Branches of Indian Navy
          </button>

          <button
            onClick={() => setActiveSubTab('ranks')}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '10px',
              border: activeSubTab === 'ranks' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: activeSubTab === 'ranks' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeSubTab === 'ranks' ? '#fff' : 'var(--text-primary)',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🪖 Tri-Service Equivalent Ranks & Commands
          </button>
        </div>
      </div>

      {/* ----------------- SUB-TAB 1: NAVAL AVIATION SQUADRONS & AIRBASES ----------------- */}
      {activeSubTab === 'aviation' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Air Squadrons Table */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              ✈️ Indian Naval Air Squadrons (INAS) & Fleet Aircraft
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.85rem' }}>Squadron (INAS)</th>
                    <th style={{ padding: '0.85rem' }}>Aircraft & Type</th>
                    <th style={{ padding: '0.85rem' }}>Airbase & Location</th>
                    <th style={{ padding: '0.85rem' }}>Primary Tactical Role</th>
                  </tr>
                </thead>
                <tbody>
                  {navalArmedForcesData.airSquadrons.map((sq, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                      <td style={{ padding: '0.85rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{sq.squadron}</td>
                      <td style={{ padding: '0.85rem', color: '#48bb78', fontWeight: 'bold' }}>{sq.aircraft}</td>
                      <td style={{ padding: '0.85rem' }}>{sq.airbase}</td>
                      <td style={{ padding: '0.85rem' }}>{sq.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Naval Air Stations (Airbases) */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: '#48bb78', marginBottom: '1rem' }}>
              🛬 Key Naval Air Stations (Airbases) & Locations
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {navalArmedForcesData.navalAirStations.map((st, sIdx) => (
                <div key={sIdx} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent-primary)' }}>
                    {st.name} ({st.location})
                  </div>
                  <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: '1.5' }}>
                    {st.significance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- SUB-TAB 2: FIGHTER JETS COMPARISON (NAVY VS IAF) ----------------- */}
      {activeSubTab === 'fighters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* MiG-29K vs MiG-29UPG */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              🛩️ MiG-29K (Navy) vs MiG-29UPG (Indian Air Force)
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.85rem' }}>Feature / Specification</th>
                    <th style={{ padding: '0.85rem', color: 'var(--accent-primary)' }}>Indian Navy MiG-29K / KUB</th>
                    <th style={{ padding: '0.85rem', color: '#48bb78' }}>Indian Air Force MiG-29UPG</th>
                  </tr>
                </thead>
                <tbody>
                  {navalArmedForcesData.fighterJetComparison.mig29kVsUpg.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{row.feature}</td>
                      <td style={{ padding: '0.85rem', background: 'rgba(59, 130, 246, 0.08)' }}>{row.navyMiG29K}</td>
                      <td style={{ padding: '0.85rem', background: 'rgba(72, 187, 120, 0.08)' }}>{row.iafMiG29UPG}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rafale-M vs IAF Rafale */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: '#48bb78', marginBottom: '1rem' }}>
              🇫🇷 Rafale-M (Naval Variant for INS Vikrant) vs IAF Rafale (C/BS)
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.85rem' }}>Feature</th>
                    <th style={{ padding: '0.85rem', color: 'var(--accent-primary)' }}>Rafale-M (Naval Marine)</th>
                    <th style={{ padding: '0.85rem', color: '#48bb78' }}>IAF Rafale (Air Force)</th>
                  </tr>
                </thead>
                <tbody>
                  {navalArmedForcesData.fighterJetComparison.rafaleMVsIAF.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem', fontWeight: 'bold' }}>{row.feature}</td>
                      <td style={{ padding: '0.85rem', background: 'rgba(59, 130, 246, 0.08)' }}>{row.navyRafaleM}</td>
                      <td style={{ padding: '0.85rem', background: 'rgba(72, 187, 120, 0.08)' }}>{row.iafRafale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* TEDBF Future Aircraft Card */}
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '5px solid #eab308' }}>
            <h4 style={{ color: '#eab308', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
              🚀 TEDBF (Twin Engine Deck Based Fighter): Future of Naval Aviation
            </h4>
            <p style={{ color: 'var(--text-primary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Developed by ADA/DRDO for the Indian Navy, TEDBF is a 4.5+ generation twin-engine carrier-borne fighter jet designed to replace the MiG-29K fleet on INS Vikrant and future indigenous aircraft carriers. Features folded wings, canards, and advanced AESA radar.
            </p>
          </div>
        </div>
      )}

      {/* ----------------- SUB-TAB 3: SSB INTERVIEW Q&A BLUEPRINTS ----------------- */}
      {activeSubTab === 'qna' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(72, 187, 120, 0.1))' }}>
            <h3 style={{ margin: 0, color: 'var(--accent-primary)' }}>
              🎙️ Officer-Grade Interview Answer Blueprints (21+ Probing Questions)
            </h3>
            <p style={{ margin: '0.3rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Study exact diplomatic, passionate, and structured answers to tough SSB Interviewing Officer (IO) questions across PIQ, Fleet Technology, Naval Aviation, Ethics, and Defense Geopolitics.
            </p>
          </div>

          {/* Q&A Category Filter & Search Bar */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Search interview questions (e.g. Pilot, Marks, Weakness, Destroyer, BrahMos, Red Sea)..."
                onChange={(e) => setSelectedQuestion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.2rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          {navalArmedForcesData.ssbInterviewQnA.map((item) => (
            <div key={item.id} className="glass-card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--accent-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.78rem', background: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-primary)', padding: '0.25rem 0.6rem', borderRadius: '15px', fontWeight: 'bold' }}>
                    {item.category}
                  </span>
                  <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', margin: '0.5rem 0 0 0' }}>
                    IO Question: "{item.question}"
                  </h3>
                </div>

                <button
                  onClick={() => speakText(item.modelAnswer)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    background: 'var(--accent-primary)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  🔊 Listen Model Answer
                </button>
              </div>

              {/* Assessor Intent */}
              <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid rgba(234, 179, 8, 0.3)', fontSize: '0.9rem' }}>
                <strong style={{ color: '#eab308' }}>🎯 What the Interviewing Officer (IO) is Testing: </strong>
                <span style={{ color: 'var(--text-primary)' }}>{item.assessorIntent}</span>
              </div>

              {/* Model Answer Blueprint */}
              <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 'bold', color: '#48bb78', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                  💬 Recommended Officer Spoken Answer:
                </div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
                  {item.modelAnswer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------- SUB-TAB 4: BRANCHES OF INDIAN NAVY ----------------- */}
      {activeSubTab === 'branches' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {navalArmedForcesData.navalBranches.map((br, bIdx) => (
            <div key={bIdx} className="glass-card" style={{ padding: '1.5rem', borderLeft: '5px solid var(--accent-primary)' }}>
              <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.4rem', fontSize: '1.3rem' }}>
                {br.name}
              </h3>
              <div style={{ color: '#48bb78', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Primary Mandate: {br.role}
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <strong style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Sub-Cadres & Specializations:
                </strong>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {br.subCadres.map((sc, sIdx) => (
                    <li key={sIdx}>{sc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------- SUB-TAB 5: TRI-SERVICE RANKS & COMMANDS ----------------- */}
      {activeSubTab === 'ranks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Equivalent Ranks Table */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
              🪖 Equivalent Commissioned Officer Ranks Across Armed Forces
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.85rem', color: 'var(--accent-primary)' }}>Indian Navy</th>
                    <th style={{ padding: '0.85rem', color: '#48bb78' }}>Indian Army</th>
                    <th style={{ padding: '0.85rem', color: '#3b82f6' }}>Indian Air Force</th>
                    <th style={{ padding: '0.85rem' }}>Rank Group</th>
                  </tr>
                </thead>
                <tbody>
                  {navalArmedForcesData.equivalentRanks.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                      <td style={{ padding: '0.85rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{row.navy}</td>
                      <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#48bb78' }}>{row.army}</td>
                      <td style={{ padding: '0.85rem', fontWeight: 'bold', color: '#3b82f6' }}>{row.airforce}</td>
                      <td style={{ padding: '0.85rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{row.rankGroup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavalArmedForcesDeepDive;
