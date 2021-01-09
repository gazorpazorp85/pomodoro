import upArrow from '../../assets/imgs/up-arrow.png'
import downArrow from '../../assets/imgs/down-arrow.png'

function TimerController({ category, settingsUpdateHandler, time }) {

    const formatedCategory = () => {
        if (category === 'pomodoro') return category;
        return category.replace('B', ' b');
    }

    const changeTime = (diff) => {
        if (time + diff < 0) return;
        settingsUpdateHandler(category, diff);
    }

    return (
        <div className="flex column timer-controller-container">
            <div className="timer-category">{formatedCategory()}</div>
            <div className="flex time-controller">
                <div className="flex time-display">{time}</div>
                <div className="flex column">
                    <div className="pointer timer-img-container" onClick={() => changeTime(1)}>
                        <img src={upArrow} alt="up" />
                    </div>
                    <div className="pointer timer-img-container" onClick={() => changeTime(-1)}>
                        <img src={downArrow} alt="down" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { TimerController }