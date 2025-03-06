import React, { useState, useEffect, useRef } from 'react';
import './TimerModal.css';

const TimerModal = ({ isOpen, onClose, workoutName, duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        alert(`${workoutName} complete!`);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, workoutName]);

    const startTimer = () => {
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(duration);
    };

    if (!isOpen) return null;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="timer-modal-overlay">
            <div className="timer-modal">
                <h2>{workoutName}</h2>
                <p>Time Remaining: {formatTime(timeLeft)}</p>

                <div className="timer-controls">
                    {!isRunning ? (
                        <button onClick={startTimer}>Start</button>
                    ) : (
                        <button onClick={pauseTimer}>Pause</button>
                    )}
                    <button onClick={resetTimer}>Reset</button>
                </div>

                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default TimerModal;