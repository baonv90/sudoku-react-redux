import React, { Component } from 'react';
import SquareContainer from '../containers/SquareContainer';
import {Button} from 'react-bootstrap';
import MenuContainer from '../containers/MenuContainer'
// import Menu from '../components/Menu';

class Board extends Component{
    
    

    generateBoard = () => {
       
        const board = [];
        for(let i = 0; i < 9; i++) {
            let row = [];
            for(let j = 0; j < 9; j++) {
                let _square = (
                    <SquareContainer key={'square'+i.toString()+j.toString()} border={(j+1)%3===0} type={this.props.windowSize > 450} xIndex={j} yIndex={i}/>
                );
                row.push(_square);
            }
            board.push(
                <div key={'row'+i.toString()} className= {(i+1)%3===0 ? "row-border": ""}>{row}</div>
            );    
        }
        return board;
    }

    // handleClick = (event) => {
    //     //console.log(event.target.innerHTML);
    // }

    render() {
       
        const className = this.props.windowSize > 450 ? "main_board web" : "main_board mobile";

        const board = this.generateBoard();
        return (
            <React.Fragment>
                <div className={className}>
                    {board}
                    <MenuContainer/>
                   
                </div>
                
                
            </React.Fragment>
           
        )
    }
}

export default Board;