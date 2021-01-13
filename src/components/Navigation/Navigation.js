import React from 'react'
import { Link } from 'react-router-dom';

const Navigation = ({onRouteChange, isSignedIn}) => {
    return(
        isSignedIn ?
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            {/* <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign Out</p> */}
            {/* Link also takes onClick as prop */}
            <Link className='f3 link dim black underline pa3 pointer' to="/signin" onClick={() => onRouteChange('signin')}>Sign Out</Link>
        </nav>
        : 
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            {/* <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('signin')}>Sign in</p> */}
            <Link className='f3 link dim black underline pa3 pointer' to="/signin">Sign in</Link>
            {/* <p className='f3 link dim black underline pa3 pointer' onClick={() => onRouteChange('register')}>Register</p> */}
            <Link className='f3 link dim black underline pa3 pointer' to="/register">Register</Link>
        </nav>
    );
}

export default Navigation;