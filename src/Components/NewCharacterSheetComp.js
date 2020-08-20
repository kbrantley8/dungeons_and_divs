import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography , CircularProgress, TextField, FormControl, MenuItem, InputLabel, Select, Button } from '@material-ui/core';
import characterSheetService from '../Backend/services/characterSheetService'

class NewCharacterSheetComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            name: "",
            race: "",
            class_1: {
                name: "",
                level: ""
            }
        }
        this.reloadSheets = this.props.reloadSheets;

    }

    render() {
        if (this.state.loading) {
            return (
                <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                    <CircularProgress />
                </div> 
            )
        }
        return (
            <div>
                <div>
                    <TextField style={{width: '100%'}} required variant="outlined" id="name" type="text" label="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></TextField>
                </div>
                <div style={{ marginTop: '15px'}}>
                    <TextField style={{width: '100%'}} required variant="outlined" id="race" type="text" label="Race" value={this.state.race} onChange={(e) => this.setState({ race: e.target.value })}></TextField>
                </div>
                <div style={{ marginTop: '15px'}}>
                    <TextField style={{width: '100%'}} required variant="outlined" id="class_1" type="text" label="Class 1" value={this.state.class_1.name} onChange={(e) => this.setState({ class_1: { name: e.target.value, level: this.state.class_1.level }})}></TextField>
                </div>
                <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                    <FormControl variant="filled" style={{width: '75%'}}>
                        <InputLabel id="account_type" required>Class 1 Level</InputLabel>
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
                <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                    <Button style={{width: '50%'}} variant="contained" color="secondary" onClick={() => this.addCharacterSheet()}>Add Character Sheet</Button>
                </div>
            </div>
        )
    }

    addCharacterSheet = async () => {
        this.setState({loading: true})
        var user = this.state.user;
        var character_sheet = await characterSheetService.createCharacterSheet(
            user.id,
            new Date(),
            this.state.name,
            this.state.race,
            this.state.class_1
        )
        this.setState({loading: false})
        this.reloadSheets(0);
    }
}

export default NewCharacterSheetComp