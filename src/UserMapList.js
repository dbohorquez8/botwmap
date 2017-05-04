import React, { Component } from 'react';
import mapThumbnail from './images/map-thumbnail.png';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import UserMap from './UserMap';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class UserMapList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.maps.map((map, index) =>
          <div className="col s12 m4" key={index}>
            <Card 
              zDepth={1}
              style={{marginBottom: "25px"}}
            >
              <CardMedia
                overlay={<CardTitle title={map.title} subtitle="Collaborators" />}
              >
                <img src={mapThumbnail} alt="" />
              </CardMedia>
              <CardActions>
                <FlatButton label="Edit Map" />
                <RaisedButton label="View Map" primary={true} onClick={() => this.props.handleMapShow(map)} />
              </CardActions>
            </Card>
          </div>
        )}
        <div className="col s12 m4">
          <div
              style={{height: "294px", padding: "129px 0"}}
            >
            <RaisedButton onClick={this.props.openAddMapModal} label="Create a Map" primary={true} />
          </div>
        </div>
      </div>
    );
  }
}