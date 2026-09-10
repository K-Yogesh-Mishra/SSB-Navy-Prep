import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import SyllabusGuide from './components/SyllabusGuide'
import NavalArmedForcesDeepDive from './components/NavalArmedForcesDeepDive'
import DayByDayMastery from './components/DayByDayMastery'
import ScreeningGuide from './components/ScreeningGuide'
import QuestionBankMastery from './components/QuestionBankMastery'
import PsychologyGuide from './components/PsychologyGuide'
import MockInterviewRoom from './components/MockInterviewRoom'
import OlqVaultGuide from './components/OlqVaultGuide'
import GdTopicsMastery from './components/GdTopicsMastery'
import PracticeTest from './components/PracticeTest'
import Settings from './components/Settings'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('day30');

  const renderContent = () => {
    switch(activeTab) {
      case 'day30': return <DayByDayMastery />;
      case 'syllabus': return <SyllabusGuide />;
      case 'navaldeepdive': return <NavalArmedForcesDeepDive />;
      case 'screening': return <ScreeningGuide />;
      case 'vault': return <QuestionBankMastery />;
      case 'psychology': return <PsychologyGuide />;
      case 'mockinterview': return <MockInterviewRoom />;
      case 'olqvault': return <OlqVaultGuide />;
      case 'gdtopics': return <GdTopicsMastery />;
      case 'practice': return <PracticeTest />;
      case 'settings': return <Settings />;
      default: return <DayByDayMastery />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
