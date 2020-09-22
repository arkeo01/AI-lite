import React from 'react';

// Fix the problem that there is alt statement even if we don't pass the imageUrl

const FaceRecognition = ({imageUrl}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img src={imageUrl} alt="Sample Face Detection" width='500px' height='auto'/>
            </div>
        </div>
    );
}

export default FaceRecognition;