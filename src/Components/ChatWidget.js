import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, Typography, CircularProgress, InputAdornment } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import characterSheetService from "../Backend/services/characterSheetService"
import userStorage from "../Backend/localStorage/userStorage";
import messageService from "../Backend/services/messageService"
import userService from "../Backend/services/userService"
import MessageChat from "../Components/Message"
import partyService from "../Backend/services/partyService"
import $ from 'jquery'

class ChatWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            party: this.props.party,
            open: false,
            message: '',
            messages: [],
            members: [],
            update: false,
            messagesToShow: []
        }
    }

    async componentDidMount() {
        this.secondUpdate();
        this.updateMessagesAndUsers();
        var temp_this = this;
        window.setTimeout(function() {
            temp_this.scrollToBottom()
        }, 1000)
    }

    updateMessagesAndUsers = async () => {
        var messages = await messageService.getPartyMessages(this.state.party.id)
        var party_members = await partyService.getPartyMembersById(this.state.party.id)
        console.log(messages)
        console.log(this.state.messagesToShow)
        if (messages.length !== this.state.messagesToShow.length) {
            this.scrollToBottom()
        }
        this.setState({ messages: messages, members: party_members })
        this.generateMessages()
    }

    scrollToBottom = () => {
        window.setTimeout(function() {
            var objDiv = document.getElementById("messages");
            objDiv.scrollTop = objDiv.scrollHeight;
        }, 500)
    }

    secondUpdate = async () => {
        var temp_this = this;
        // await temp_this.updateMessagesAndUsers()
        // temp_this.generateMessages()
        // this.interval = setInterval(async function() {
        //     await temp_this.updateMessagesAndUsers()
        //     temp_this.generateMessages()
        // }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div style={{ position: 'fixed', bottom: '0px', left: '0px', width: '100%', height: '400px', backgroundColor: 'lightgreen', cursor: 'pointer'}} onClick={() => this.handleOpenChatWindow()}>
                <div>    
                    <Typography style={{ marginTop: '7px', marginBottom: '7px' }} variant="h5" align="center">{this.state.party.name} Chat</Typography>
                </div>
                <div style={{ backgroundColor: 'lightgreen' }}>
                    <div style={{ overflowY: "scroll", height: '290px'}} id="messages">
                        {this.state.messagesToShow}
                    </div>
                    <div style={{ padding: '15px', position: 'absolute', width: '100%', bottom: '0', paddingRight: '7px' }}>
                        <TextField onKeyPress={(e) => this.handleEnterPress(e)} style={{width: '100%'}} id="message" type="text" label="Message" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })}></TextField>
                    </div>
                </div>
            </div>
        );
    }

    handleEnterPress = (event) => {
            var code = event.keyCode || event.which;
            if(code === 13) {
                this.handleSendingMessage()
            }
    }

    generateMessages = () => {
        var messages = this.state.messages.map((val, ind) => {
            if (val.user_id === this.state.user.id) {
                return (
                    <MessageChat key={val.id} text={val.text} sender_first_name={this.state.user.first_name} sender_last_name={this.state.user.last_name} date_created={val.date_created} messageType={0}/>
                )
            } else {
                return (
                    <MessageChat key={val.id} text={val.text} sender_first_name={val.sender_first_name} sender_last_name={val.sender_last_name} date_created={val.date_created} messageType={1}/>
                )
            }
        })
        this.setState({ messagesToShow: messages })
    }

    handleSendingMessage = async () => {
        // var objDiv = document.getElementById("messages");
        // objDiv.scrollTop = objDiv.scrollHeight;
        var msg = this.state.message;
        var new_msg = await messageService.createMessage(msg, this.state.user.id, this.state.party.id, new Date())
        var messages = await messageService.getPartyMessages(this.state.party.id)
        await this.updateMessagesAndUsers()
        this.setState({ messages: messages, message: "" })
        var objDiv = document.getElementById("messages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    handleOpenChatWindow = () => {
        this.setState({ open: true })
    }
}

export default ChatWidget