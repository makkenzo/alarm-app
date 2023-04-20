import React, { useEffect, useState } from 'react';
import PuzzleCards from './PuzzleCards';
import soundFile from '../assets/alarm.mp3';

const Alarm = () => {
    const [alarmTime, setAlarmTime] = useState('');
    const [alarmSet, setAlarmSet] = useState(false);
    const [alarmTriggered, setAlarmTriggered] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [puzzlesPassed, setPuzzlesPassed] = useState(false);
    const [audioPlaying, setAudioPlaying] = useState(false);

    const handleSetAlarm = () => {
        setAlarmSet(true);

        localStorage.setItem('alarmTime', alarmTime);
        localStorage.setItem('alarmSet', true);
    };

    const handleCancelAlarm = () => {
        setAlarmSet(false);
        setAlarmTriggered(false);

        localStorage.removeItem('alarmTime');
        localStorage.removeItem('alarmSet');
    };

    const handleAlarmChange = (e) => {
        setAlarmTime(e.target.value);
    };

    const getTimeUntilAlarm = () => {
        const now = new Date();
        const alarm = new Date(now.toDateString() + ' ' + alarmTime);
        let timeUntilAlarm = alarm.getTime() - now.getTime();

        if (timeUntilAlarm < 0) {
            const nextDay = new Date(now);
            nextDay.setDate(now.getDate() + 1);
            timeUntilAlarm = nextDay.getTime() - now.getTime() + alarm.getTimezoneOffset() * 60 * 1000;
        }
        return timeUntilAlarm;
    };

    useEffect(() => {
        let intervalId;

        const savedAlarmTime = localStorage.getItem('alarmTime');
        const savedAlarmSet = localStorage.getItem('alarmSet');

        if (savedAlarmSet && savedAlarmTime) {
            setAlarmTime(savedAlarmTime);
            setAlarmSet(true);
        }

        if (alarmSet) {
            intervalId = setTimeout(() => {
                setAlarmTriggered(true);
                setDisabled(true);
            }, getTimeUntilAlarm());
        }

        return () => {
            clearTimeout(intervalId);
        };
    }, [alarmSet]);

    useEffect(() => {
        if (puzzlesPassed) {
            setAlarmTriggered(false);
            setDisabled(false);
        }
    }, [puzzlesPassed]);

    const handlePuzzlesPassed = (passed) => {
        setPuzzlesPassed(passed);
    };

    const playAlarmSound = () => {
        const audio = new Audio(soundFile);
        audio.loop = true;
        audio.play();
        setAudioPlaying(false);
    };

    const stopAlarmSound = () => {
        const audio = new Audio(soundFile);
        audio.pause();
        audio.currentTime = 0;
        setAudioPlaying(false);
    };

    useEffect(() => {
        console.log(puzzlesPassed);
        if (alarmTriggered && !puzzlesPassed) {
            playAlarmSound();
        }
    }, [alarmTriggered, puzzlesPassed]);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="mt-8">
                    <h2 className="flex text-xl font-medium justify-center">Установить будильник</h2>
                    {alarmSet ? (
                        <div className="flex justify-between items-center mt-4">
                            {alarmTriggered ? (
                                <>
                                    <p className="text-lg font-medium text-red-500 mr-3">Будильник сработал</p>
                                    {puzzlesPassed ? (
                                        <audio autoPlay loop="true">
                                            <source src="../assets/alarm.mp3" type="audio/mpeg" />
                                        </audio>
                                    ) : null}
                                </>
                            ) : (
                                <p className="text-lg font-medium mr-3">Будильник установлен на {alarmTime}</p>
                            )}
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                onClick={handleCancelAlarm}
                                disabled={disabled}
                            >
                                Отменить
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center mt-4">
                            <input
                                type="time"
                                className="border border-gray-400 py-2 px-4 rounded mr-3"
                                value={alarmTime}
                                onChange={handleAlarmChange}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                onClick={handleSetAlarm}
                            >
                                Добавить
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {alarmTriggered && <PuzzleCards />}
        </>
    );
};

export default Alarm;
