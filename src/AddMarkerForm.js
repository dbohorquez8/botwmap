import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class AddMarkerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.isOpen,
      markerType: 'korokSeed'
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.props.closeAddMarkerModal();
  };

  handleSubmit() {
    this.props.addMarker(
      this.state.markerType,
      this.props.positionClicked,
      this.props.markerInputValue
    );
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    const radioButtonStyles = {
      marginBottom: 16
    };

    return (
      <div>
        <Dialog
          title="Add New Marker"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.handleClose}
        >
          <RadioButtonGroup
            name="markerType"
            defaultSelected={this.state.markerType}
            onChange={ (e) => this.setState({ markerType: e.target.value }) }
          >
            <RadioButton
              value="korokSeed"
              label="Korok Seed"
              style={radioButtonStyles}
            />
            <RadioButton
              value="shrine"
              label="Shrine"
              style={radioButtonStyles}
            />
          </RadioButtonGroup>
          <TextField
            floatingLabelText="Label"
            onChange={this.props.handleMarkerNameInput}
            value={this.props.markerInputValue}
          />
        </Dialog>
      </div>
    )
  }
}