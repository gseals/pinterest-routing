import React from 'react';

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

render() {
  const { board } = this.state;
  return (
    <div className="SingleBoard">
      <h1>{board.name}</h1>
      <p>{board.description}</p>
    <div className="pins d-flex flex-wrap">
      { this.state.pins.map((pin) => <Pin key={pin.id} pin={pin}/>)}
    </div>
    </div>
  );
}
}

export default SingleBoard;
