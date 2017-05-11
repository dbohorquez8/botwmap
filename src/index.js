import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'materialize-css/dist/css/materialize.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as firebase from 'firebase';
import {BrowserRouter as Router} from 'react-router-dom';
import {config, auth} from './api/api';


injectTapEventPlugin();

firebase.initializeApp(config);

auth();

const Main = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('root')
);
