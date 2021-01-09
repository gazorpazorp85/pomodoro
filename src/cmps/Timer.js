import { useState, useEffect, useRef } from 'react';
import { TimerRing } from './Timer/TimerRing';

// import { TimerService } from '../services/TimerService';

function Timer({ time }) {

    const targetTime = time * 60;
    const [currentTime, setCurrentTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerWorking, setIsTimerWorking] = useState(false);
    const [circleDasharray, setCircleDasharray] = useState('283');
    const interval = useRef(null);

    const formatTime = () => {
        const time = targetTime - currentTime;
        const mins = Math.floor(time / 60);
        const secs = time % 60;
        const formatedMins = (mins < 10) ? `0${mins}` : mins;
        const formatedSecs = (secs < 10) ? `0${secs}` : secs;
        return `${formatedMins}:${formatedSecs}`
    }

    const timerHandler = () => {
        interval.current = setInterval(() => {
            setCurrentTime(prevCurrentTime => prevCurrentTime + 1);
        }, 1000)
    }

    const isTimerWorkingHandler = () => {
        setIsTimerWorking(prevIsTimerWorking => !prevIsTimerWorking)
    }

    const isTimeOver = () => {
        if (targetTime - currentTime <= 0) {
            clearInterval(interval.current);
        } else {
            setTimeLeft(targetTime - currentTime);
        }
    }

    const getRawTimeFraction = () => {
        const rawTimeFraction = timeLeft / targetTime;
        return rawTimeFraction - (1 / targetTime) * (1 - rawTimeFraction);
    }
    const updateCircleDasharray = () => {
        const rawTimeFraction = getRawTimeFraction();
        const newCircleDasharray = `${(((rawTimeFraction * 283)).toFixed(0))} 283`;
        setCircleDasharray(newCircleDasharray);
    }

    const renderTimerBtnText = () => {
        return isTimerWorking ? 'pause' : 'start';
    }

    useEffect(() => {
        if (isTimerWorking) {
            timerHandler();
            updateCircleDasharray();
        } else {
            clearInterval(interval.current);
        }
    }, [isTimerWorking]);

    useEffect(() => {
        isTimeOver();
    }, [currentTime]);

    useEffect(() => {
        updateCircleDasharray();
    }, [timeLeft])

    return (
        <div className="flex column center align-center timer-container">
            <div className="flex column center align-center timer-container-inner-circle">
                <TimerRing circleDasharray={circleDasharray} />
                <div className="flex column center align-center inner-timer-container">
                    <div className="flex center time-title">{formatTime()}</div>
                    <div
                        className="pointer uppercase time-btn"
                        onClick={isTimerWorkingHandler}
                    >
                        {renderTimerBtnText()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Timer }