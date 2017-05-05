import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class EditMapForm extends Component {
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
    this.props.saveMap(
      this.props.mapInputValue,
      this.props.map.id
    );
  };

  handleDelete() {
    var confirmed = confirm("Are you sure?");
    if (confirmed) {
      this.props.deleteMap(this.props.map);
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
        label="Delete Map"
        secondary={true}
        onTouchTap={this.handleDelete}
        style={ {float: "left"} }
      />,
      <RaisedButton
        label="Update Map"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Edit Map"
          actions={actions}
          modal={false}
          open={this.props.isOpen}
          onRequestClose={this.handleClose}
        >
          <TextField
            floatingLabelText="Title"
            hintText="e.g. My solo map"
            onChange={this.props.handleMapNameInput}
            value={this.props.mapInputValue}
          />
        </Dialog>
      </div>
    )
  }
}