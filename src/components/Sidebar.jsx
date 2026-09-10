import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="sidebar">
      <h1>SSB Navy Prep</h1>
      <nav className="nav-links">
        <button 
          className={`nav-btn ${activeTab === 'day30' ? 'active' : ''}`}
          onClick={() => setActiveTab('day30')}
        >
          🏆 30-Day Master Plan (Day 1 to 30)
        </button>
        <button 
          className={`nav-btn ${activeTab === 'syllabus' ? 'active' : ''}`}
          onClick={() => setActiveTab('syllabus')}
        >
          Syllabus & Guide
        </button>
        <button 
          className={`nav-btn ${activeTab === 'navaldeepdive' ? 'active' : ''}`}
          onClick={() => setActiveTab('navaldeepdive')}
        >
          ⚓ Armed Forces & Naval Air Deep-Dive
        </button>

        <button 
          className={`nav-btn ${activeTab === 'screening' ? 'active' : ''}`}
          onClick={() => setActiveTab('screening')}
        >
          Screening (OIR & PPDT) Masterclass
        </button>
        <button 
          className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`}
          onClick={() => setActiveTab('vault')}
        >
          🧮 OIR & PI Question Vault (Solvers)
        </button>
        <button 
          className={`nav-btn ${activeTab === 'psychology' ? 'active' : ''}`}
          onClick={() => setActiveTab('psychology')}
        >
          Psych Masterclass & Solved Examples
        </button>
        <button 
          className={`nav-btn ${activeTab === 'mockinterview' ? 'active' : ''}`}
          onClick={() => setActiveTab('mockinterview')}
        >
          🎙️ Voice SSB Mock Interview Room
        </button>
        <button 
          className={`nav-btn ${activeTab === 'olqvault' ? 'active' : ''}`}
          onClick={() => setActiveTab('olqvault')}
        >
          🎖️ 15 OLQs Master Vault & Examples
        </button>
        <button 
          className={`nav-btn ${activeTab === 'gdtopics' ? 'active' : ''}`}
          onClick={() => setActiveTab('gdtopics')}
        >
          🗣️ GD & Lecturette 55+ Topics Vault
        </button>
        <button 
          className={`nav-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveTab('practice')}
        >
          Practice Tests
        </button>
        <button 
          className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
