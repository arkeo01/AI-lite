import React from 'react';
import './FaceRecognition.css';
// Fix the problem that there is alt statement even if we don't pass the imageUrl

const FaceRecognition = ({boxes, imageUrl}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                {
                    imageUrl 
                    ?
                        // TODO: Invalid URL Case handling
                        <img id='inputImage' src={imageUrl} alt="Sample Face Detection" width='500px' height='auto'/>
                    :
                        // TODO: Extraneous 0 handling
                        <legend className="f4 fw4 ph0 mh0">Please Input an Image.</legend>
                }
                
                {
                    !boxes.length
                    ?
                        <div></div>
                    :
                    boxes.map((map, index) => {
                        return (
                            <div key={index} className='bounding-box' style={{top:boxes[index].topRow, right: boxes[index].rightCol, bottom: boxes[index].bottomRow, left: boxes[index].leftCol}}></div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FaceRecognition;