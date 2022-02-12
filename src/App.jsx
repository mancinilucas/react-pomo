import { useState } from 'react';
import { Settings } from './components/SettingsModal/SettingsModal';
import { Timer } from './components/Timer/Timer';
import SettingsContext from './SettingsContext';
import './styles/global.scss';

export function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15)

  

  return (
    <div className="mainContent">
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,        
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer /> }
      </SettingsContext.Provider>
            
    </div>
  );
}


