import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, Typography, CircularProgress, InputAdornment } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import characterSheetService from "../Backend/services/characterSheetService"
import userStorage from "../Backend/localStorage/userStorage";
import messageService from "../Backend/services/messageService"
// import $ from 'jquery'

class MessageChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            sender_first_name: this.props.sender_first_name,
            sender_last_name: this.props.sender_last_name,
            date_created: this.props.date_created,
            messageType: this.props.messageType
        }
    }

    render() {
        if (this.state.messageType === 0) {
            return (
                    <div style={{ marginTop: '10px', backgroundColor: 'blue', width: '70%', marginRight: '15px', float: 'right', color: 'white', padding: '7px', borderRadius: '10px' }}>
                        <Typography style={{ wordWrap: 'break-word' }}>{this.state.text}</Typography>
                        <Typography style={{ fontSize: '10px' }}>{this.state.sender_first_name} {this.state.sender_last_name} | {this.formatDate(this.state.date_created)}</Typography>
                    </div>
            );
        } else {
            return (
                <div style={{ marginTop: '10px', backgroundColor: 'white', width: '70%', marginLeft: '15px', float: 'left', color: 'black', padding: '7px', borderRadius: '10px' }}>
                        <Typography style={{ wordWrap: 'break-word' }}>{this.state.text}</Typography>
                        <Typography style={{ fontSize: '10px' }}>{this.state.sender_first_name} {this.state.sender_last_name} | {this.formatDate(this.state.date_created)}</Typography>
                    </div>
            );
        }
    }

    formatDate = (time) => {
        var data = new Date(time)
        var hours = data.getHours() % 12 || 12;
        var minutes = data.getMinutes();
        if (minutes < 10) {
        minutes = '0' + minutes;
        } else {
        minutes = minutes + '';
        }
        var time_stamp = (data.getHours() >= 12) ? 'PM' : 'AM';
        var month = data.toLocaleString('default', { month: 'long' })
        var day = data.getDate();
        var year = data.getFullYear();
        var str = hours + ":" + minutes + " " + time_stamp + " on " + month + " " + day + ", " + year;
        return str;
    }
}

export default MessageChat