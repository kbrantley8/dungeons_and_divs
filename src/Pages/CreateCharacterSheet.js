import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import userStorage from "../Backend/localStorage/userStorage";
import characterSheetStorage from "../Backend/localStorage/characterSheetStorage"
import characterSheetService from "../Backend/services/characterSheetService"
import CharacterSheet from '../Backend/models/CharacterSheet';
// import $ from 'jquery'

class EditProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state={
            user: {},
            name: "",
            race: "",
            class_1: {
                name: "",
                level: 1
            },
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        var user = userStorage.getUser();
        this.setState({ user: user, loading: false })
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="d-flex justify-content-center" style={{ marginTop: '150px'}}>
                    <div style={{ padding: "15px", border: "1px solid lightblue", borderRadius: '10px', width: "50%"}}>
                        <div>
                            <TextField style={{width: '100%'}} required variant="outlined" id="name" type="text" label="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '7px'}}>
                            <TextField style={{width: '100%'}} required variant="outlined" id="race" type="text" label="Race" value={this.state.race} onChange={(e) => this.setState({ race: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '7px'}}>
                            <TextField style={{width: '100%'}} required variant="outlined" id="class_1" type="text" label="Class" value={this.state.class_1.name} onChange={(e) => this.setState({ class_1: { name: e.target.value, level: this.state.class_1.level }})}></TextField>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <FormControl variant="filled" style={{width: '75%'}}>
                                <InputLabel id="account_type">Level</InputLabel>
                                <Select
                                value={this.state.class_1.level}
                                onChange={(e) => this.setState({ class_1: { name: this.state.class_1.name, level: e.target.value }})}
                                >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                {(this.state.loading) ? <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                                    <CircularProgress />
                                </div> : null}
                                <div className="d-flex justify-content-center">
                                    <Button style={{width: '100%'}} variant="contained" onClick={() => this.createCharacter()}>Create New Character Sheet</Button>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px'}}>
                                    <Button style={{width: '100%'}} variant="contained" color="primary" onClick={() => this.changePage('/home')}>Back</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    createCharacter = async () => {
        this.setState({loading: true})
        var user = this.state.user;
        var character_sheet = await characterSheetService.createCharacterSheet(
            user.id,
            new Date(),
            this.state.name,
            this.state.race,
            this.state.class_1
        )
        var new_character_sheet = new CharacterSheet(
            character_sheet.id,
            character_sheet.user_id,
            character_sheet.date_created,
            character_sheet.name,
            character_sheet.race,
            character_sheet.class_1
        )
        this.setState({loading: false})
        this.changePage('/home')
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}
EditProfileScreen.contextType = AppContext;

export default EditProfileScreen