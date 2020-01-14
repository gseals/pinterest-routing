import React from 'react';
import { Link } from 'react-router-dom';

import './SingleBoard.scss';
import boardData from '../../../helpers/data/boardData';
import pinData from '../../../helpers/data/pinData';
import Pin from '../../shared/Pin/Pin';

class SingleBoard extends React.Component {
state = {
  board: {},
  pins: [],
}

getPinData = (boardId) => {
  pinData.getPinsByBoardId(boardId)
    .then((pins) => this.setState({ pins }))
    .catch((err) => console.error('error in get pins', err));
}

componentDidMount() {
  const { boardId } = this.props.match.params; // gets anything from the url
  boardData.getSingleBoard(boardId)
    .then((response) => {
      this.setState({ board: response.data }); // set the state to the object of the board that comes back
      this.getPinData(boardId);
    })
    .catch((err) => console.error('error in get single board', err));
}

deletePin = (pinId) => {
  const { boardId } = this.props.match.params;
  pinData.deletePin(pinId)
    .then(() => this.getPinData(boardId))
    .catch((err) => console.error('error in get delete pin', err));
}

render() {
  const { board } = this.state;
  const { boardId } = this.props.match.params;
  return (
    <div className="SingleBoard">
      <h1>{board.name}</h1>
      <p>{board.description}</p>
      <Link className="btn btn-primary" to={`/board/${boardId}/pin/new`}>Add a pin</Link>
    <div className="pins d-flex flex-wrap">
      { this.state.pins.map((pin) => <Pin key={pin.id} pin={pin} deletePin={this.deletePin}/>)}
    </div>
    </div>
  );
}
}

export default SingleBoard;
