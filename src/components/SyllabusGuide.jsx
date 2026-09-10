import React from 'react';
import { ssbStages } from '../data/mockData';

const SyllabusGuide = () => {
  return (
    <div className="syllabus-guide">
      <div className="page-header">
        <h2 className="page-title">Navy SSC SSB Selection Process</h2>
        <p className="page-subtitle">A comprehensive guide to the 5-day assessment.</p>
      </div>

      <div className="stages-container">
        {ssbStages.map((stage) => (
          <div key={stage.id} className="glass-card">
            <h3 className="card-title">{stage.title}</h3>
            <p>{stage.description}</p>
            
            <div className="stage-tests">
              {stage.tests.map((test, index) => (
                <div key={index} className="test-item">
                  <h4>{test.name}</h4>
                  <p>{test.details}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SyllabusGuide;
