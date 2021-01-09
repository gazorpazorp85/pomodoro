import { useState, useEffect, useRef } from 'react';

// import { TimerService } from '../services/TimerService';

function Timer({ time }) {

    const targetTime = time * 60;
    const [currentTime, setCurrentTime] = useState(0);
    const [isTimerWorking, setIsTimerWorking] = useState(false);
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
        if (targetTime - currentTime <= 0) clearInterval(interval.current);
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

    return (
        <div>
            <div>{formatTime()}</div>
            <div onClick={isTimerWorkingHandler}>start</div>
        </div>
    )
}

export { Timer }