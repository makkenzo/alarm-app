import React, { useState } from 'react';

const PuzzleMath = () => {
    const [num1, setNum1] = useState(Math.floor(Math.random() * 100));
    const [num2, setNum2] = useState(Math.floor(Math.random() * 100));
    const [operator, setOperator] = useState('+');
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const calculateAnswer = () => {
        let correctAnswer;

        switch (operator) {
            case '+':
                correctAnswer = num1 + num2;
                break;
            case '-':
                correctAnswer = num1 - num2;
                break;
            case '*':
                correctAnswer = num1 * num2;
                break;
            case '/':
                correctAnswer = num1 / num2;
                break;
            default:
                break;
        }

        const precision = 10;
        const roundedAnswer = Math.round(correctAnswer * precision) / precision;

        if (roundedAnswer === parseFloat(answer)) {
            setCount(count + 1);
            generatePuzzle();
            setMessage('Правильно!');
            console.log(`Count: ${count}`);
        } else {
            setMessage('Неаравильно. Попробуйте еще раз.');
            console.log(roundedAnswer, parseFloat(answer));
        }
    };

    const generatePuzzle = () => {
        setNum1(Math.floor(Math.random() * 100));
        setNum2(Math.floor(Math.random() * 100));

        const operators = ['+', '-', '*', '/'];

        setOperator(operators[Math.floor(Math.random() * operators.length)]);
        setAnswer('');
        setMessage('');
    };

    return (
        <>
            {count === 2 ? (
                <h1 className="text-3xl font-bold mb-6">Будильник выключен</h1>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-6">Решите 2 примера</h1>
                    <div className="mb-4">
                        <p className="inline">{num1}</p>
                        <p className="inline mx-2">{operator}</p>
                        <p className="inline">{num2}</p>
                        <p className="inline mx-2">=</p>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="border border-gray-400 px-2 py-1 rounded"
                        />
                    </div>
                    <div>
                        <button
                            onClick={calculateAnswer}
                            className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Проверить
                        </button>
                        <button
                            onClick={generatePuzzle}
                            className="mx-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            Новый пример
                        </button>
                    </div>
                    {message && <p className="text-red-500 mt-4">{message}</p>}
                </div>
            )}
        </>
    );
};

export default PuzzleMath;
