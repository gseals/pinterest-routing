import React from 'react';
import pinShape from '../../../helpers/propz/pinShape';

import './Pin.scss';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;
    return (
      <div className="Pin col-3">
        <div className="card">
          <img src={pin.imageUrl} className="card-img-top" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
