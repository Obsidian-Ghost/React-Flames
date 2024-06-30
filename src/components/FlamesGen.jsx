import React, { useState, useEffect } from 'react';
import friends from '../assets/icons/friends.png';
import flamesPic from '../assets/icons/flames.jpg';
import loversPic from '../assets/icons/lovers.png';
import marriagePic from '../assets/icons/marriage.png';
import affectionatePic from '../assets/icons/affectionate.png';
import enemeyPic from '../assets/icons/enemy.png';
import siblingsPic from '../assets/icons/siblings.png';
import sadImg from '../assets/icons/sad.png';

const colors = [
    '#00ff08', '#ff0000', '#0000ff', '#ffff00', '#ff00ff', 
    '#00ffff', '#ff8800', '#ff0088', '#8800ff', '#88ff00', 
    '#0088ff', '#ff5500', '#ff0055', '#5500ff', '#55ff00', 
    '#0055ff', '#00ff55', '#ff00aa', '#aa00ff', '#aaff00', 
    '#00ffaa', '#ffaa00', '#aa00aa', '#00aaff', '#aaffaa', 
    '#00aa55', '#0055aa', '#aa0055', '#aa00aa', '#5500aa', 
    '#00aa00', '#00ff55', '#00ffaa', '#aa00ff', '#ff00aa', 
    '#00ffaa', '#ffaa00', '#ffaa55', '#aaff55', '#55ff00'
];




const FlamesGen = () => {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [finalString, setFinalString] = useState('Result Appears Here !!');
    const [picture, setPicture] = useState(flamesPic);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 450); // Change color every 450 milli seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    function passVal(e) {
        if (e.target.name === 'name1') {
            setName1(e.target.value);
        } else {
            setName2(e.target.value);
        }
    }

    function generateFinal() {
        let res = flames(name1, name2);
        setPicture(() => {
            switch (res) {
                case 'Marriage':
                    return marriagePic;
                case 'Lovers':
                    return loversPic;
                case 'Siblings':
                    return siblingsPic;
                case 'Enemies':
                    return enemeyPic;
                case 'Affectionate':
                    return affectionatePic;
                case 'Friends':
                    return friends;
                default:
                    return sadImg;
            }
        });

        let finString = '';
        if ((name1 === '' && name2 === '') || name1 === '' || name2 === '') {
            setPicture(sadImg);
            finString = 'Please !! Enter Both The Names ...';
        } else if (containsNumber(name1) || containsNumber(name2)) {
            setPicture(sadImg);
            finString = 'Please !! Enter a Valid Name.';
        } else {
            finString = (
                <>
                    <span style={{ color: 'blue' }}>{name1}</span> and{' '}
                    <span style={{ color: 'blue' }}>{name2}</span> are destined to be{' '}
                    <span style={{ color: 'red' }}>{res}</span>
                </>
            );
        }

        setFinalString(finString);
    }

    function containsNumber(str) {
        return /\d/.test(str);
    }

    function flames(name1, name2) {
        name1 = name1.replace(/\s+/g, '').toUpperCase();
        name2 = name2.replace(/\s+/g, '').toUpperCase();

        for (let i = 0; i < name1.length; i++) {
            for (let j = 0; j < name2.length; j++) {
                if (name1[i] === name2[j]) {
                    let a1 = name1.substring(0, i);
                    let a2 = name1.substring(i + 1, name1.length);
                    name1 = a1 + a2;
                    i = -1;
                    let b1 = name2.substring(0, j);
                    let b2 = name2.substring(j + 1, name2.length);
                    name2 = b1 + b2;
                    j = -1;
                    break;
                }
            }
        }

        let strikedName = name1 + name2;
        let snLength = strikedName.length;
        let flamesArray = ['F', 'L', 'A', 'M', 'E', 'S'];
        let stp = 1;

        for (let x = 6; x > 1; x--) {
            let g = (snLength % x) + stp - 1;
            if (g >= x) {
                g = g % x;
            }
            if (g === 0) {
                g = flamesArray.length;
            }
            flamesArray.splice(g - 1, 1);
            stp = g;
        }

        switch (flamesArray[0]) {
            case 'F':
                return 'Friends';
            case 'L':
                return 'Lovers';
            case 'A':
                return 'Affectionate';
            case 'M':
                return 'Marriage';
            case 'E':
                return 'Enemies';
            case 'S':
                return 'Siblings';
            default:
                return 'No Match Found';
        }
    }

    const dynamicStyle = {
        boxShadow: `0 0 32px 7px ${colors[currentColorIndex]}`,
    };

    return (
        <div style={dynamicStyle} className="overAllDiv">
            <div className="header">
                <p>Flames</p>
            </div>
            <div className="inputParams">
                <label htmlFor="name1">Your Name </label>
                <input type="text" name="name1" id="name1" className="name1" onChange={passVal} />
                <br />
                <label htmlFor="name2">Your Crush Name </label>
                <input type="text" name="name2" id="name2" className="name2" onChange={passVal} />
            </div>
            <div className="submitButton">
                <button onClick={generateFinal}>Find Destiny</button>
            </div>
            <div className="resultDiv">
                <p>{finalString}</p>
            </div>
            <div className="imgs">
                <div className="imgView">
                    <img src={picture} alt="img" />
                </div>
            </div>
        </div>
    );
};

export default FlamesGen;
