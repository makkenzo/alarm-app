import React, { useEffect, useState } from 'react';
// 2. Аналог гугл капчи, нужно сделать чтоб рендерилось 9 различных картинок, в одной из них будет картинка, котика, так нужно капчу отгадать два раза
// 3. Обычные математические задачи, нужно решить два простых математических примера, диапазон двух чисел от 1 до 99, например 12+ 84
import { DiPython, DiReact, DiRuby, DiScala, DiSwift, DiUnitySmall, DiNodejsSmall, DiMongodb } from 'react-icons/di';
import { MdQuestionMark } from 'react-icons/md';
import PuzzleCaptcha from './PuzzleCaptcha';

const PuzzleCards = () => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [isPuzzleCompleted, setIsPuzzleCompleted] = useState(false);

    const icons = [DiPython, DiReact, DiRuby, DiScala, DiSwift, DiUnitySmall, DiNodejsSmall, DiMongodb];

    useEffect(() => {
        const shuffledIcons = shuffle(icons.concat(icons));
        const cards = shuffledIcons.map((icon, index) => {
            return {
                id: index,
                icon: icon,
                isFlipped: false,
            };
        });
        setCards(cards);
    }, []);

    const shuffle = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    const handleCardClick = (card) => {
        if (matchedCards.some((matchedCard) => matchedCard.id === card.id)) {
            return;
        }

        if (!card.isFlipped && selectedCards.length < 2) {
            setSelectedCards([...selectedCards, card]);
            setCards((cards) =>
                cards.map((c) => {
                    if (c.id === card.id) {
                        return { ...c, isFlipped: true };
                    }
                    return c;
                })
            );
            if (selectedCards.length === 1 && selectedCards[0].icon === card.icon) {
                setMatchedCards([...matchedCards, selectedCards[0], card]);
                setSelectedCards([]);
            }
        }
    };

    useEffect(() => {
        if (selectedCards.length === 2) {
            setTimeout(() => {
                const [card1, card2] = selectedCards;
                if (card1.icon === card2.icon) {
                    setMatchedCards([...matchedCards, card1, card2]);
                    setCards((cards) =>
                        cards.map((card) => {
                            if (card.id === card1.id || card.id === card2.id) {
                                return { ...card, isFlipped: true };
                            } else {
                                return card;
                            }
                        })
                    );
                } else {
                    setCards((cards) =>
                        cards.map((card) => {
                            if (card.id === card1.id || card.id === card2.id) {
                                return { ...card, isFlipped: false };
                            } else {
                                return card;
                            }
                        })
                    );
                }
                setSelectedCards([]);
            }, 1000);
        }
    }, [selectedCards]);

    useEffect(() => {
        if (matchedCards.length === icons.length * 2) {
            onPuzzleComplete();
        }
    }, [matchedCards]);

    const handleRestartClick = () => {
        const shuffledIcons = shuffle(icons.concat(icons));
        const cards = shuffledIcons.map((icon, index) => {
            return {
                id: index,
                icon: icon,
                isFlipped: false,
            };
        });
        setCards(cards);
        setSelectedCards([]);
        setMatchedCards([]);
    };

    const onPuzzleComplete = () => {
        setIsPuzzleCompleted(true);
    };

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            {isPuzzleCompleted ? (
                <PuzzleCaptcha />
            ) : (
                <div className="w-96 p-6 bg-white rounded-md shadow-lg">
                    {cards.length > 0 ? (
                        <div className="grid grid-cols-4 gap-6">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="bg-gray-200 rounded-md p-4 flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-colors duration-300"
                                    onClick={() => handleCardClick(card)}
                                >
                                    {card.isFlipped ? (
                                        <card.icon className="text-4xl text-gray-600" />
                                    ) : (
                                        <MdQuestionMark className="text-4xl text-gray-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 text-xl text-center">Get ready to start in 5 seconds...</div>
                    )}
                    <div className="flex justify-center mt-6">
                        <button
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                            onClick={handleRestartClick}
                        >
                            Начать заново
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PuzzleCards;
