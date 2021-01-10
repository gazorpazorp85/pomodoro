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
    } else if (category === 'color' || category === 'font' || category === 'sound') {
      setTempSettings({ ...tempSettings, [category]: diff });
    } else {
      const updatedTime = tempSettings.time[category] + diff;
      if (updatedTime <= 0) return;
      setTempSettings({ ...tempSettings, time: { ...tempSettings.time, [category]: updatedTime } });
    }
  }

  const selectedClassHandler = (category, value) => {
    const { color } = settings;
    if (category === 'currentMode') {
      return (settings[category] === value) ? `selected ${color}` : '';
    } else if (category === 'font') {
      return (tempSettings[category] === value) ? 'selected' : '';
    } else {
      return (tempSettings[category] === value) ? <img src={checkmarkIcon} alt="selected" /> : ''
    }
  }

  const saveSettings = () => {
    TimerService.updateSettings(tempSettings);
    setSettings(tempSettings)
    isModalShownHandler();
  }

  useEffect(() => {
    TimerService.updateSettings(settings);
    setSettings(settings)
  }, [settings])

  const { color, time } = tempSettings;

  return (
    <div className="flex column align-center full main-container w100">
      <h1 className="app-title">pomodoro</h1>
      <ModesMenu color={settings.color} selectedClassHandler={selectedClassHandler} settingsUpdateHandler={settingsUpdateHandler} />
      <Timer settings={settings} />
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
