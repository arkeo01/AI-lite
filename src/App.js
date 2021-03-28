import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import RegisterFormik from './components/Register/RegisterFormik';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes:[],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

// TODO: Migrate to Redux
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      // Changing to array for multiple faces
      boxes:[],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // Function for loading user
  loadUser = (loadingUser) => {
    this.setState({
      user: {
        id: loadingUser.id,
        name: loadingUser.name,
        email: loadingUser.email,
        entries: loadingUser.entries,
        joined: loadingUser.joined
      }
    })
  }

  // Connecting frontend to the backend
  componentDidMount() {
    fetch('https://quiet-waters-14359.herokuapp.com/')
      .then(response => response.json())
      .then(data => console.log(data))
      // .then(console.log)  //same as above
  }

  // Calculates location of all the faces present in the image
  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    const regions = data.outputs[0].data.regions;
    const boxes = regions.map((region) => {
      const face = region.region_info.bounding_box;
      return{
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
    });

    // Multiple Face
    // Array containing face locations object of all faces
    return boxes;

  }

  displayFaceBox = (boxes) => {
    console.log(boxes);
    const newBoxes = JSON.parse(JSON.stringify(boxes));
    // For multiple faces
    this.setState({boxes: newBoxes});
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({
      input: event.target.value,
      imageUrl: event.target.value,
      boxes: []
    });
  }

  // Function to fetch image from a file input field
  // TODO: Need to modify this.state according to the file input
  getFileInput = (event) => {
    const filePath = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(filePath);
    
    fileReader.onload = (e) => {
      console.log(e.target.result);
      this.setState({
        input: e.target.result,     // TODO: This doesn't work with current API Integration, Update to Clarifai Data Mode
        imageUrl: e.target.result,
        boxes:[]
      })
    }
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://quiet-waters-14359.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response))
      if(response) {
      // TODO: Update Counter only when it is a different image
      // For this you can save hash of input in db
      fetch('https://quiet-waters-14359.herokuapp.com/image', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          // This approach creates bugs as it creates new object with user object with just entries attribute
          // this.setState({
          //   user: {
          //     entries: count
          //   }
          // })
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        .catch(console.log);
      }
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signin' || route === 'register'){
      this.setState(initialState)
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route});
  }

  render() {
    return (
      <Router className='App'> 
        <Route path="/">
          <Particles className='particles'
            params={particlesOptions}
          />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {/* TODO: Add Landing Page Code here */}
          {
            this.state.isSignedIn
              ? 
                < Switch>
                  <Redirect  from="/signin" to="/dashboard" />
                  <Redirect  from="/register" to="/dashboard" />
                  <Route className='App'
                    path = "/dashboard"
                    render={(props) => (
                      <Dashboard {...props}
                        name={this.state.user.name}
                        entries={this.state.user.entries}
                        onInputChange={this.onInputChange}
                        onImageSubmit={this.onImageSubmit}
                        getFileInput={this.getFileInput}
                        // TODO: A quick Exercise: See how to use lifecycle methods to pass boxes[0], as initially the state is undefined
                        // And the state comes only after the request is made.
                        boxes={this.state.boxes}
                        imageUrl={this.state.imageUrl}
                      />
                    )}/>
                  </Switch>
              : 
                <Switch>
                  <Route 
                    path="/signin"
                    render={(props) => (    //Notice the rounded brackets instead of square brackets
                      <Signin {...props} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )}
                  />
                  <Route 
                    path="/register"
                    render={(props) => (
                      <Register {...props} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                      // <RegisterFormik {...props} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )}
                  />
                </Switch>
          }
        </Route>
      </Router>
    );
  }
}

export default App;
