import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import characterSheetService from "../Backend/services/characterSheetService"
import userStorage from "../Backend/localStorage/userStorage";
// import $ from 'jquery'

class PartyMemberPreview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            member: this.props.member,
        }
    }

    render() {
        return (
            <div className="col-md-4 " style={{ border: '1px solid lightblue', borderRadius: '7px', margin: '0px 8px', cursor: 'pointer' }}>
                <div>
                    <Typography align="center">
                        First Name: {this.state.member.first_name} 
                    </Typography>
                </div>
                <div>
                    <Typography align="center">
                       Last Name: {this.state.member.last_name} 
                    </Typography>
                </div>
                <div>
                    <Typography align="center">
                       Email: {this.state.member.email}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default PartyMemberPreview