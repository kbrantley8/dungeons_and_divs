import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography, Button } from '@material-ui/core';
import partyService from "../Backend/services/partyService"
import userService from "../Backend/services/userService"
import userStorage from "../Backend/localStorage/userStorage"

class ExistingParty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            party: this.props.party
        }

    }

    render() {
        return (
            <div className="col-md-12 row d-flex justify-content-center" style={{ margin: '25px 0' }}>
                <div style={{ border: '1px solid black', borderRadius: '10px', padding: '25px', width: '75%' }}>
                    <Typography align="center">Party Name: {this.state.party.name}</Typography>
                    <Typography align="center">Number of Members: {this.state.party.members.length}</Typography>
                    <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                        <Button style={{width: '50%'}} variant="contained" color="primary" onClick={() => this.updateMembers()}>Update Members</Button> 
                    </div>
                    <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                        <Button style={{width: '50%'}} variant="contained" color="secondary" onClick={() => this.deleteParty()}>Delete Party</Button> 
                    </div>
                </div>
            </div>
        )
    }

    updateMembers = async () => {
        this.props.history.push({ pathname: '/party', state: { party: this.state.party }})
    }

    deleteParty = async () => {
        var party_members = await partyService.getPartyMembersById(this.state.party.id);
        party_members.forEach(async (val, ind) => {
            delete val.party_id[this.state.party.id]
            var data_user = {
                party_id: val.party_id
            }
            var user = await userService.editUser(val.id, data_user);
        })
        var party = await partyService.deletePartyById(this.state.party.id)
        var new_party_id = this.state.user.party_id;
        delete new_party_id[this.state.party.id];
        var data_user = {
            party_id: new_party_id
        }
        var user = await userService.editUser(this.state.user.id, data_user);
        userStorage.storeUser(user);
        window.location.reload(false);
    }
}

export default ExistingParty