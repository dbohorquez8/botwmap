import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class AddMarkerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.isOpen
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.props.closeAddMarkerModal();
  };

  handleSubmit() {
    this.props.addMarker(this.props.positionClicked, this.props.shrineInputValue);
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

    return (
      <div>
        <Dialog
          title="Add New Shrine"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Shrine Name"
            onChange={this.props.handleShrineNameInput}
            value={this.props.shrineInputValue}
          />
        </Dialog>
      </div>
    )
  }
}