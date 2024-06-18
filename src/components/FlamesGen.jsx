import React, { useState } from 'react';
import friends from '../assets/icons/friends.png'
import flamesPic from '../assets/icons/flames.jpg'
import loversPic from '../assets/icons/lovers.png'
import marriagePic from '../assets/icons/marriage.png'
import affectionatePic from '../assets/icons/affectionate.png'
import enemeyPic from '../assets/icons/enemy.png'
import siblingsPic from '../assets/icons/siblings.png'
import sadImg from '../assets/icons/sad.png'
import { useEffect } from 'react';

const FlamesGen = () => {

    // useEffect(() => {
    //     const handleContextMenu = (event) => {
    //       event.preventDefault();
    //     };
    
    //     document.addEventListener('contextmenu', handleContextMenu);
    
    //     return () => {
    //       document.removeEventListener('contextmenu', handleContextMenu);
    //     };
    //   }, []);


    // useEffect(() => {
    //     document.body.style.zoom = "100%";
    //   }, []);


    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [finalString, setFinalString] = useState('Result Shown Here !!');
    const [picture , setPicture] = useState(flamesPic)

    function passVal(e) {
        if (e.target.name === 'name1') {
            setName1(e.target.value);
        } else {
            setName2(e.target.value);
        }
    }

    function generateFinal() {

        setPicture(() => {
            if (res == 'Marriage') {
                return marriagePic
            }
            if (res == 'Lovers') {
                return loversPic
            }
            if (res == 'Siblings') {
                return siblingsPic
            }
            if (res == 'Enemies') {
                return enemeyPic
            }
            if (res == 'Affectionate') {
                return affectionatePic
            }
            if (res == 'Friends') {
                return friends
            }
            if (res == 'No Match Found') {
                return sadImg
            }
        })

        

        function containsNumber(str) {
            return /\d/.test(str);
          }


        let res = flames(name1, name2);
        let finString = ''
        if((name1 == '' && name2 == '') || name1 == '' || name2 == ''){
            setPicture(sadImg)
            finString = (
                <>
                Please !! Enter Both Strings ...
                </>
            );
        }


        else if(containsNumber(name1) || containsNumber(name2)){
            setPicture(sadImg)
            finString = (
                <>
                Please !! Enter a Valid String 
                </>
            );
        }




        else{
            finString = (
                <>
                    The Relationship Between <span style={{ color: 'blue' }}>{name1}</span> and <span style={{ color: 'blue' }}>{name2}</span> will end in <span style={{ color: 'red' }}>{res}</span>
                </>
            );
        }

        setFinalString(finString);


    }


    // function flames(name1, name2) {
    //     function countUniqueLetters(str1, str2) {
    //         let combinedStr = str1 + str2;
    //         let uniqueLetters = combinedStr.split('').filter((char, index, self) => {
    //             return self.indexOf(char) === index;
    //         });
    //         return uniqueLetters.length;
    //     }
    
    //     // Remove spaces and convert to lowercase
    //     name1 = name1.replace(/\s+/g, '').toLowerCase();
    //     name2 = name2.replace(/\s+/g, '').toLowerCase();
    
    //     let uniqueCount = countUniqueLetters(name1, name2);
    //     let flamesArray = ['F', 'L', 'A', 'M', 'E', 'S'];
    //     let resultIndex = uniqueCount % flamesArray.length - 1;
    
    //     if (resultIndex >= 0) {
    //         flamesArray.splice(resultIndex, 1);
    //     } else {
    //         flamesArray.splice(flamesArray.length - 1, 1);
    //     }
    
    //     let flamesResult = flamesArray[(uniqueCount % flamesArray.length) - 1];
    
    //     switch (flamesResult) {
    //         case 'F':
    //             return 'Friends';
    //         case 'L':
    //             return 'Lovers';
    //         case 'A':
    //             return 'Affectionate';
    //         case 'M':
    //             return 'Marriage';
    //         case 'E':
    //             return 'Enemies';
    //         case 'S':
    //             return 'Siblings';
    //         default:
    //             return 'No Match Found';
    //     }
    // }
    
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
        let flamesArray = ["F", "L", "A", "M", "E", "S"];
        let stp = 1;
    
        for (let x = 6; x > 1; x--) {
            let g = (snLength % x) + stp - 1;
            if (g >= x) {
                g = g % x;
            }
            if (g == 0) {
                g = flamesArray.length;
            }
            flamesArray.splice(g - 1, 1);
            stp = g;
        }
    
        switch (flamesArray[0]) {
            case "F":
                return "Friends";
            case "L":
                return "Lovers";
            case "A":
                return "Affectionate";
            case "M":
                return "Marriage";
            case "E":
                return "Enemies";
            case "S":
                return "Siblings";
            default:
                return "No Match Found";
        }
    }
    


    return (
        <div className="overAllDiv">
            <div className="header">
                <p>Flames</p>
            </div>
            <div className="inputParams">
                <label htmlFor="name1">Your Name  </label>
                <input type="text" name="name1" id="name1" className="name1" onChange={passVal} />
                <br />
                <label htmlFor="name2">Your Crush Name  </label>
                <input type="text" name="name2" id="name2" className="name2" onChange={passVal} />
            </div>
            <div className="submitButton">
                <button onClick={generateFinal}>Generate</button>
            </div>
            <div className="resultDiv">
                
            <p>{finalString}</p>
            </div>

            <div className="imgs">

            <div className='imgView'>
                <img src={picture} alt="img" />
            </div>
            
            
            </div>
        </div>
    );
};

export default FlamesGen;
