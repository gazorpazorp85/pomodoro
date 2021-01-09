import { ColorIcon } from './SettingsModal/ColorIcon';
import { FontIcon } from './SettingsModal/FontIcon';
import { TimerController } from './SettingsModal/TimerController';

import iconClose from '../assets/imgs/icon-close.svg';

function SettingsModal({ color, isModalShownHandler, saveSettings, selectedClassHandler, settingsUpdateHandler, time }) {

    const timerModes = ['pomodoro', 'shortBreak', 'longBreak'];
    const fontTypes = ['barlow', 'barlowsemibold', 'barlowbold'];
    const colorTypes = ['peach', 'azure', 'violet'];

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
                        return <TimerController key={timeMode} category={timeMode} settingsUpdateHandler={settingsUpdateHandler} time={time[timeMode]} />
                    })}
                </div>
            </div>
            <div className="flex modal-section font-setting">
                <div className="uppercase section-title">font</div>
                <div className="flex">
                    {fontTypes.map(fontType => {
                        return <FontIcon key={fontType} fontType={fontType} selectedClassHandler={selectedClassHandler} settingsUpdateHandler={settingsUpdateHandler} />
                    })}
                </div>
            </div>
            <div className="flex modal-section color-setting">
                <div className="uppercase section-title">color</div>
                <div className="flex">
                    {colorTypes.map(colorType => {
                        return <ColorIcon key={colorType} colorType={colorType} selectedClassHandler={selectedClassHandler} settingsUpdateHandler={settingsUpdateHandler} />
                    })}
                </div>
            </div>
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