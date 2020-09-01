import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography, Modal, Fab, TextField, InputLabel, Select, MenuItem, FormControl, CircularProgress, Button } from '@material-ui/core';
import characterSheetService from '../Backend/services/characterSheetService';
import DividerText from "../Components/DividerText";
import MainAttributeComp from "../Components/MainAttributeComp"

class CharacterSheetEdit extends Component {

    constructor(props) {
        super(props);

        this.state={
            showDeleteModal: false,
            user_id: this.props.user_id,
            id: this.props.sheet._id,
            loading: false,
            name: this.props.sheet.name,
            race: this.props.sheet.race,
            class_1: {
                name: this.props.sheet.class_1.name,
                level: this.props.sheet.class_1.level
            },
            class_2: {
                name: (this.props.sheet.class_2) ? (this.props.sheet.class_2.name) : "",
                level: (this.props.sheet.class_2) ? (this.props.sheet.class_2.level) : "",
            },
            strength: {
                score: (this.props.sheet.strength) ? (this.props.sheet.strength.score) : "",
                modifier: (this.props.sheet.strength) ? (this.props.sheet.strength.modifier) : ''
            },
            dexterity: {
                score: (this.props.sheet.dexterity) ? (this.props.sheet.dexterity.score) : "",
                modifier: (this.props.sheet.dexterity) ? (this.props.sheet.dexterity.modifier) : ""
            },
            constitution: {
                score: (this.props.sheet.constitution) ? (this.props.sheet.constitution.score) : "",
                modifier: (this.props.sheet.constitution) ? (this.props.sheet.constitution.modifier) : ""
            },
            intelligence: {
                score: (this.props.sheet.intelligence) ? (this.props.sheet.intelligence.score) : "",
                modifier: (this.props.sheet.intelligence) ? (this.props.sheet.intelligence.modifier) : ""
            },
            wisdom: {
                score: (this.props.sheet.wisdom) ? (this.props.sheet.wisdom.score) : "",
                modifier: (this.props.sheet.wisdom) ? (this.props.sheet.wisdom.modifier) : ""
            },
            charisma: {
                score: (this.props.sheet.charisma) ? (this.props.sheet.charisma.score) : "",
                modifier: (this.props.sheet.charisma) ? (this.props.sheet.charisma.modifier) : ""
            },
            max_hit_points: (this.props.sheet.max_hit_points !== 'undefined') ? (this.props.sheet.max_hit_points) : "",
            curr_hit_points: (this.props.sheet.current_hit_points !== 'undefined') ? (this.props.sheet.current_hit_points) : "",
            speed: (this.props.sheet.speed !== 'undefined') ? (this.props.sheet.speed) : "",
            armor_rating: (this.props.sheet.armor_rating !== 'undefined') ? (this.props.sheet.armor_rating) : "",
            initiative: (this.props.sheet.initiative !== 'undefined') ? (this.props.sheet.initiative) : "",
            hit_dice: (this.props.sheet.hit_dice !== 'undefined') ? (this.props.sheet.hit_dice) : "",
        }

        this.reloadSheets = this.props.reloadSheets;

    }

    render() {
        if (this.state.loading) {
            return  <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                        <CircularProgress />
                    </div> 
        }
        return (
            <div className="row col-md-12">
                <div className="col-md-6">
                    <div>
                        <TextField style={{width: '100%'}} required variant="outlined" id="name" type="text" label="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}></TextField>
                    </div>
                    <div style={{ marginTop: '15px'}}>
                        <TextField style={{width: '100%'}} required variant="outlined" id="race" type="text" label="Race" value={this.state.race} onChange={(e) => this.setState({ race: e.target.value })}></TextField>
                    </div>
                    <div style={{ marginTop: '15px'}}>
                        <TextField style={{width: '50%'}} required variant="outlined" id="class_1" type="text" label="Class 1" value={this.state.class_1.name} onChange={(e) => this.setState({ class_1: { name: e.target.value, level: this.state.class_1.level }})}></TextField>
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
                    <div style={{ marginTop: '15px'}}>
                        <TextField style={{width: '100%'}} variant="outlined" id="class_2" type="text" label="Class 2" value={this.state.class_2.name} onChange={(e) => this.setState({ class_2: { name: e.target.value, level: this.state.class_2.level }})}></TextField>
                    </div>
                    <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                        <FormControl variant="filled" style={{width: '75%'}}>
                            <InputLabel id="account_type">Class 2 Level</InputLabel>
                            <Select
                            value={this.state.class_2.level}
                            onChange={(e) => this.setState({ class_2: { name: this.state.class_2.name, level: e.target.value }})}
                            >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <MainAttributeComp 
                        title="Strength"
                        scoreValue={this.state.strength.score}
                        modValue={this.state.strength.modifier}
                        scoreOnChange={(e) => this.setState({ strength: { score: e.target.value, modifier: this.state.strength.modifier }}, () => console.log(this.state))}
                        modOnChange={(e) => this.setState({ strength: { score: this.state.strength.score, modifier: e.target.value }})}
                    />
                    <MainAttributeComp 
                        title="Dexterity"
                        scoreValue={this.state.dexterity.score}
                        modValue={this.state.dexterity.modifier}
                        scoreOnChange={(e) => this.setState({ dexterity: { score: e.target.value, modifier: this.state.dexterity.modifier }}, () => console.log(this.state))}
                        modOnChange={(e) => this.setState({ dexterity: { score: this.state.dexterity.score, modifier: e.target.value }})}
                    />
                    <MainAttributeComp 
                        title="Constitution"
                        scoreValue={this.state.constitution.score}
                        modValue={this.state.constitution.modifier}
                        scoreOnChange={(e) => this.setState({ constitution: { score: e.target.value, modifier: this.state.constitution.modifier }}, () => console.log(this.state))}
                        modOnChange={(e) => this.setState({ constitution: { score: this.state.constitution.score, modifier: e.target.value }})}
                    />
                    <MainAttributeComp 
                        title="Intelligence"
                        scoreValue={this.state.intelligence.score}
                        modValue={this.state.intelligence.modifier}
                        scoreOnChange={(e) => this.setState({ intelligence: { score: e.target.value, modifier: this.state.intelligence.modifier }}, () => console.log(this.state))}
                        modOnChange={(e) => this.setState({ intelligence: { score: this.state.intelligence.score, modifier: e.target.value }})}
                    />
                    <MainAttributeComp 
                        title="Wisdom"
                        scoreValue={this.state.wisdom.score}
                        modValue={this.state.wisdom.modifier}
                        scoreOnChange={(e) => this.setState({ wisdom: { score: e.target.value, modifier: this.state.wisdom.modifier }}, () => console.log(this.state))}
                        modOnChange={(e) => this.setState({ wisdom: { score: this.state.wisdom.score, modifier: e.target.value }})}
                    />
                    <MainAttributeComp 
                        title="Charisma"
                        scoreValue={this.state.charisma.score}
                        modValue={this.state.charisma.modifier}
                        scoreOnChange={(e) => this.setState({ charisma: { score: e.target.value, modifier: this.state.charisma.modifier }}, () => console.log(this.state))}
                        modOnChange={(e) => this.setState({ charisma: { score: this.state.charisma.score, modifier: e.target.value }})}
                    />
                </div>
                <div className="col-md-6">
                    <div>
                        <DividerText lineClassName="col-md-4" textClassName="col-md-4" text="Hit Points" />
                        <div className="row col-md-12" style={{ margin: '0' }}>
                            <div className="col-md-6">
                                <TextField style={{width: '100%'}} variant="outlined" id="hitpoints" type="number" label="Max Hit Points" value={this.state.max_hit_points} onChange={(e) => this.setState({ max_hit_points: e.target.value})}></TextField>
                            </div>
                            <div className="col-md-6">
                                <TextField style={{width: '100%'}} variant="outlined" id="curr_hitpoints" type="number" label="Current Hit Points" value={this.state.curr_hit_points} onChange={(e) => this.setState({ curr_hit_points: e.target.value})}></TextField>
                            </div>
                        </div>
                    </div>
                    <div>
                        <DividerText lineClassName="col-md-3" textClassName="col-md-6" text="Dice Information" />
                        <div className="row col-md-12" style={{ margin: '0' }}>
                            <div className="col-md-6">
                                <TextField style={{width: '100%'}} variant="outlined" id="hitpoints" type="number" label="Armor Rating" value={this.state.armor_rating} onChange={(e) => this.setState({ armor_rating: e.target.value})}></TextField>
                            </div>
                            <div className="col-md-6">
                                <TextField style={{width: '100%'}} variant="outlined" id="curr_hitpoints" type="number" label="Speed" value={this.state.speed} onChange={(e) => this.setState({ speed: e.target.value})}></TextField>
                            </div>
                        </div>
                        <div className="row col-md-12" style={{ margin: '15px 0 0 0' }}>
                            <div className="col-md-6">
                                <TextField style={{width: '100%'}} variant="outlined" id="hitpoints" type="number" label="Initiative" value={this.state.initiative} onChange={(e) => this.setState({ initiative: e.target.value})}></TextField>
                            </div>
                            <div className="col-md-6">
                                <TextField style={{width: '100%'}} variant="outlined" id="curr_hitpoints" type="number" label="Hit Dice" value={this.state.hit_dice} onChange={(e) => this.setState({ hit_dice: e.target.value})}></TextField>
                            </div>
                        </div>
                    </div>
                </div>
                <Fab variant="extended" color="secondary" style={{ position: 'fixed', right: '8%', bottom: '100px', zIndex: '10' }} onClick={() => this.editCharacterSheet()}>
                    Update Character
                </Fab>
                <div className="col-md-12 d-flex justify-content-center" style={{ marginTop: '15px' }}>
                    <Button style={{width: '50%'}} variant="contained" color="secondary" onClick={() => this.toggleDeleteModal()}>Delete Character Sheet</Button>
                </div>
                <Modal
                    open={this.state.showDeleteModal}
                    style={{display:'flex',alignItems:'center',justifyContent:'center'}}
                >
                    <div style={{ backgroundColor: "#F5F5F5", padding: '25px', border: 'unset' }}>
                        <Typography>Are you sure you want to delete this character sheet?</Typography>
                        <div className="row col-md-12" style={{ margin: '15px 0 0 0' }}>
                            <div className="col-md-6">
                                <Button style={{width: '100%'}} variant="contained" color="secondary" onClick={() => this.toggleDeleteModal()}>Cancel</Button>
                            </div>
                            <div className="col-md-6">
                                <Button style={{width: '100%'}} variant="contained" color="secondary" onClick={() => this.deleteCharacterSheet()}>Yes, Delete It</Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    editCharacterSheet = async () => {
        this.setState({loading: true})
        var sheet_id = this.state.id;
        var data = {
            date_created: new Date(),
            name: this.state.name,
            race: this.state.race,
            class_1: this.state.class_1,
            class_2: this.state.class_2,
            strength: this.state.strength,
            dexterity: this.state.dexterity,
            constitution: this.state.constitution,
            intelligence: this.state.intelligence,
            wisdom: this.state.wisdom,
            charisma: this.state.charisma,
            max_hit_points: this.state.max_hit_points,
            current_hit_points: this.state.curr_hit_points,
            armor_rating: this.state.armor_rating,
            speed: this.state.speed,
            initiative: this.state.initiative,
            hit_dice: this.state.hit_dice,
        }
        var character_sheet = await characterSheetService.editCharacterSheet(
            sheet_id,
            data
        )
        this.reloadSheets(this.props.tab_index);
        this.setState({loading: false})
    }

    deleteCharacterSheet = async () => {
        this.setState({loading: true})
        var if_succ = await characterSheetService.deleteCharacterSheet(this.state.id);
        this.reloadSheets();
        this.setState({loading: false})
    }

    toggleDeleteModal = () => {
        this.setState({ showDeleteModal: !this.state.showDeleteModal })
    }
}

export default CharacterSheetEdit