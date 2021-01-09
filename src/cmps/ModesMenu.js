function ModesMenu({ selectedClassHandler, settingsUpdateHandler }) {

    const modes = ['pomodoro', 'shortBreak', 'longBreak'];

    const clickHandler = (value) => {
        settingsUpdateHandler('currentMode', value);
    }

    const formatedCategory = (text) => {
        if (text === 'pomodoro') return text;
        return text.replace('B', ' b');
    }

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
        </div>
    )
}

export { ModesMenu }