import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography, Button } from '@material-ui/core';
import userStorage from "../Backend/localStorage/userStorage"
import userService from "../Backend/services/userService"
import partyService from "../Backend/services/partyService"

class UserPartyTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            party: this.props.party
        }
        this.updatePartyAndUser = this.props.callback
    }

    render() {
        return (
            <div className="col-md-12 row d-flex justify-content-center" style={{ margin: '25px 0' }}>
                <div style={{ border: '1px solid black', borderRadius: '10px', padding: '25px', width: '75%' }}>
                    <Typography align="center">Party Name: {this.state.party.name}</Typography>
                    <Typography align="center">Number of Members: {this.state.party.members.length}</Typography>
                    <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                        <Button style={{width: '50%'}} variant="contained" color="secondary" onClick={() => this.leaveParty()}>Leave Party</Button> 
                    </div>
                </div>
            </div>
        )
    }

    leaveParty = async () => {
        var user = this.state.user;
        var data = [
            user.id
        ]
        delete user.party_id[this.state.party.id]
        var data_user = {
            party_id: user.party_id
        }
        var user = await userService.editUser(user.id, data_user)
        userStorage.storeUser(user);
        var party = await partyService.removeMember(this.state.party.id, data)
        this.updatePartyAndUser()
    }
}

export default UserPartyTab