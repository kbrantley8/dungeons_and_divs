import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { Typography, MenuItem, TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import DividerText from "../Components/DividerText"

class MainAttributeComp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            scoreValue: this.props.scoreValue,
            modValue: this.props.modValue
        }

        this.scoreOnChange = this.props.scoreOnChange;
        this.modOnChange = this.props.modOnChange;

    }

    render() {
        return (
            <div>
                <DividerText lineClassName="col-md-4" textClassName="col-md-4" text={this.state.title} />
                <div className="row col-md-12" style={{ margin: '0' }}>
                    <div className="col-md-6">
                        <TextField style={{width: '100%'}} variant="outlined" id="strength_score" type="number" label={this.state.title} value={this.state.scoreValue} onChange={(e) => this.handleScoreChange(e)}></TextField>
                    </div>
                    <div className="col-md-6">
                        <FormControl variant="outlined" style={{width: '100%'}}>
                            <InputLabel>Modifier</InputLabel>
                            <Select
                            variant="outlined"
                            label="Modifier"
                            value={this.state.modValue}
                            onChange={(e) => this.handleModChange(e)}
                            >
                            <MenuItem value={-5}>-5</MenuItem>
                            <MenuItem value={-4}>-4</MenuItem>
                            <MenuItem value={-3}>-3</MenuItem>
                            <MenuItem value={-2}>-2</MenuItem>
                            <MenuItem value={-1}>-1</MenuItem>
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>+1</MenuItem> 
                            <MenuItem value={2}>+2</MenuItem>
                            <MenuItem value={3}>+3</MenuItem> 
                            <MenuItem value={4}>+4</MenuItem>                                                              
                            <MenuItem value={5}>+5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        )
    }

    handleScoreChange = (e) => {
        this.scoreOnChange(e);
        this.setState({ scoreValue: e.target.value })
    }

    handleModChange = (e) => {
        this.modOnChange(e);
        this.setState({ modValue: e.target.value })
    }
}

export default MainAttributeComp