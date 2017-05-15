import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AddMapForm from './AddMapForm';
import EditMapForm from './EditMapForm';
import UserMapList from './UserMapList'
import {deleteMap, saveMap} from './api/api';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  handleMapShow(displayedMap) {
    this.setState({
      displayedMap: displayedMap
    });
  }

  handleMapClose() {
    this.setState({
      displayedMap: null
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
      author: this.props.currentUser.uid
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

  deleteMap(map) {
    deleteMap(map);
    this.closeModal();
  }

  render() {
    var content = ''

    content = (
      <div>
        <p>You don't have any maps yet.</p>
        <RaisedButton onClick={this.openAddMapModal} label="Create a Map" primary={true} />
      </div>
    );

    if(this.props.userMaps){
      content = <UserMapList
                  maps={this.props.userMaps}
                  openAddMapModal={this.openAddMapModal}
                  handleMapShow={this.handleMapShow}
                  handleMapEdit={this.openEditMapModal}
                />
    }

    return (
      <div>
        <div className="container center-align">{content}</div>
        <AddMapForm
          isOpen={this.state.addingMap}
          saveMap={this.saveMap}
          closeModal={this.closeModal}
          mapInputValue={this.state.mapInputValue}
          handleMapNameInput={this.handleMapNameInput}
        />
        <EditMapForm
          isOpen={this.state.editingMap}
          saveMap={this.saveMap}
          deleteMap={this.deleteMap}
          closeModal={this.closeModal}
          mapInputValue={this.state.mapInputValue}
          handleMapNameInput={this.handleMapNameInput}
          map={this.state.selectedMap}
        />
      </div>
    );
  }
}