import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import characterSheetService from "../Backend/services/characterSheetService"
import userStorage from "../Backend/localStorage/userStorage";
// import $ from 'jquery'

class CharacterSheetPreview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sheet: this.props.sheet,
        }
    }

    render() {
        return (
            <div className="col-md-4 " style={{ border: '1px solid lightblue', borderRadius: '7px', margin: '0px 8px', cursor: 'pointer' }} onClick={() => this.handleClick()}>
                <div>
                    <Typography align="center">
                        Name: {this.state.sheet.name} 
                    </Typography>
                </div>
                <div>
                    <Typography align="center">
                       Race: {this.state.sheet.race} 
                    </Typography>
                </div>
                <div>
                    <Typography align="center">
                       Class: {this.state.sheet.class_1.name} Level: {this.state.sheet.class_1.level}
                    </Typography>
                </div>
            </div>
        );
    }

    handleClick = () => {
        this.props.history.push({ pathname: '/editCharacterSheet', state: { sheet: this.state.sheet }})
    }
}

export default CharacterSheetPreview