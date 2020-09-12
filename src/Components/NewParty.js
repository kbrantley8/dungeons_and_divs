import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { CircularProgress, TextField, Button } from '@material-ui/core';
import partyService from '../Backend/services/partyService'
import userService from '../Backend/services/userService'
import userStorage from '../Backend/localStorage/userStorage'

class NewParty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            party_name: "",
            user: this.props.user,
            loading: false
        }

        this.updateUserAndParties = this.props.callback


    }

    render() {
        if (this.state.loading) {
            return  <div className="d-flex justify-content-center" style={{ marginTop: '25px'}}>
                        <CircularProgress />
                    </div> 
        }
        return (
            <div>
                <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                    <TextField style={{width: '80%'}} variant="outlined" type="text" label="Party Name" value={this.state.party_name} onChange={(e) => this.setState({ party_name: e.target.value})}></TextField>
                </div>
                <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                    <Button variant="contained" color="secondary" onClick={() => this.createParty()}>Add New Party</Button>
                </div>
            </div>
        )
    }

    createParty = async () => {
        this.setState({ loading: true })
        var user = this.state.user;
        var name = this.state.party_name;
        var party = await partyService.createParty(name, this.state.user.id)
        user.party_id[party.id] = party.id;
        var data = {
            party_id: user.party_id
        }
        if (party.status === 422) {
            this.setState({ loading: false, party_error: "Party of the same name already exists. Choose another one."})
            return;
        }
        var user = await userService.editUser(this.state.user.id, data)
        userStorage.storeUser(user)
        this.updateUserAndParties()
        this.setState({ loading: false, party_name: "" })
        window.location.reload(false);
    }
}

export default NewParty