import React, { Component } from 'react';
import korokSeed from './images/icons/korok-seed.png';
import shrineActive from './images/icons/shrine-active.svg';
import shrineInactive from './images/icons/shrine-inactive.svg';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';
import AddMarkerForm from './AddMarkerForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [-128, 128],
      zoom: 2,
      shrines: [],
      addingMarker: false,
      positionClicked: [],
      markerInputValue: ''
    }

    this.addMarker = this.addMarker.bind(this);
    this.openAddMarkerModal = this.openAddMarkerModal.bind(this);
    this.closeAddMarkerModal = this.closeAddMarkerModal.bind(this);
    this.handleMarkerNameInput = this.handleMarkerNameInput.bind(this);
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
    var newShrine = {
      type: type,
      name: name,
      position: position
    };

    var updatedShrines = [
      ...this.state.shrines,
      newShrine
    ];

    this.setState({
      shrines: updatedShrines,
      markerInputValue: ''
    });

    this.closeAddMarkerModal();
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
          {this.state.shrines.map((shrine, index) =>
            <Marker 
              position={shrine.position} 
              icon={ shrine.type === 'korokSeed' ? iconSeed : iconShrineActive }
              key={index}
            >
              <Tooltip direction='top' offset={[0, -8]}>
                <span>{shrine.name}</span>
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
