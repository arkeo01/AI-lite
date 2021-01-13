import React from 'react';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
import Rank from '../Rank/Rank';

const Dashboard = ({name, entries, onInputChange, onImageSubmit, box, imageUrl}) => {
	return(
	<div className='App'>
		<Logo />
		<Rank  name={name} entries={entries} />
		<ImageLinkForm 
			onInputChange={onInputChange}
			onImageSubmit={onImageSubmit}
		/>
		<FaceRecognition box={box} imageUrl={imageUrl}/>
	</div>
	);    
}

export default Dashboard;