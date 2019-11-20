import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


class Square extends Component {
    constructor(props) {
        super(props)
    }

    handleChange = (event) => {
       
        const { value } = event.target
       
        if (!isNaN(value)) {
            if(Number(value) === 0) {
                this.props.setValue('');
            }
            else {
                this.props.setValue(Number(value));
            }
        }
        
    }
    handleFocus = (event) => {
        // console.log(event);
        this.props.selectSquare(this.props.xIndex, this.props.yIndex);
    }

    getClassName = () => {
       
        let className = 'square ' + this.props.decoration;
        if(this.props.highlighted) {
            className += ' highlighted';
        }
        if(this.props.border)
        {
            className += ' bordered';
        }
       
        return className;
    }

    render() {
        const type = this.props.type;

        return (
            type ?
            <input
                className = {this.getClassName()}
                onChange = {this.handleChange}
                onFocus = {this.handleFocus}
                value = {this.props.value} 
            /> : 
          
            <button
                className= {this.getClassName()}
                onChange = {this.handleChange}
                onFocus = {this.handleFocus}
               
            >{this.props.value}</button>
         
            
        );
    }
}

export default Square;