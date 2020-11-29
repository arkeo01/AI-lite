import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'b1d71c85ebbf4f6f93aacf3080b0fe5d'
 });

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

// TODO: Migrate to Redux

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
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
  // TODO: Check if modifications can be done using ES6 syntax
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
    fetch('http://localhost:3000')
      .then(response => response.json())
      // .then(data => console.log(data))
      .then(console.log)  //same as above
  }

  // TODO: Modify to include multiple boxes
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        //Here instead of ImageUrl, input is passed as it would give an error and it is an advanced topic about the way setState works
        this.state.input)
        .then(response => {
          this.displayFaceBox(this.calculateFaceLocation(response))
          if(response) {
          fetch('http://localhost:3000/image', {
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
          }
        })
      .catch(err => console.log(err));
  }

  // TODO: Add method to accept and verify username and password

  onRouteChange = (route) => {
    if(route === 'signin' || route === 'register'){
      this.setState({isSignedIn: false})
    } else if(route === 'home'){
      this.setState({isSignedIn: true})
    }

    this.setState({route});
  }

  // TODO: Add Browse option to upload image from the computer.
  // TODO: Add Preview image function.

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank  name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm 
                onInputChange={this.onInputChange}
                onImageSubmit={this.onImageSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
          : (
            this.state.route ==='signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
