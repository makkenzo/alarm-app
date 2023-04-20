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
import PuzzleMath from './PuzzleMath';

const PuzzleCaptcha = () => {
    const [icons, setIcons] = useState([]);
    const [foundCatCount, setFoundCatCount] = useState(0);
    const [success, setSuccess] = useState(false);

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
        const shuffledIcons = shuffle(allIcons);
        setIcons(shuffledIcons);
    }, []);

    const handleIconClick = (index) => {
        if (icons[index].type.name === 'GiCat') {
            setFoundCatCount(foundCatCount + 1);
            if (foundCatCount === 1) {
                setFoundCatCount(0);
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
                const shuffledIcons = shuffle(allIcons);
                setIcons(shuffledIcons);
                setSuccess(true);
            } else {
                const shuffledIcons = shuffle(icons);
                setIcons(shuffledIcons);
            }
        }
    };

    return (
        <>
            {success ? (
                <PuzzleMath />
            ) : (
                <>
                    <h1 className="font-bold text-2xl">Найдите кота</h1>
                    <div className="grid grid-cols-3 gap-4 mt-6">
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
                </>
            )}
        </>
    );
};

export default PuzzleCaptcha;
