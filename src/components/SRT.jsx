import React, { useState } from 'react';
import { practiceQuestions } from '../data/mockData';
import { evaluateWithGemini } from '../utils/ai';

const SRT = () => {
  const srtQuestions = practiceQuestions.filter(q => q.topic === 'SRT');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reaction, setReaction] = useState('');
  const [history, setHistory] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleNext = () => {
    // Extract situation
    const match = srtQuestions[currentIndex].question.match(/Situation \d+: (.*) You\.\.\./);
    const situation = match ? match[1] : srtQuestions[currentIndex].question;
    
    setHistory(prev => [...prev, { situation, reaction }]);
    
    if (currentIndex < srtQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setReaction('');
    } else {
      setIsDone(true);
    }
  };

  const startTest = () => {
    setIsDone(false);
    setCurrentIndex(0);
    setReaction('');
    setHistory([]);
    setAiFeedback('');
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setAiFeedback('');
    try {
      const historyText = history.map((h, i) => `Situation ${i+1}: ${h.situation}\nReaction: ${h.reaction || '(Blank)'}`).join('\n\n');
      const prompt = `Evaluate these Situation Reaction Test (SRT) responses written by an SSB candidate. Evaluate for practical problem solving, taking initiative, keeping calm, and overall Officer Like Qualities (OLQs).\n\nResponses:\n${historyText}`;
      const feedback = await evaluateWithGemini(prompt);
      setAiFeedback(feedback);
    } catch (err) {
      setAiFeedback(`Error: ${err.message}`);
    }
    setIsEvaluating(false);
  };

  if (isDone) {
    return (
      <div className="glass-card question-block">
        <h3 className="card-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Situation Reaction Test (SRT) Complete</h3>
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
          {history.map((item, index) => (
            <div key={index} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}><strong>Situation {index+1}:</strong> {item.situation}</p>
              <p><strong>Your Reaction:</strong> {item.reaction || <em>(Blank)</em>}</p>
            </div>
          ))}
        </div>
        
        {aiFeedback ? (
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--accent-primary)', padding: '1rem', borderRadius: '8px', textAlign: 'left', margin: '1.5rem 0', whiteSpace: 'pre-wrap' }}>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>AI Evaluation</h4>
            {aiFeedback}
          </div>
        ) : (
          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <button 
              className="option-btn" 
              onClick={handleEvaluate} 
              disabled={history.length === 0 || isEvaluating}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}
            >
              {isEvaluating ? 'Evaluating...' : 'Evaluate with AI'}
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center' }}>
          <button className="option-btn" onClick={startTest}>Retake Test</button>
        </div>
      </div>
    );
  }

  const currentQ = srtQuestions[currentIndex];
  const match = currentQ.question.match(/Situation \d+: (.*) You\.\.\./);
  const situation = match ? match[1] : currentQ.question;

  return (
    <div className="glass-card question-block">
      <h3 className="card-title">Situation Reaction Test (SRT)</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        <span>Question {currentIndex + 1} of {srtQuestions.length}</span>
      </div>
      
      <div style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: '500', background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderLeft: '4px solid var(--accent-primary)', borderRadius: '4px' }}>
        {situation}
      </div>

      <textarea 
        value={reaction}
        onChange={(e) => setReaction(e.target.value)}
        placeholder="Type your reaction here... (Keep it short, practical, and positive)"
        style={{ width: '100%', height: '150px', padding: '1rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', resize: 'vertical', marginBottom: '1rem', outline: 'none' }}
        autoFocus
      />
      
      <div style={{ textAlign: 'right' }}>
        <button className="option-btn" onClick={handleNext} style={{ padding: '0.8rem 2rem', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 'bold' }}>
          Next Situation
        </button>
      </div>
    </div>
  );
};

export default SRT;
