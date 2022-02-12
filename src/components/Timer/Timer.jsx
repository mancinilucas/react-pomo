import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import { PauseButton } from '../PauseButton/PauseButton';
import { PlayButton } from '../PlayButton/PlayButton';
import { SettingsButton } from '../SettingsButton/SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react'
import SettingsContext from '../../SettingsContext'

import 'react-circular-progressbar/dist/styles.css';

export function Timer(){
  const colorRed = '#f54e4e'
  const colorGreen = '#4aec8c'

  const settingsInfo = useContext(SettingsContext)

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work'); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    },1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = mode === 'work'
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0'+seconds;

  return (
    <div>
      <CircularProgressbar 
      value={percentage} 
      text={minutes + ':' + seconds} 
      styles={buildStyles({
        textColor: '#fff', 
        pathColor: mode === 'work' ? colorRed : colorGreen,
        tailColor: 'rgba(255, 255, 255,.2)',
      })}/>
      <div>
        {isPaused 
        ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false}}/> 
        : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true}}/>}
      </div>
      <div>
        <SettingsButton 
        onClick = {()=> settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}