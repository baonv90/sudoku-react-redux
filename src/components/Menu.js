import React, {Component} from "react";
import {Button} from 'react-bootstrap';


class Menu extends Component{

handleClick = (event) => {
   
    this.props.setValue(Number(this.props.focus[0]), Number(this.props.focus[1]), Number(event.target.innerHTML));
}
    
generateMenu = () => {
    let menu = [];
    for(let i = 0; i < 9 ; i++)
    {
        menu.push(<Button key={"indicator" + i} variant="outline-primary" onClick={this.handleClick} className="m-1">{i+1}</Button>)
    }
    return menu;
}
render() {  
    const menu = this.generateMenu();
    return (
        <div className="indicators">
            {menu}
        </div>

        ); 
    }
}

export default Menu;
