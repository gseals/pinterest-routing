import React from 'react';

import pinData from '../../../helpers/data/pinData';
import authData from '../../../helpers/data/authData';

import './PinForm.scss';

class PinForm extends React.Component {
  state = {
    pinImage: '',
    pinTitle: '',
  }

  componentDidMount() {
    const { pinId } = this.props.match.params;
    if (pinId) {
      pinData.getSinglePin(pinId)
        .then((request) => {
          const pin = request.data;
          this.setState({ pinTitle: pin.title, pinImage: pin.imageUrl });
        })
        .catch((err) => console.error('error with get single pin', err));
    }
  }

  pinUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImage: e.target.value });
  }

  pinTitleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const newPin = {
      imageUrl: this.state.pinImage,
      title: this.state.pinTitle,
      uid: authData.getUid(),
      boardId,
    };
    pinData.savePin(newPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('error from save pin', err));
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { boardId, pinId } = this.props.match.params;
    const editPin = {
      imageUrl: this.state.pinImage,
      title: this.state.pinTitle,
      uid: authData.getUid(),
      boardId,
    };
    pinData.editPinData(pinId, editPin)
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((err) => console.error('error from save pin', err));
  }

  render() {
    const { pinImage, pinTitle } = this.state;
    const { pinId } = this.props.match.params;

    return (
      <form className="PinForm">
        <div className="form-group">
          <label htmlFor="pin-image">Pin Image</label>
          <input
          type="text"
          className="form-control"
          id="pin-image"
          placeholder="Enter pin image"
          value={pinImage}
          onChange={this.pinUrlChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin-title">Pin Title</label>
          <input
          type="text"
          className="form-control"
          id="pin-title"
          placeholder="Enter pin title"
          value={pinTitle}
          onChange={this.pinTitleChange}
          />
        </div>
        { pinId
          ? <button className="btn btn-secondary" onClick={this.editPinEvent}>Edit Pin</button>
          : <button className="btn btn-secondary" onClick={this.savePinEvent}>Save Pin</button>
        }
      </form>
    );
  }
}

export default PinForm;
