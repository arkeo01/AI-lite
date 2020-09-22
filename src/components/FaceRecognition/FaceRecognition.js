import React from 'react';
import './FaceRecognition.css';
// Fix the problem that there is alt statement even if we don't pass the imageUrl

const FaceRecognition = ({box, imageUrl}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt="Sample Face Detection" width='500px' height='auto'/>
                <div className='bounding-box' style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;