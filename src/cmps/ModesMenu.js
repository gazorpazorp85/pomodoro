import { useState, useEffect } from 'react';

function ModesMenu({ isTimerWorking, selectedClassHandler, settingsUpdateHandler }) {

    const modes = ['pomodoro', 'shortBreak', 'longBreak'];
    const [isModalShown, setIsModalShown] = useState(false);


    const clickHandler = (value) => {
        if (isTimerWorking) {
            setIsModalShown(true);
            return
        };
        settingsUpdateHandler('currentMode', value);
    }

    const formatedCategory = (text) => {
        if (text === 'pomodoro') return text;
        return text.replace('B', ' b');
    }

    useEffect(() => {
        let modalInterval = setTimeout(() => setIsModalShown(false), 3000);
        return () => {
            clearTimeout(modalInterval);
        }
    })

    return (
        <div className="flex align-center modes-menu-container">
            {modes.map(mode => {
                return (
                    <div
                        className={`flex align-center mode ${selectedClassHandler('currentMode', mode)}`}
                        key={mode}
                        onClick={() => clickHandler(mode)}
                    >
                        {formatedCategory(mode)}
                    </div>
                )
            })}
            {isModalShown && <div className="flex center align-center modal-timer-msg">Timer is running. In order to change mode, pause the timer first</div>}
        </div>
    )
}

export { ModesMenu }