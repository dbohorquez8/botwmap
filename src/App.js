import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {Route, Switch} from 'react-router-dom';
import Dashboard from './Dashboard';
import UserMap from './UserMap';
import {getCurrentUser, getUserMaps, signOut} from './api/api';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMaps: [],
      currentUser: undefined
    }

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    getCurrentUser().then((user) => {
      getUserMaps(user.uid, (userMapsObject) => {
        var userMaps = [];
        if(userMapsObject) {
          userMaps = Object.keys(userMapsObject).map((key) => Object.assign({}, userMapsObject[key], { id: key }));
        }
        this.setState({
          currentUser: user,
          userMaps: userMaps
        });
      });
    });
  }

  handleSignOut() {
    signOut();
  }

  render() {
    const header = <AppBar
      style={{marginBottom: '40px'}}
      title={<span>Hyrule Map</span>}
      iconElementRight={<FlatButton label="Sign Out" onClick={this.handleSignOut} />}
      showMenuIconButton={false}
    />
    return (
      <div>
        <Switch>
          <Route path="/maps/:id" render={(props) => <div>
              {header}
              <UserMap props={props} map={props.match.params.id} />
            </div>
          } />
          <Route path="/" exact render={(props) => <div>
              {header}
              <Dashboard props={props} userMaps={this.state.userMaps} currentUser={this.state.currentUser} />
            </div>
          } />
        </Switch>
      </div>
    );
  }
}