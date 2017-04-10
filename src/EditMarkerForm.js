import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class EditMarkerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.isOpen
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClose() {
    this.props.closeModal();
  };

  handleSubmit() {
    this.props.saveMarker(
      this.props.marker.type,
      this.props.marker.position,
      this.props.markerInputValue,
      this.props.marker.id
    );
  };

  handleDelete() {
    var confirmed = confirm("Are you sure?");
    if (confirmed) {
      this.props.deleteMarker(this.props.marker.id);
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete Marker"
        secondary={true}
        onTouchTap={this.handleDelete}
        style={ {float: "left"} }
      />,
      <RaisedButton
        label="Update Marker"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Edit Marker"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Description (optional)"
            hintText="e.g. Rock, Rock formation, Flower"
            onChange={this.props.handleMarkerNameInput}
            value={this.props.markerInputValue}
          />
        </Dialog>
      </div>
    )
  }
}