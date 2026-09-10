import React, { useState } from 'react';
import { practiceQuestions } from '../data/mockData';
import TAT from './TAT';
import WAT from './WAT';
import SRT from './SRT';

const PracticeTest = () => {
  const [topic, setTopic] = useState('OIR');
  const [difficulty, setDifficulty] = useState('Medium');
  const [answers, setAnswers] = useState({});

  // We explicitly define topics to include TAT (which isn't in mockData currently)
  const topics = ['OIR', 'TAT', 'WAT', 'SRT'];
  const difficulties = ["Easy", "Medium", "Hard"];

  const filteredQuestions = practiceQuestions.filter(
    (q) => q.topic === topic && q.difficulty === difficulty
  );

  const handleOptionSelect = (qId, option) => {
    if (answers[qId]) return;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  return (
    <div className="practice-test">
      <div className="page-header">
        <h2 className="page-title">Interactive Practice Test</h2>
        <p className="page-subtitle">Test your preparation with simulated questions.</p>
      </div>

      <div className="glass-card controls-bar" style={{ marginBottom: '1.5rem' }}>
        <div className="select-wrapper">
          <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Topic</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        {topic === 'OIR' && (
          <div className="select-wrapper">
            <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {topic === 'TAT' && <TAT />}
      {topic === 'WAT' && <WAT />}
      {topic === 'SRT' && <SRT />}

      {topic === 'OIR' && (
        <div className="questions-container">
        {filteredQuestions.length === 0 ? (
          <div className="glass-card">
            <p>No questions found for this combination. Please select another topic or difficulty.</p>
          </div>
        ) : (
          filteredQuestions.map((q, index) => {
            const selectedAnswer = answers[q.id];
            const isAnswered = !!selectedAnswer;
            
            return (
              <div key={q.id} className="glass-card question-block">
                <p className="question-text">
                  <span style={{color: 'var(--text-secondary)', marginRight: '10px'}}>{index + 1}.</span> 
                  {q.question}
                </p>
                
                <div className="options-grid">
                  {q.options.map((opt, i) => {
                    let className = "option-btn";
                    if (isAnswered) {
                      if (opt === q.correctAnswer) className += " correct";
                      else if (opt === selectedAnswer) className += " incorrect";
                    }
                    
                    return (
                      <button 
                        key={i} 
                        className={className}
                        onClick={() => handleOptionSelect(q.id, opt)}
                        disabled={isAnswered}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className={`feedback ${selectedAnswer === q.correctAnswer ? 'success' : 'error'}`}>
                    <h4>{selectedAnswer === q.correctAnswer ? 'Correct!' : 'Incorrect'}</h4>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      )}
    </div>
  );
};

export default PracticeTest;
