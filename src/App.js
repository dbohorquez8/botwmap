import React, { Component } from 'react';
import korokSeed from './images/icons/korok-seed.png';
import shrineActive from './images/icons/shrine-active.svg';
import shrineInactive from './images/icons/shrine-inactive.svg';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shrines: []
    }

    this.addMarker = this.addMarker.bind(this);
  }

  addMarker(event) {
    var newShrine = {
      name: 'Oman Au',
      position: event.latlng
    };

    var updatedShrines = [
      ...this.state.shrines,
      newShrine
    ];

    this.setState({shrines: updatedShrines});
  }

  render() {
    const center = [-128, 128];

    const iconSeed = L.icon({
      iconUrl: korokSeed,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const iconShrineActive = L.icon({
      iconUrl: shrineActive,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const iconShrineInactive = L.icon({
      iconUrl: shrineInactive,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    return (
      <Map 
        className="map-container" 
        crs={L.CRS.Simple}
        minZoom={2} 
        maxZoom={6} 
        center={center} 
        zoom={0}
        bounds={new L.LatLngBounds([0,256], [-256, 0])}
        onClick={this.addMarker}
      >
        <TileLayer
          url='https://firebasestorage.googleapis.com/v0/b/btowmap.appspot.com/o/{z}_{x}_{y}.png?alt=media&token=1003cab9-76b2-4d8c-99fc-6164b0e6ced0'
          attribution='Map data &copy; Nintendo'
        />
        {this.state.shrines.map((shrine, index) =>
          <Marker 
            position={shrine.position} 
            icon={iconShrineActive}
          >
            <Tooltip direction='top' offset={[0, -8]}>
              <span>{shrine.name}</span>
            </Tooltip>
          </Marker>
        )}
      </Map>
    );
  }
}
