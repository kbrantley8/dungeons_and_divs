import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Switch, CircularProgress } from '@material-ui/core';
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
            party: this.props.parties[Object.keys(this.props.parties)[0]],
            parties: this.props.parties,
            open: false,
            message: '',
            messages: [],
            members: [],
            update: false,
            messagesToShow: [],
            allowSecondUpdate: false,
            loading: true
        }
    }

    async componentDidMount() {}

    updateMessagesAndUsers = async () => {
        var messages = await messageService.getPartyMessages(this.state.party.id)
        var party_members = await partyService.getPartyMembersById(this.state.party.id)
        this.setState({ messages: messages, members: party_members })
        this.generateMessages()
    }

    scrollToBottom = () => {
        if (this.state.open && document.getElementById("messages")) {
            window.setTimeout(function() {
                var objDiv = document.getElementById("messages");
                objDiv.scrollTop = objDiv.scrollHeight;
            }, 500)
        }
    }

    secondUpdate = async () => {
        if (this.state.allowSecondUpdate) {
            var temp_this = this;
            await temp_this.updateMessagesAndUsers()
            temp_this.generateMessages()
            this.interval = setInterval(async function() {
                await temp_this.updateMessagesAndUsers()
                temp_this.generateMessages()
            }, 1000)
        } else {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div style={{ position: 'fixed', bottom: '0px', left: '0px', width: '100%', maxHeight: '410px', backgroundColor: 'lightblue', cursor: 'pointer', zIndex: '100'}}>
                <div>    
                    <Typography style={{ marginTop: '7px', marginBottom: '7px' }} variant="h5" align="center" onClick={() => this.handleOpenChatWindow()}>Party Chat</Typography>
                    <div className="d-flex justify-content-end" style={{ position: 'absolute', top: '6px', right: '32px' }}>
                        <Typography style={{ display: 'flex', alignItems: 'center' }}>Live Status: </Typography>
                        <Switch
                            checked={this.state.allowSecondUpdate}
                            onChange={
                                () => this.setState({ allowSecondUpdate: !this.state.allowSecondUpdate }, function () {
                                    this.secondUpdate();
                                })
                            }
                            color="primary"
                            name="checkedB"
                        />
                    </div>
                    <div className="d-flex justify-content-start" style={{ position: 'absolute', top: '6px', left: '32px', width: '25%' }}>
                        <FormControl style={{ width: '100%' }}>
                            <Select
                            id="demo-simple-select-outlined"
                            value={this.state.party.name}
                            renderValue={() => this.renderValue(this.state.party.name)}
                            onChange={(e) => this.handleChangeParty(e)}
                            >
                                {
                                    Object.keys(this.props.parties).map((val, ind) => {
                                        return (
                                            <MenuItem key={val} value={val}>{this.props.parties[val].name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {(this.state.open) ? 
                    <div style={{ backgroundColor: 'lightblue', marginBottom: '69px' }}>
                        {(this.state.loading) ?
                            <div className="d-flex justify-content-center" style={{ height: '290px', }}>
                                <CircularProgress />
                            </div>
                            :
                            <div style={{ overflowY: "scroll", height: '290px', overflow: 'auto'}} id="messages">
                                {this.state.messagesToShow}
                            </div>
                        }
                        <div style={{ padding: '15px', position: 'absolute', width: '100%', bottom: '0', paddingRight: '7px' }}>
                            <TextField onKeyPress={(e) => this.handleEnterPress(e)} style={{width: '100%'}} id="message" type="text" label="Message" value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })}></TextField>
                        </div>
                    </div>
                : null }
            </div>
        );
    }

    handleChangeParty = async (e) => {
        var new_party = this.state.parties[e.target.value]
        this.setState({ party: new_party, loading: true }, async () => {
            await this.updateMessagesAndUsers()
        })
    }

    renderValue = (value) => {
        return value;
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
        if (messages.length === 0) {
            messages = <Typography color="error" align="center">There are no messages in this party chat</Typography>
        }
        this.setState({ messagesToShow: messages, loading: false }, () => {this.scrollToBottom()})
    }

    handleSendingMessage = async () => {
        // var objDiv = document.getElementById("messages");
        // objDiv.scrollTop = objDiv.scrollHeight;
        var msg = this.state.message;
        var new_msg = await messageService.createMessage(msg, this.state.user.id, this.state.party.id, new Date())
        await this.updateMessagesAndUsers()
        this.setState({ message: "" })
        this.scrollToBottom();
    }

    handleOpenChatWindow = () => {
        if (!this.state.open) {
            this.secondUpdate();
            this.updateMessagesAndUsers();
        }
        this.setState({ open: !this.state.open }, function() {
            if (this.state.open) {
                this.scrollToBottom();
            }
        })  
    }
}

export default ChatWidget