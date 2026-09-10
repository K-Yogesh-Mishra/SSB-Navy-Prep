import React, { useState, useEffect } from 'react';
import { evaluateWithGemini } from '../utils/ai';

const TAT = () => {
  const [stage, setStage] = useState('intro'); // intro, viewing, writing, done
  const [timeLeft, setTimeLeft] = useState(0);
  const [story, setStory] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  
  // Simulated multiple images (using the placeholders we generated)
  const images = ['/tat1.png', '/tat2.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (stage === 'viewing' || stage === 'writing') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        if (stage === 'viewing') {
          setStage('writing');
          setTimeLeft(4 * 60); // 4 minutes to write
        } else if (stage === 'writing') {
          setStage('done');
        }
      }
    }
    return () => clearTimeout(timer);
  }, [stage, timeLeft]);

  const startTest = () => {
    setStage('viewing');
    setTimeLeft(30); // 30 seconds to view
    setStory('');
    setAiFeedback('');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setStage('intro');
    setAiFeedback('');
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setAiFeedback('');
    try {
      const prompt = `Evaluate this story written for a TAT (Thematic Apperception Test) picture. The candidate had 4 minutes. Evaluate for Officer Like Qualities (OLQs) such as leadership, positivity, logical progression, and a clear outcome. \n\nStory: "${story}"`;
      const feedback = await evaluateWithGemini(prompt);
      setAiFeedback(feedback);
    } catch (err) {
      setAiFeedback(`Error: ${err.message}`);
    }
    setIsEvaluating(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="glass-card question-block" style={{ textAlign: 'center' }}>
      <h3 className="card-title">Thematic Apperception Test (TAT)</h3>
      
      {stage === 'intro' && (
        <>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            You will be shown a picture for <strong>30 seconds</strong>. 
            After it disappears, you will have <strong>4 minutes</strong> to write a story based on it.
          </p>
          <button className="option-btn" onClick={startTest} style={{ padding: '0.8rem 2rem', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 'bold' }}>
            Start Test
          </button>
        </>
      )}

      {stage === 'viewing' && (
        <div className="viewing-phase">
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-error)', marginBottom: '1rem' }}>
            Time to view: {formatTime(timeLeft)}
          </div>
          <img src={images[currentImageIndex]} alt="TAT image" style={{ maxWidth: '100%', borderRadius: '8px', maxHeight: '400px' }} />
        </div>
      )}

      {stage === 'writing' && (
        <div className="writing-phase">
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-error)', marginBottom: '1rem' }}>
            Time to write: {formatTime(timeLeft)}
          </div>
          <textarea 
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Write your story here... (What led up to the situation? What is happening now? What is the outcome?)"
            style={{ width: '100%', height: '300px', padding: '1rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontFamily: 'inherit', resize: 'vertical' }}
          />
        </div>
      )}

      {stage === 'done' && (
        <div className="done-phase">
          <h4 style={{ color: 'var(--accent-success)', marginBottom: '1rem' }}>Time's up!</h4>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', textAlign: 'left', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
            <strong>Your Story:</strong><br/>
            {story || <em>No story written.</em>}
          </div>
          
          {aiFeedback ? (
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--accent-primary)', padding: '1rem', borderRadius: '8px', textAlign: 'left', marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
              <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>AI Evaluation</h4>
              {aiFeedback}
            </div>
          ) : (
            <button 
              className="option-btn" 
              onClick={handleEvaluate} 
              disabled={!story || isEvaluating}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}
            >
              {isEvaluating ? 'Evaluating...' : 'Evaluate with AI'}
            </button>
          )}

          <br/>
          <button className="option-btn" onClick={nextImage}>
            Try Another Picture
          </button>
        </div>
      )}
    </div>
  );
};

export default TAT;
