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
import DividerText from '../Components/DividerText'


// import $ from 'jquery'

class PartyScreen extends Component {

    constructor(props) {
        super(props);
        this.state={
            user: userStorage.getUser(),
            party: this.props.history.location.state.party,
            party_members: [],
            member_email: "",
            member_email_error: "",
            loading: false,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        var party_members = await partyService.getPartyMembersById(this.state.party.id)
        this.setState({ party_members: party_members, loading: false })
    }

    render() {
        if (this.state.loading) {
            return  <div className="d-flex justify-content-center" style={{ marginTop: '50%'}}>
                        <CircularProgress />
                    </div> 
        }
        return (
            <div className="col-md-12">
                <div className="d-flex justify-content-center" style={{ marginTop: '150px'}}>
                    <div style={{ padding: "15px", border: "1px solid lightblue", borderRadius: '10px', width: '80%'}}>
                        <Typography variant="h6" align="center">
                            Party Name: {this.state.party.name}
                        </Typography>
                        <Typography align="left">
                            Members:
                        </Typography>
                        {(this.state.party_members.length !== 0) ? 
                        <div className="col-md-12 row">
                            {this.generateMembers()}
                        </div>
                             : null}
                        
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div style={{ width: '100%' }}>
                                <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                                    <TextField helperText={this.state.member_email_error} error={(this.state.member_email_error !== "")} style={{width: '60%'}} variant="outlined" id="member_email" type="text" label="Member Email" value={this.state.member_email} onChange={(e) => this.setState({ member_email: e.target.value })}></TextField>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                    <Button style={{width: '60%'}} variant="contained" color="primary" onClick={() => this.addMember()}>Add Member</Button>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                    <Button style={{width: '60%'}} variant="contained" color="secondary" onClick={() => this.removeMember()}>Remove Member</Button>
                                </div>
                                <div className="col-md-12" style={{ marginTop: '25px' }}>
                                    <DividerText lineClassName="col-md-5" textClassName="col-md-2" text="or" />
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '25px'}}>
                                    <Button style={{width: '60%'}} variant="contained" color="primary" onClick={() => this.changePage('/home-dm')}>Back</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    addMember = async () => {
        this.setState({ loading: true })
        var user = await userService.getUserByEmail(this.state.member_email);
        if (user.status === 404) {
            this.setState({ member_email_error: user.message, loading: false })
            return;
        } else {
            this.setState({ member_email_error: "" })
        }
        var data = [
            user.id
        ]
        var data_user = {
            party_id: this.state.party.id
        }
        var user = await userService.editUser(user.id, data_user)
        var party = await partyService.addMember(this.state.party.id, data)
        var party_members = await partyService.getPartyMembersById(this.state.party.id);
        this.setState({ party: party, loading: false, party_members: party_members, member_email: "" })
    }

    removeMember = async () => {
        this.setState({ loading: true })
        var user = await userService.getUserByEmail(this.state.member_email);
        if (user.status === 404) {
            this.setState({ member_email_error: user.message, loading: false })
            return;
        } else {
            this.setState({ member_email_error: "" })
        }
        var data = [
            user.id
        ]
        var data_user = {
            party_id: ""
        }
        var user = await userService.editUser(user.id, data_user)
        var party = await partyService.removeMember(this.state.party.id, data)
        var party_members = await partyService.getPartyMembersById(this.state.party.id);
        this.setState({ party: party, loading: false, party_members: party_members, member_email: "" })
    }

    generateMembers = () => {
        var party_members = this.state.party_members.map((val, ind) => {
            return (
                <PartyMemberPreview key={val.id} member={val} />
            )
        })
        
        return party_members
    }

    deleteParty = async () => {
        this.setState({ loading: true })
        var party = await partyService.deletePartyById(this.state.party.id)
        var data = {
            party_id: ""
        }
        var user = await userService.editUser(this.state.user.id, data)
        userStorage.storeUser(user)
        this.setState({ loading: false, newParty: true, showPartyInput: false, party: undefined, user: userStorage.getUser() })
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}
PartyScreen.contextType = AppContext;

export default PartyScreen