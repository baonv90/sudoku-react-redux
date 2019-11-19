import React, {Component} from "react";
import {Button} from 'react-bootstrap';


class Buttons extends Component{

solvePuzzle = () => {
    this.props.solveBoard();
}
newGame = () => {
    this.props.newBoard();
}

resetBoard = () => {
    this.props.resetBoard();
}

render() {  
    return (
        <React.Fragment>
        <div className="buttons-group">
            <Button variant="success" className="m-1" onClick={this.solvePuzzle}>Solve Puzzle</Button>
            <Button variant="primary" className="m-1" onClick={this.newGame}>New Game</Button>
            <Button variant="light" className="m-1" onClick={this.resetBoard}>Reset</Button>
        </div>
        </React.Fragment>

        ); 
    }
}

export default Buttons;
