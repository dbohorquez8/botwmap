import React, { Component } from 'react';
import korokSeed from './images/icons/korok-seed.png';
import shrineActive from './images/icons/shrine-active.svg';
import boss from './images/icons/boss.svg';
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import * as firebase from 'firebase';
import AddMarkerForm from './AddMarkerForm';
import EditMarkerForm from './EditMarkerForm';

export default class UserMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [-128, 128],
      zoom: 2,
      markers: [],
      addingMarker: false,
      editingMarker: false,
      positionClicked: [],
      markerInputValue: '',
      selectedMarker: ''
    }

    this.saveMarker = this.saveMarker.bind(this);
    this.openAddMarkerModal = this.openAddMarkerModal.bind(this);
    this.openEditMarkerModal = this.openEditMarkerModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleMarkerNameInput = this.handleMarkerNameInput.bind(this);
  }

  componentDidMount() {
    const markersRef = firebase.database().ref('/markers/' + this.props.map.id);
    markersRef.on('value', snapshot => {
      const markersObject = snapshot.val();
      if(markersObject){
        console.warn(markersObject)
        const markers = Object.keys(markersObject).map((key) => Object.assign({}, markersObject[key], { id: key }));
        this.setState({
          markers: markers
        })
      }
    });
  }

  openAddMarkerModal(event) {
    if(this.state.zoom === 6) {
      this.setState({
        addingMarker: true,
        editingMarker: false,
        positionClicked: event.latlng,
      });
    } else {
      this.setState({
        center: event.latlng,
        zoom: 6
      });
    }
  }

  closeModal() {
    this.setState({
      addingMarker: false,
      editingMarker: false
    });
  }

  handleMarkerNameInput(event) {
    this.setState({
      markerInputValue: event.target.value
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
      var newMarkerId = firebase.database().ref('/markers/' + this.props.map.id).push().key;
    }

    firebase.database().ref('markers/' + this.props.map.id + '/' + newMarkerId).set(newMarker);

    this.setState({
      markerInputValue: ''
    });

    this.closeModal();
  }

  openEditMarkerModal(marker) {
    this.setState({
      editingMarker: true,
      addingMarker: false,
      markerInputValue: marker.name,
      selectedMarker: marker
    });
  }

  deleteMarker(markerId) {
    firebase.database().ref('markers/' + this.props.map.id + '/' + markerId).remove();
    this.closeModal();
  }

  render() {
    const icons = {
      korokSeed: L.icon({
        iconUrl: korokSeed,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      }),
      shrine: L.icon({
        iconUrl: shrineActive,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      }),
      boss: L.icon({
        iconUrl: boss,
        iconSize: [12, 12],
        iconAnchor: [8, 8]
      })
    };

    return (
      <div>
        <Map
          className="map-container"
          crs={L.CRS.Simple}
          minZoom={2}
          maxZoom={6}
          center={this.state.center}
          zoom={this.state.zoom}
          bounds={new L.LatLngBounds([0,256], [-256, 0])}
          onClick={this.openAddMarkerModal}
          onZoom={ (e) => {this.setState({zoom: e.target._zoom })} }
        >
          <TileLayer
            url='https://firebasestorage.googleapis.com/v0/b/btowmap.appspot.com/o/{z}_{x}_{y}.png?alt=media&token=1003cab9-76b2-4d8c-99fc-6164b0e6ced0'
            errorTileUrl='https://firebasestorage.googleapis.com/v0/b/btowmap.appspot.com/o/blank.png?alt=media&token=1003cab9-76b2-4d8c-99fc-6164b0e6ced0'
            attribution='Map data &copy; Nintendo'
          />
          {this.state.markers.map((marker, index) =>
            <Marker
              position={marker.position}
              icon={ icons[marker.type] }
              key={index}
              onClick={ () => this.openEditMarkerModal(marker) }
            >
              <Tooltip direction='top' offset={[0, -8]} opacity={marker.name !== '' ? 1 : 0}>
                <span>{marker.name}</span>
              </Tooltip>
            </Marker>
          )}
        </Map>
        <AddMarkerForm
          isOpen={this.state.addingMarker}
          saveMarker={this.saveMarker}
          closeModal={this.closeModal}
          positionClicked={this.state.positionClicked}
          markerInputValue={this.state.markerInputValue}
          handleMarkerNameInput={this.handleMarkerNameInput}
        />
        <EditMarkerForm
          isOpen={this.state.editingMarker}
          saveMarker={this.saveMarker}
          closeModal={this.closeModal}
          deleteMarker={this.deleteMarker}
          markerInputValue={this.state.markerInputValue}
          handleMarkerNameInput={this.handleMarkerNameInput}
          marker={this.state.selectedMarker}
        />
      </div>
    );
  }
}
