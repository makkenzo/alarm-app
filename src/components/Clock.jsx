import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Clock = () => {
    const [time, setTime] = useState(moment().format('LTS'));
    const [date, setDate] = useState(moment().format('LL'));

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(moment().format('LTS'));
            setDate(moment().format('LL'));
        }, 1000);

        return () => clearInterval(timer);
    });

    return (
        <div className="flex flex-col justify-center items-center mt-5">
            <div className="text-6xl font-bold">{time}</div>
            <div className="text-3xl">{date}</div>
        </div>
    );
};

export default Clock;
