import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onImageSubmit, getFileInput }) => {
	return(
		<div>
			<p className='f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type="text" onChange={onInputChange}/>
					<button 
						className=' w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onImageSubmit}
					> 
						detect 
					</button>
					{/* TODO: Enable this along with the integration of Clarifai Data Mode 
					<input className='f4 pa2 w-70 center' type="file" onChange={getFileInput}/> */}

				</div>
			</div>
		</div>
	);

}

export default ImageLinkForm