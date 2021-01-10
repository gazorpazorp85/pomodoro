import { useState, useEffect } from 'react';

import { ModesMenu } from './cmps/ModesMenu';
import { SettingsModal } from './cmps/SettingsModal';
import { Timer } from './cmps/Timer';

import { TimerService } from './services/TimerService';

import checkmarkIcon from './assets/imgs/checkmark.png';
import settingsIcon from './assets/imgs/settingsIcon.png';

function App() {
  const [isModalShown, setIsModalShown] = useState(false);
  const [settings, setSettings] = useState(TimerService.loadSettings());
  const [tempSettings, setTempSettings] = useState(TimerService.loadSettings());

  const isModalShownHandler = (txt) => {
    if (txt === 'closeModal') setTempSettings(TimerService.loadSettings());
    setIsModalShown(prevIsModalShown => !prevIsModalShown);
  }

  const settingsUpdateHandler = (category, diff) => {
    if (category === 'currentMode') {
      setSettings({ ...settings, [category]: diff });
    } else if (category === 'color' || category === 'font') {
      setTempSettings({ ...tempSettings, [category]: diff });
    } else {
      const updatedTime = tempSettings.time[category] + diff;
      setTempSettings({ ...tempSettings, time: { ...tempSettings.time, [category]: updatedTime } });
    }
  }

  const selectedClassHandler = (category, value) => {
    if (category === 'currentMode') {
      return (settings[category] === value) ? 'selected' : '';
    } else if (category === 'font') {
      return (tempSettings[category] === value) ? 'selected' : '';
    } else {
      return (tempSettings.color === value) ? <img src={checkmarkIcon} alt="selected" /> : ''
    }
  }

  const saveSettings = () => {
    TimerService.updateSettings(tempSettings);
    setSettings(tempSettings)
    isModalShownHandler();
  }

  useEffect(() => {
    TimerService.updateSettings(settings);
  }, [settings])


  const { currentMode } = settings;
  const { color, time } = tempSettings;

  return (
    <div className="flex column align-center full main-container w100">
      <h1 className="app-title">pomodoro</h1>
      <ModesMenu selectedClassHandler={selectedClassHandler} settingsUpdateHandler={settingsUpdateHandler} />
      <Timer settings={settings} time={settings.time[currentMode]} />
      <div className="flex center pointer settings-btn" onClick={isModalShownHandler}>
        <img src={settingsIcon} alt="settings" />
      </div>
      {isModalShown &&
        <div className="flex center align-center screen" onClick={isModalShownHandler}>
          <SettingsModal
            color={color}
            isModalShownHandler={isModalShownHandler}
            saveSettings={saveSettings}
            selectedClassHandler={selectedClassHandler}
            settingsUpdateHandler={settingsUpdateHandler}
            time={time}
          />
        </div>}
    </div>
  );
}

export default App;
