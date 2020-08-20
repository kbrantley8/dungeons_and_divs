import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography, Button } from '@material-ui/core';
import partyService from "../Backend/services/partyService"
import userService from "../Backend/services/userService"

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
                </div>
            </div>
        )
    }

    updateMembers = async () => {
        this.props.history.push({ pathname: '/party', state: { party: this.state.party }})
    }
}

export default ExistingParty