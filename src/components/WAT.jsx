import React, { useState, useEffect } from 'react';
import { evaluateWithGemini } from '../utils/ai';
import { practiceQuestions } from '../data/mockData';

const WAT = () => {
  const watQuestions = practiceQuestions.filter(q => q.topic === 'WAT');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [sentence, setSentence] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [stage, setStage] = useState('intro'); // intro, writing, done
  const [history, setHistory] = useState([]);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    let timer;
    if (stage === 'writing') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        handleNextWord();
      }
    }
    return () => clearTimeout(timer);
  }, [stage, timeLeft]);

  const startTest = () => {
    setStage('writing');
    setTimeLeft(15);
    setSentence('');
    setHistory([]);
    setCurrentWordIndex(0);
    setAiFeedback('');
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setAiFeedback('');
    try {
      const historyText = history.map(h => `${h.word}: ${h.sentence || '(Blank)'}`).join('\n');
      const prompt = `Evaluate these Word Association Test (WAT) sentences written by an SSB candidate. They had 15 seconds per word. Look for positive mindset, constructiveness, and Officer Like Qualities (OLQs). Point out any negative psychological traits.\n\nResponses:\n${historyText}`;
      const feedback = await evaluateWithGemini(prompt);
      setAiFeedback(feedback);
    } catch (err) {
      setAiFeedback(`Error: ${err.message}`);
    }
    setIsEvaluating(false);
  };

  const handleNextWord = () => {
    // Extract the word from the question string
    const match = watQuestions[currentWordIndex].question.match(/word: (.*)$/);
    const word = match ? match[1] : 'WORD';
    
    setHistory(prev => [...prev, { word, sentence }]);
    
    if (currentWordIndex < watQuestions.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setSentence('');
      setTimeLeft(15); // Reset for next word
    } else {
      setStage('done');
    }
  };

  return (
    <div className="glass-card question-block" style={{ textAlign: 'center' }}>
      <h3 className="card-title">Word Association Test (WAT)</h3>

      {stage === 'intro' && (
        <>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            A series of words will flash on the screen. For each word, you have <strong>15 seconds</strong> to type a meaningful sentence.
          </p>
          <button className="option-btn" onClick={startTest} style={{ padding: '0.8rem 2rem', background: 'var(--accent-primary)', color: '#fff', border: 'none', fontWeight: 'bold' }}>
            Start WAT Series
          </button>
        </>
      )}

      {stage === 'writing' && (
        <div className="writing-phase" style={{ padding: '2rem 0' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--accent-error)', marginBottom: '1rem', fontWeight: 'bold' }}>
            {timeLeft}s
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            {watQuestions[currentWordIndex].question.match(/word: (.*)$/) ? watQuestions[currentWordIndex].question.match(/word: (.*)$/)[1] : 'WORD'}
          </div>
          
          <input 
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            onKeyDown={(e) => { if(e.key === 'Enter') handleNextWord(); }}
            placeholder="Type your sentence and hit Enter..."
            style={{ width: '80%', padding: '1rem', fontSize: '1.1rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', outline: 'none' }}
            autoFocus
          />
        </div>
      )}

      {stage === 'done' && (
        <div className="done-phase">
          <h4 style={{ color: 'var(--accent-success)', marginBottom: '1.5rem' }}>Series Complete!</h4>
          
          <div style={{ textAlign: 'left', maxHeight: '400px', overflowY: 'auto', marginBottom: '1.5rem' }}>
            {history.map((item, index) => (
              <div key={index} style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--accent-primary)' }}>{item.word}:</strong> {item.sentence || <em>(Blank)</em>}
              </div>
            ))}
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
              disabled={history.length === 0 || isEvaluating}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}
            >
              {isEvaluating ? 'Evaluating...' : 'Evaluate with AI'}
            </button>
          )}
          
          <br/>
          <button className="option-btn" onClick={startTest}>
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
};

export default WAT;
