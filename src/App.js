import React, { Component } from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
import shrineActive from './images/icons/shrine-active.svg';
import * as firebase from 'firebase';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import AddMapForm from './AddMapForm';
import UserMapList from './UserMapList'
import UserMap from './UserMap'
import {getCurrentUser, getUserMaps, deleteMap, saveMap} from './api/api';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userMaps: [],
      currentUser: undefined,
      addingMap: false,
      editingMap: false,
      mapInputValue: '',
      selectedMap: null
    }

    this.saveMap = this.saveMap.bind(this);
    this.openAddMapModal = this.openAddMapModal.bind(this);
    this.openEditMapModal = this.openEditMapModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleMapNameInput = this.handleMapNameInput.bind(this);
    this.handleMapShow = this.handleMapShow.bind(this);
    this.handleMapClose = this.handleMapClose.bind(this);
  }

  componentDidMount() {
    getCurrentUser().then((user) => {
      getUserMaps(user.uid).then((userMapsObject) => {
        const userMaps = Object.keys(userMapsObject).map((key) => Object.assign({}, userMapsObject[key], { id: key }));
        this.setState({
          currentUser: user,
          userMaps: userMaps
        });
      });
    });
  }

  handleMapShow(selectedMap) {
    this.setState({
      selectedMap: selectedMap
    });
  }

  handleMapClose() {
    this.setState({
      selectedMap: null
    });
  }

  openAddMapModal() {
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

  saveMap(title, id) {
    var newMap = {
      title: title,
      author: this.state.currentUser.uid
    }

    saveMap(newMap, id);

    this.setState({
      mapInputValue: ''
    });

    this.closeModal();
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
    deleteMap(mapId);
    this.closeModal();
  }

  render() {
    var content = ''

    if(!this.state.selectedMap) {
      content = (
        <div>
          <p>You don't have any maps yet.</p>
          <RaisedButton onClick={this.openAddMapModal} label="Create a Map" primary={true} />
        </div>
      );
    }

    if(this.state.userMaps && !this.state.selectedMap){
      content = <UserMapList maps={this.state.userMaps} openAddMapModal={this.openAddMapModal} handleMapShow={this.handleMapShow} />  
    }

    var renderedMap = '';
    if(this.state.selectedMap) {
      renderedMap = (
        <div>
          <UserMap map={this.state.selectedMap} />
          <RaisedButton label="&laquo; Back" primary={true} onClick={this.handleMapClose} className="btn--back" />
        </div>
      );
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
        { renderedMap }
      </div>
    )
  }
}