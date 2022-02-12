import ReactSlider from 'react-slider';

import { useContext } from 'react';
import SettingsContext from '../../SettingsContext';
import { BackButton } from '../BackButton/BackButton';

import '../../styles/SettingsModal.scss';

export function Settings(){
  const settingsInfo = useContext(SettingsContext)
  return(
    <div className="settingsModal">
      <label>work: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div className="back-button">
        <BackButton 
        onClick={() => settingsInfo.setShowSettings(false)}/>
      </div>
    </div>
  );
}
