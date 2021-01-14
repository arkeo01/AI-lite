import React from 'react';
import './FaceRecognition.css';
// Fix the problem that there is alt statement even if we don't pass the imageUrl

const FaceRecognition = ({boxes, imageUrl}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageUrl} alt="Sample Face Detection" width='500px' height='auto'/>
                {
                    boxes.length
                    ?
                        boxes.map((map, index) => {
                            return (
                                <div key={index} className='bounding-box' style={{top:boxes[index].topRow, right: boxes[index].rightCol, bottom: boxes[index].bottomRow, left: boxes[index].leftCol}}></div>
                            );
                        })
                    :
                        <div className='bounding-box'></div>                    
                }
            </div>
        </div>
    );
}

export default FaceRecognition;