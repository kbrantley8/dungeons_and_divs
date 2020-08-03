import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Button, Typography, CircularProgress, TextField } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import characterSheetService from "../Backend/services/characterSheetService"
import userStorage from "../Backend/localStorage/userStorage";
import CharacterSheetPreview from "../Components/CharacterSheetPreview"
import partyService from "../Backend/services/partyService"
import userService from "../Backend/services/userService"
import PartyMemberPreview from "../Components/PartyMemberPreview"
import ChatWidget from "../Components/ChatWidget"
import { Widget } from 'react-chat-widget';


// import $ from 'jquery'

class UserHomeScreen extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            user: userStorage.getUser(),
            loading: false,
            newParty: true,
            showPartyInput: false,
            party_name: "",
            party: {},
            party_error: ""
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        var sheets = await characterSheetService.getUsersCharacterSheetsById(this.state.user.id)
        if (this.state.user.party_id) {
            var party = await partyService.getPartyById(this.state.user.party_id)
            if (this.state.user.account_type === 1) {
                var party_members = await partyService.getPartyMembersById(this.state.user.party_id)
            }
        }
        if (party) {
            this.setState({ sheets: sheets, loading: false, party: party, party_members: party_members, newParty: false, showPartyInput: false })
        } else {
            this.setState({ sheets: sheets, loading: false, party: {}, party_members: party_members, newParty: true, showPartyInput: false})
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="d-flex justify-content-center" style={{ marginTop: '150px'}}>
                    <div style={{ padding: "15px", border: "1px solid lightblue", borderRadius: '10px', width: '80%'}}>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                <div className="d-flex justify-content-center">
                                    <Button style={{width: '100%'}} variant="contained" onClick={() => this.changePage('/profilePage')}>Profile Page</Button>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                    <Button style={{width: '100%'}} variant="contained" onClick={() => this.changePage('/createCharacterSheet')}>New Character Sheet</Button>
                                </div>
                            </div>
                        </div>
                        {(this.state.loading) ? <div className="d-flex justify-content-center" style={{ marginTop: '15px', padding: '5px'}}>
                            <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                                <CircularProgress />
                            </div>
                        </div> : null}
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px', padding: '5px'}}>
                            {this.generatePreviewSheets()}
                        </div>
                        {((this.state.user.account_type === 1) && (this.state.newParty) && (!this.state.showPartyInput)) ? 
                            <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <Button style={{width: '100%'}} variant="contained" onClick={() => this.setState({ showPartyInput: true })}>Create Party</Button>
                                    </div>
                                </div>
                            </div> : null
                        }
                        {((this.state.user.account_type === 1) && (this.state.newParty) && (this.state.showPartyInput)) ? 
                            <div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                                    <TextField helperText={this.state.party_error} error={(this.state.party_error !== "")} style={{width: '50%'}} variant="outlined" id="party_name" type="text" label="Party Name" value={this.state.party_name} onChange={(e) => this.setState({ party_name: e.target.value })}></TextField>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                    <Button variant="contained" onClick={() => this.createParty()}>Create Party</Button>
                                </div>
                            </div>
                            : null
                        }
                        {((this.state.user.account_type === 1) && (this.state.user.party_id)) ? 
                            <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                                <div>    
                                    <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                        <Typography variant="h5" align="center" style={{ cursor: 'pointer', border: '1px solid lightblue', borderRadius: '5px', padding: '5px' }} onClick={() => this.handlePartyClick()}>
                                            Party Name: {this.state.party.name} 
                                        </Typography>
                                    </div>
                                    <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                        <Button style={{width: '100%'}} variant="contained" color="secondary" onClick={() => this.deleteParty()}>Delete Party</Button>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        {/* {((this.state.user.account_type === 1) && (this.state.party)) ? : null} */}

                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                    <Button style={{width: '100%'}} variant="contained" color="secondary" onClick={() => this.logout()}>Logout</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(this.state.party.id) ? <ChatWidget party={this.state.party} user={this.state.user}/> : null}
                
            </div>
        );
    }

    handlePartyClick = () => {
        this.props.history.push({ pathname: '/party', state: { party: this.state.party }})
    }

    createParty = async () => {
        this.setState({ loading: true })
        var name = this.state.party_name;
        var party = await partyService.createParty(name, this.state.user.id)
        var data = {
            party_id: party.id
        }
        if (party.status === 422) {
            this.setState({ loading: false, party_error: "Party of the same name already exists. Choose another one."})
            return;
        }
        var user = await userService.editUser(this.state.user.id, data)
        userStorage.storeUser(user)
        this.setState({ loading: false, newParty: false, showPartyInput: false, party: party, user: userStorage.getUser() })
    }

    deleteParty = async () => {
        this.setState({ loading: true })
        var party_members = await partyService.getPartyMembersById(this.state.party.id);
        party_members.forEach(async (val, ind) => {
            var data_user = {
                party_id: ""
            }
            var user_updated = await userService.editUser(val.id, data_user)
        })
        var party = await partyService.deletePartyById(this.state.party.id)
        var data = {
            party_id: ""
        }
        var user = await userService.editUser(this.state.user.id, data)
        userStorage.storeUser(user)
        this.setState({ loading: false, newParty: true, showPartyInput: false, party: {}, user: userStorage.getUser() })
    }

    generatePreviewSheets = () => {
        if (this.state.sheets) {
            if (this.state.sheets.length !== 0) {
                var sheets = this.state.sheets.map((val, ind) => {
                    return (
                        <CharacterSheetPreview key={val._id} sheet={val} history={this.props.history} />
                    )
                })
            }
        }
        return (sheets) ? sheets : <Typography align="center" color="error">You do not have any character sheets</Typography>
    }

    logout = () => {
        userStorage.removeUser()
        this.changePage('/')
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}
UserHomeScreen.contextType = AppContext;

export default UserHomeScreen