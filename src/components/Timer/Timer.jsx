import React, { useEffect, useState } from 'react';
import './Timer.scss'

const Timer = () => {
    const [seconds, setSeconds] = useState(55)
    const [minutes, setMinutes] = useState(0)
    const [timerOn, setTimerOn] = useState(false)



    useEffect(() => {
        let interval = null
        if (timerOn) {
            interval = setInterval(() => {
                setSeconds(seconds => {
                    if (seconds === 59) {
                        setMinutes(minutes + 1);
                        return 0;
                    } else {
                        return seconds + 1;
                    }
                });
            }, 1000);
        } else {
            setMinutes(0)
            setSeconds(0)
        }

        return () => {
            clearInterval(interval);
        };
    }, [timerOn, seconds, minutes]);

    return (
        <div className='timer__container'>
            <p className='timer__title'>Time Your Rest</p>
            <p className='timer__time'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</p>

            {!timerOn && <button className='timer__btn' onClick={() => setTimerOn(true)}>Start</button>}
            {timerOn && <button className='timer__btn' onClick={() => setTimerOn(false)}>Reset</button>}

        </div>
    );
};

export default Timer;