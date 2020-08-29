import React, { Component } from 'react'
import { Button, Typography, CircularProgress, TextField, Divider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import characterSheetService from "../Backend/services/characterSheetService"
import userStorage from "../Backend/localStorage/userStorage";
import CharacterSheetPreview from "../Components/CharacterSheetPreview"
import partyService from "../Backend/services/partyService"
import userService from "../Backend/services/userService"
import NewCharacterSheetComp from "../Components/NewCharacterSheetComp"
import ChatWidget from "../Components/ChatWidget"
import UserPartyTab from "../Components/UserPartyTab"
import "../Style/Inside.css";
import CharacterSheetEdit from "../Components/CharacterSheetEdit"

// import $ from 'jquery'

class UserHomeScreen extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            user: userStorage.getUser(),
            loading: false,
            newParty: true,
            showPartyInput: false,
            parties_id_arr: [],
            parties: {},
            party_error: "",
            sheets: [],
            main_tab_index: 0,
            character_sheet_tab_index: 0
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        var new_user = await userService.getUserById(this.state.user.id);
        userStorage.storeUser(new_user)
        var sheets = await characterSheetService.getUsersCharacterSheetsById(this.state.user.id)
        var parties = {}
        var parties_id_arr = []
        if (this.state.user.party_id !== {}) {
            for (var party_id in this.state.user.party_id) {
                var party = await partyService.getPartyById(party_id)
                parties[party_id] = party
                parties_id_arr.push(party_id)
            }
        }
        if (parties !== {}) {
            this.setState({ user: userStorage.getUser(), sheets: sheets, loading: false, parties: parties, parties_id_arr: parties_id_arr })
        } else {
            this.setState({ user: userStorage.getUser(), sheets: sheets, loading: false, parties: {}, parties_id_arr: [] })
        }
    }

    render() {
        const character_sheets_style = {
            display: 'inline-block', 
            border: '1px solid black', 
            borderTopLeftRadius: '15px', 
            borderTopRightRadius: '15px', 
            borderBottom: (this.state.main_tab_index == 0) ? "1px solid white" : "1px solid black", 
            padding: '0 20px',
            cursor: 'pointer',
            marginLeft: '-1px',
        }
        const party_style = {
            display: 'inline-block', 
            border: '1px solid black', 
            borderTopLeftRadius: '15px', 
            borderTopRightRadius: '15px', 
            marginLeft: '-1px', 
            padding: '0 20px',
            borderBottom: (this.state.main_tab_index == 1) ? "1px solid white" : "1px solid black",
            cursor: 'pointer'
        }
        if (this.state.loading) {
            return  <div className="d-flex justify-content-center" style={{ marginTop: '50%'}}>
                        <CircularProgress />
                    </div> 
        }
        return (
            <div className="" style={{ padding: '100px 0 0 0' }}>
                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '5%', backgroundColor: 'black', zIndex: '1000' }}></div>
                <div className="row col-md-12" style={{ borderBottom: '1px solid black', width: '100vw', margin: '0', height: '43px' }}>
                    <div className="col-md-3"> 
                        <Typography 
                            variant="h4" 
                            align="center" 
                            style={{ borderRight: '1px solid black', position: 'relative', top: '1px' }}
                        >Profile</Typography>
                    </div>
                    <div className="col-md-9">
                        <div style={character_sheets_style} onClick={() => this.handleManTabClick(0)}>
                            <Typography
                                variant="h4"
                                style={{ }}
                            >Character Sheets</Typography>
                        </div>
                        <div style={party_style} onClick={() => this.handleManTabClick(1)}>
                            <Typography 
                                variant="h4"
                                style={{ }}
                            >Party</Typography>
                        </div>
                    </div>
                </div>
                <div className="row col-md-12">
                    <div className="col-md-3" style={{ height: '75vh', borderRight: '1px solid black', paddingRight: '0', wordWrap: 'break-word' }}>   
                        <Typography  
                            align="center"
                            style={{ fontSize: '24px', marginTop: '15px' }}
                        >{this.state.user.first_name} {this.state.user.last_name}</Typography>
                        <Typography  
                            align="center"
                            style={{ fontSize: '24px', marginTop: '7px' }}
                        >{this.state.user.email}</Typography>
                        <Typography  
                            align="center"
                            style={{ fontSize: '24px', marginTop: '7px' }}
                        >{(this.state.user.bio) ? (this.state.user.bio) : "No bio"}</Typography>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                            <Button style={{width: '80%'}} variant="contained" onClick={() => this.props.history.push({pathname: '/editProfile', state: { first_name: this.state.user.first_name, last_name: this.state.user.last_name, email: this.state.user.email, bio: this.state.user.bio, id: this.state.user.id}})}>Edit Profile</Button>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                            <Button style={{width: '80%'}} variant="contained" color="secondary" onClick={() => this.logout()}>Logout</Button>
                        </div>
                    </div>
                    <div id="viewing_window" className="col-md-9" style={{ marginTop: '15px' }}>
                        {(this.state.main_tab_index === 0) ? 
                        <div>
                            <div style={{ borderBottom: '1px solid black', height: '34px' }}>
                                {this.generateCharacterSheetTabs()}
                            </div>
                            <div style={{ marginTop: '25px', padding: "5px 25px 25px 25px", height: '65vh', overflowY: 'auto' }}>
                                {this.generateCharacterSheet()}
                            </div>
                        </div>
                        : null}
                        {(this.state.main_tab_index === 1) ? 
                            <div>
                                {(this.state.parties !== {}) ? 
                                    <div>
                                        {this.generateParties()}
                                    </div>
                                :
                                    <Typography color="error" align="center" style={{ marginTop: '15px' }}>You are not a member of a party</Typography>
                                }
                            </div>
                        : null}
                    </div>
                </div>

                {/* <div className="col-md-9" style={{ paddingLeft: '0'}}>
                    <div style={{ width: '100%', borderBottom: '1px solid black' }}> 
                        <div style={{ display: 'inline-block', marginLeft: '15px' }}>
                            <Typography 
                                variant="h4"
                                style={{}}
                            >Character Sheets</Typography>
                        </div>
                        <Typography 
                            variant="h4"
                            style={{ paddingLeft: '16px', display: 'inline-block' }}
                        >Party</Typography>
                    </div>
                </div> */}
                {/* <div className="d-flex justify-content-center">
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
                        } */}
                        {/* {((this.state.user.account_type === 1) && (this.state.party)) ? : null} */}

                        {/* <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px' }}>
                                    <Button style={{width: '100%'}} variant="contained" color="secondary" onClick={() => this.logout()}>Logout</Button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                {/* </div> */}
                {/* {(this.state.parties ) ? <ChatWidget party={this.state.party} user={this.state.user}/> : null} */}
                
            </div>
        );
    }

    reloadSheets = async (sheet_id = undefined) => {
        var new_tab_id = sheet_id;
        var new_sheets = await characterSheetService.getUsersCharacterSheetsById(this.state.user.id);
        if (sheet_id || (sheet_id === 0)) {
            var old_sheet = this.state.sheets[sheet_id];
            for (var ind in new_sheets) {
                var sheet = new_sheets[ind];        
                if (sheet._id === old_sheet._id) {
                    new_tab_id = parseInt(ind);
                }
            }
        } else {
            new_tab_id = 0;
        }
        this.setState({ sheets: new_sheets, character_sheet_tab_index: new_tab_id })
    }

    generateParties = () => {
        if (this.state.parties !== {} && this.state.parties_id_arr.length !== 0) {
            var parties = this.state.parties_id_arr.map((val, ind) => {
                return (
                    <UserPartyTab key={val} user={this.state.user} party={this.state.parties[val]} callback={this.updateUserAndParties}></UserPartyTab>
                )
            })
        }
        return parties
    }

    updateUserAndParties = async () => {
        var user = userStorage.getUser();
        var parties = {}
        var parties_id_arr = []
        if (user.party_id !== {}) {
            for (var party_id in this.state.user.party_id) {
                var party = await partyService.getPartyById(party_id)
                parties[party_id] = party
                parties_id_arr.push(party_id)
            }
        }
        if (parties !== {}) {
            this.setState({ user: user, parties: parties, parties_id_arr: parties_id_arr })
        } else {
            this.setState({ user: user, parties: {}, parties_id_arr: [] })
        }
    }

    generateCharacterSheet = () => {
        if (this.state.character_sheet_tab_index === this.state.sheets.length) {
            return <NewCharacterSheetComp user={this.state.user} reloadSheets={this.reloadSheets}/>

        } else if (this.state.sheets.length > 0) {
            var character_sheet = this.state.sheets[this.state.character_sheet_tab_index];
            return <CharacterSheetEdit tab_index={this.state.character_sheet_tab_index} reloadSheets={this.reloadSheets} user_id={this.state.user.id} key={character_sheet._id} sheet={character_sheet} />
        } else {
            return null;
        }
    }

    generateCharacterSheetTabs = () => {
        const character_sheets_tab_style = {
            display: 'inline-block', 
            border: '1px solid black', 
            borderTopLeftRadius: '15px', 
            borderTopRightRadius: '15px',
            padding: '0 20px',
            cursor: 'pointer',
            marginLeft: '-1px',
            borderBottom: 'unset',
            backgroundColor: 'lightgrey'
        }
        const selected_character_sheets_tab_style = {
            ...character_sheets_tab_style,
            borderBottom: '1px solid white',
            backgroundColor: 'white'
        }
        var tabs = this.state.sheets.map((val, ind) => {
            var style_sheet_tab = (ind === this.state.character_sheet_tab_index) ? selected_character_sheets_tab_style : character_sheets_tab_style;
            return (
                <div key={val._id} style={style_sheet_tab} onClick={() => this.handleCharacterSheetTabClick(ind)}>
                    <Typography
                        variant="h5"
                        style={{ }}
                    >{val.name}</Typography>
                </div>
            )
        })
        tabs.push(
            <div key={tabs.length - 1} style={(this.state.character_sheet_tab_index === this.state.sheets.length) ? selected_character_sheets_tab_style : character_sheets_tab_style} onClick={() => this.handleAddCharacterSheetClick(tabs.length - 1)}>
                <Typography
                    variant="h5"
                    style={{ }}
                >+</Typography>
            </div>
        )
        return tabs;
    }
    
    handleAddCharacterSheetClick = (ind) => {
        this.handleCharacterSheetTabClick(ind)
    }

    handleCharacterSheetTabClick = (index) => {
        this.setState({ character_sheet_tab_index: index })
    }

    handleManTabClick = (index) => {
        this.setState({ main_tab_index: index })
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