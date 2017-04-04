import React, { Component } from 'react';
import korokSeed from './images/icons/korok-seed.png';
import shrineActive from './images/icons/shrine-active.svg';
import shrineInactive from './images/icons/shrine-inactive.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet';

class App extends Component {
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
      <Map className="map-container" minZoom={2} maxZoom={6} center={center} zoom={2}>
        <TileLayer
          url='/images/map-tiles/{z}_{x}_{y}.png'
          attribution='Map data &copy; Nintendo'
        />
        <Marker position={[ -84, 84 ]} icon={iconShrineActive}>
          <Tooltip direction='top' offset={[0, -8]}>
            <span>Oman Au Shrine</span>
          </Tooltip>
        </Marker>
      </Map>
    );
  }
}

export default App;
