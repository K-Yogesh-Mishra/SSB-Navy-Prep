import React, { useState, useEffect } from 'react';
import { evaluateWithGemini } from '../utils/ai';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('gemini_api_key');
    if (stored) {
      setApiKey(stored);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      alert("Please enter a valid Gemini API Key first.");
      return;
    }
    setTesting(true);
    setTestResult('');
    try {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      const response = await evaluateWithGemini("Respond with 'CONN_OK: Gemini 3.6 Flash API is active and ready for SSB AI Evaluation.' in 1 sentence.");
      setTestResult(response);
    } catch (err) {
      setTestResult(`Connection Failed: ${err.message}`);
    }
    setTesting(false);
  };

  const handleClearData = () => {
    if (window.confirm("⚠️ WARNING: This will reset all your 30-day completed badges, saved story responses, and AI reports saved in your local browser storage. Are you sure?")) {
      localStorage.removeItem('ssb_30days_completed');
      localStorage.removeItem('ssb_30days_responses');
      alert("All local SSB preparation data has been reset.");
      window.location.reload();
    }
  };

  return (
    <div className="settings-page" style={{ padding: '0.5rem' }}>
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">⚙️ System Settings & AI Configuration</h2>
        <p className="page-subtitle">Configure your Gemini AI Assessor connection and manage local storage backup data.</p>
      </div>

      {/* Gemini AI Settings Card */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
        <h3 className="card-title" style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
          🤖 Gemini 3.6 Flash AI Assessor Key
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          To enable instant AI evaluation for Stage 1 (PPDT) and Stage 2 (TAT, WAT, SRT, PI, GD), enter your Google Gemini API Key. 
          You can obtain a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>Google AI Studio</a>.
          Your key is saved strictly in your local browser <code style={{ color: '#48bb78' }}>localStorage</code>.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '550px' }}>
          <label style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Gemini API Key:</label>
          <input 
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleSave}
              style={{
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                fontWeight: 'bold',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              {saved ? '✓ Saved Successfully!' : 'Save Key'}
            </button>

            <button 
              onClick={handleTestConnection}
              disabled={testing}
              style={{
                background: 'rgba(72, 187, 120, 0.15)',
                color: '#48bb78',
                border: '1px solid #48bb78',
                fontWeight: 'bold',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              {testing ? 'Testing Connection...' : '🔌 Test API Connection'}
            </button>
          </div>

          {testResult && (
            <div style={{
              background: testResult.includes('CONN_OK') ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)',
              padding: '1rem',
              borderRadius: '8px',
              border: testResult.includes('CONN_OK') ? '1px solid #48bb78' : '1px solid #f56565',
              color: testResult.includes('CONN_OK') ? '#48bb78' : '#f56565',
              fontWeight: 'bold',
              fontSize: '0.92rem',
              marginTop: '0.5rem'
            }}>
              {testResult}
            </div>
          )}
        </div>
      </div>

      {/* Local Storage & Data Reset Card */}
      <div className="glass-card" style={{ borderTop: '4px solid #f56565', padding: '1.75rem' }}>
        <h3 className="card-title" style={{ color: '#f56565', marginBottom: '0.75rem' }}>
          🗑️ Reset Preparation Data & Saved Responses
        </h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
          Clear all saved daily answers, story drafts, and Gemini AI evaluation reports from local browser storage.
        </p>

        <button
          onClick={handleClearData}
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: '8px',
            background: 'rgba(245, 101, 101, 0.15)',
            color: '#f56565',
            border: '1px solid #f56565',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.95rem'
          }}
        >
          🚨 Reset All 30-Day Saved Data
        </button>
      </div>
    </div>
  );
};

export default Settings;
