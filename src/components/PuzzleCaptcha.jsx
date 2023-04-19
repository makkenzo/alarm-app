import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import {
    MdAirplanemodeActive,
    FaAmbulance,
    BsCameraVideo,
    AiFillCar,
    GrGamepad,
    RiMotorbikeFill,
    TiPlane,
    FiShoppingBag,
    GiCat,
} from 'react-icons/all';

const PuzzleCaptcha = () => {
    const [icons, setIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const allIcons = [
            <MdAirplanemodeActive size={50} />,
            <FaAmbulance size={50} />,
            <BsCameraVideo size={50} />,
            <AiFillCar size={50} />,
            <GrGamepad size={50} />,
            <RiMotorbikeFill size={50} />,
            <TiPlane size={50} />,
            <FiShoppingBag size={50} />,
            <GiCat size={50} />,
        ];
        const catIndex = Math.floor(Math.random() * 9);
        const shuffledIcons = shuffle(allIcons);
        setIcons(shuffledIcons);
        setSelectedIcon(catIndex);
    }, []);

    const handleIconClick = (index) => {
        console.log(index, selectedIcon);
        if (index === selectedIcon) {
            setAttempts(attempts + 1);
            if (attempts === 0) {
                setCards(shuffle(cards));
            } else if (attempts === 1) {
                console.log('success');
            }
        } else {
            setSelectedIcon(Math.floor(Math.random() * 9));
            setAttempts(0);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4 mt-8">
            {icons.map((icon, index) => (
                <div key={index} className="flex justify-center items-center">
                    <button
                        className="p-2 rounded-lg focus:outline-none bg-white shadow-md hover:shadow-lg transition duration-300"
                        onClick={() => handleIconClick(index)}
                    >
                        {icon}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PuzzleCaptcha;
