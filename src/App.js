import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
import shrineActive from './images/icons/shrine-active.svg';
import * as firebase from 'firebase';
import UserMapList from './UserMapList'
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMaps: [],
      currentUser: undefined,
      addingMap: false,
      editingMap: false,
      mapInputValue: false
    }

    this.saveMap = this.saveMap.bind(this);
    this.openAddMapModal = this.openAddMapModal.bind(this);
    this.openEditMapModal = this.openEditMapModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleMapNameInput = this.handleMapNameInput.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({currentUser: user})

      const userMapsRef = firebase.database().ref('users/' + this.state.currentUser.uid + '/maps');
      userMapsRef.on('value', snapshot => {
        const userMapsObject = snapshot.val();
        if(userMapsObject){
          const userMaps = Object.keys(userMapsObject).map((key) => Object.assign({}, userMapsObject[key], { id: key }));
          this.setState({
            userMaps: userMaps
          }) ;
        }
      });
    });
  }

  openAddMapModal(event) {
    this.setState({
      addingMap: true,
      editingMap: false
    });
  }

  closeModal() {
    this.setState({
      addingMap: false,
      editingMap: false
    });
  }

  handleMapNameInput(event) {
    this.setState({
      mapInputValue: event.target.value
    });
  }

  saveMarker(type, position, name, id) {
    var newMarker = {
      type: type,
      name: name,
      position: position
    };

    var newMarkerId = id;
    if(id === false) {
      var newMarkerId = firebase.database().ref().child('markers').push().key;
    }

    firebase.database().ref('markers/' + newMarkerId).set(newMarker);

    this.setState({
      markerInputValue: ''
    });

    this.closeModal();
  }

  saveMap(title, id) {
    var newMap = {
      title: title
    }

    var newMapId = id;

    if(id === false){
      newMapId = firebase.database().ref().child('maps').push().key;  
    }
    
    firebase.database().ref('maps/' + newMapId).set(newMap);
    firebase.database().ref('users/' + this.state.currentUser.uid + '/maps/' + newMapId).set(newMap);
  }

  openEditMapModal(map) {
    this.setState({
      editingMap: true,
      addingMap: false,
      mapInputValue: map.title,
      selectedMap: map
    });
  }

  deleteMap(mapId) {
    firebase.database().ref('maps/' + mapId).remove();
    this.closeModal();
  }

  render() {
    var content = (
      <div>
        <p>You don't have any maps yet.</p>
        <RaisedButton onClick={this.openAddMapModal} label="Create a Map" primary={true} />
      </div>
    );
    if(this.state.userMaps.length > 0){
      content = <UserMapList maps={this.state.userMaps} />  
    }
    
    return (
      <div>
        <AppBar
          style={{marginBottom: '40px'}}
          title={<span>Hyrule Map</span>}
          iconElementRight={<FlatButton label="Sign Out" />}
          showMenuIconButton={false}
        />
        <div className="container center-align">{content}</div>
        <AddMapForm
          isOpen={this.state.addingMap}
          saveMap={this.saveMap}
          closeModal={this.closeModal}
          mapInputValue={this.state.mapInputValue}
          handleMapNameInput={this.handleMapNameInput}
        />
      </div>
    )
  }
}