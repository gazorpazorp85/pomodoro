import { useState, useEffect, useRef } from 'react';
import { TimerRing } from './Timer/TimerRing';

function Timer({ settings }) {

    const targetTime = settings.time[settings.currentMode] * 60;
    const [currentTime, setCurrentTime] = useState(0);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isTimerWorking, setIsTimerWorking] = useState(false);
    const [circleDasharray, setCircleDasharray] = useState('283');
    const interval = useRef(null);
    const alarmSound = new Audio(`sounds/alarm${settings.sound}.mp3`);

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
            alarmSound.play()
                .catch(err => console.log(err));
            clearInterval(interval.current);
        } else {
            setTimeLeft(targetTime - currentTime);
        }
    }

    const getRawTimeFraction = () => {
        if (timeLeft === targetTime) return 0.99999999;
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

    const restartTimer = () => {
        alarmSound.pause();
        setCurrentTime(0);
        setTimeLeft(null);
        setIsTimerWorking(false);
        setCircleDasharray('283');
    }

    useEffect(() => {
        if (isTimerWorking) {
            timerHandler();
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

    const { color, font } = settings;

    return (
        <div className="flex column center align-center timer-container">
            <div className="flex column center align-center timer-container-inner-circle">
                <TimerRing circleDasharray={circleDasharray} color={color} />
                <div className="flex column center align-center inner-timer-container">
                    <div className="flex center timer-time" style={{ fontFamily: font }}>{formatTime()}</div>
                    {targetTime - currentTime > 0 ?
                        <div
                            className="pointer uppercase time-btn"
                            onClick={isTimerWorkingHandler}
                            style={{ fontFamily: font }}
                        >
                            {renderTimerBtnText()}
                        </div> :
                        <div
                            className="pointer uppercase reset-btn"
                            onClick={restartTimer}
                            style={{ fontFamily: font }}
                        >
                            restart
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export { Timer }