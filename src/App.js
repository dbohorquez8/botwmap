import React, { Component } from 'react';
import korokSeed from './images/icons/korok-seed.png';
import shrineActive from './images/icons/shrine-active.svg';
import shrineInactive from './images/icons/shrine-inactive.svg';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import * as firebase from 'firebase';
import { camelCase } from 'lodash';
import AddMarkerForm from './AddMarkerForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [-128, 128],
      zoom: 2,
      markers: [],
      addingMarker: false,
      viewingMarker: false,
      positionClicked: [],
      markerInputValue: ''
    }

    this.addMarker = this.addMarker.bind(this);
    this.openAddMarkerModal = this.openAddMarkerModal.bind(this);
    this.closeAddMarkerModal = this.closeAddMarkerModal.bind(this);
    this.handleMarkerNameInput = this.handleMarkerNameInput.bind(this);
    this.openMarkerModal = this.openMarkerModal.bind(this);
  }

  componentDidMount() {
    const markersRef = firebase.database().ref();
    markersRef.on('value', snapshot => {
      const markersObject = snapshot.val().markers;
      const markers = Object.keys(markersObject).map((key) => Object.assign({}, markersObject[key], { id: key }));
      this.setState({
        markers: markers
      })
    });
  }

  openAddMarkerModal(event) {
    if(this.state.zoom === 6) {
      this.setState({
        addingMarker: true,
        positionClicked: event.latlng,
      });
    } else {
      this.setState({
        center: event.latlng,
        zoom: 6
      });
    }
  }

  closeAddMarkerModal() {
    this.setState({
      addingMarker: false
    });
  }

  handleMarkerNameInput(event) {
    this.setState({
      markerInputValue: event.target.value
    });
  }

  addMarker(type, position, name) {
    var newMarker = {
      type: type,
      name: name,
      position: position
    };

    var newMarkerId = firebase.database().ref().child('markers').push().key;

    firebase.database().ref('markers/' + newMarkerId).set(newMarker);

    this.setState({
      markerInputValue: ''
    });

    this.closeAddMarkerModal();
  }

  openMarkerModal(marker) {
    this.setState({
      viewingMarker: true
    });
    console.log(marker);
  }

  render() {
    const iconSeed = L.icon({
      iconUrl: korokSeed,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    const iconShrineActive = L.icon({
      iconUrl: shrineActive,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const iconShrineInactive = L.icon({
      iconUrl: shrineInactive,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

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
              icon={ marker.type === 'korokSeed' ? iconSeed : iconShrineActive }
              key={index}
              onClick={ () => this.openMarkerModal(marker.id) }
            >
              <Tooltip direction='top' offset={[0, -8]}>
                <span>{marker.name}</span>
              </Tooltip>
            </Marker>
          )}
        </Map>
        <AddMarkerForm
          isOpen={this.state.addingMarker}
          addMarker={this.addMarker}
          closeAddMarkerModal={this.closeAddMarkerModal}
          positionClicked={this.state.positionClicked}
          markerInputValue={this.state.markerInputValue}
          handleMarkerNameInput={this.handleMarkerNameInput}
        />
      </div>
    );
  }
}
