import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography } from '@material-ui/core';

class SideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: this.props.width,
            color: this.props.color
        }


    }

    render() {
        const sideBarStyle = {
            width: this.state.width,
            position: 'fixed', 
            left: '0', 
            top: '0',
            height: '100vh', 
            backgroundColor: (this.state.color) ? (this.state.color) : '#F5F5F5'
        }
        return (
            <div style={sideBarStyle}></div>
        )
    }
}

export default SideBar