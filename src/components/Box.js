import React, { Component } from 'react';



class Box extends Component {
    generateBox = () => {
        const box = [];
        for(let i = 0; i < 2; i++) 
        {
            let box_row = (
                <div className="box-row">
                    <SquareContainer x={i + this.props.x} y={this.props.y} type={this.props.type}/>
                    <SquareContainer x={i + this.props.x} y={1 + this.props.y} type={this.props.type}/>
                    <SquareContainer x={i + this.props.x} y={2 + this.props.y} type={this.props.type}/>
                </div>
            );
            box.push(box_row);
        }
        
        return box;
    }
    
    render() {

        const box = this.generateBox();
        return (
            <div className="grid">
                {box}
            </div>
        );
    }
}

export default Box;