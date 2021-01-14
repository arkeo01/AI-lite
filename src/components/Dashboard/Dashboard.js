import React from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Rank from '../Rank/Rank';

const Dashboard = ({name, entries, onInputChange, onImageSubmit, getFileInput, boxes, imageUrl}) => {
	return(
	<div className='App'>
		<Logo />
		<Rank  name={name} entries={entries} />
		<ImageLinkForm 
			onInputChange={onInputChange}
			onImageSubmit={onImageSubmit}
			getFileInput={getFileInput}
		/>
		<FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
	</div>
	);    
}

export default Dashboard;