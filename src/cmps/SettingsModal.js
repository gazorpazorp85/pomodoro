import { SettingsModalSectionTemplate } from './SettingsModal/SettingsModalSectionTemplate';
import { TimerController } from './SettingsModal/TimerController';

import iconClose from '../assets/imgs/icon-close.svg';

function SettingsModal({ color, isModalShownHandler, saveSettings, selectedClassHandler, settingsUpdateHandler, time }) {

    const timerModes = ['pomodoro', 'shortBreak', 'longBreak'];
    const fontTypes = ['barlow', 'barlowsemibold', 'barlowbold'];
    const colorTypes = ['peach', 'azure', 'violet'];
    const soundTypes = ['01', '02', '03', '04', '05', '06'];
    const cmps = [
        { settingName: 'font', types: fontTypes },
        { settingName: 'color', types: colorTypes },
        { settingName: 'sound', types: soundTypes }
    ];

    return (
        <div className="flex column modal-container" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex align-center modal-section modal-title-container">
                <h1 className="capitalize modal-settings-txt">settings</h1>
                <div className="flex pointer close-img-container" onClick={() => isModalShownHandler('closeModal')}>
                    <img src={iconClose} alt="close" />
                </div>
            </div>
            <div className="flex column modal-section">
                <div className="uppercase section-title time-title">time (minutes)</div>
                <div className="flex timer-panel">
                    {timerModes.map(timeMode => {
                        return (
                            <TimerController
                                category={timeMode}
                                key={timeMode}
                                settingsUpdateHandler={settingsUpdateHandler}
                                time={time[timeMode]}
                            />
                        )
                    })}
                </div>
            </div>
            {cmps.map(cmp => {
                return (
                    <SettingsModalSectionTemplate
                        key={cmp.settingName}
                        selectedClassHandler={selectedClassHandler}
                        settingName={cmp.settingName}
                        settingsUpdateHandler={settingsUpdateHandler}
                        types={cmp.types}
                    />
                )
            })}
            <div
                className={`flex center align-center pointer capitalize ${color} apply-btn`}
                onClick={saveSettings}
            >
                apply
            </div>
        </div>
    )
}

export { SettingsModal }