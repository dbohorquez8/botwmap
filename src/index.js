import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'materialize-css/dist/css/materialize.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as firebase from 'firebase';

injectTapEventPlugin();

const config = {  
  apiKey: "AIzaSyAZIZfce2SejuyrpDhPehl_M6sEiGgYVWM",
  authDomain: "btowmap.firebaseapp.com",
  databaseURL: "https://btowmap.firebaseio.com",
  storageBucket: "btowmap.appspot.com",
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        var token = result.credential.accessToken;
      }
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert("An error occurred")
    });
  }
});

const Main = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
