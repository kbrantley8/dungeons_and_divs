import React, { Component } from 'react'
import { TextField, Button, FormControl, Select, InputLabel, MenuItem, CircularProgress } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
// import $ from 'jquery'

class RegisterScreen extends Component {

    constructor(props) {
        super(props);

        this.state={
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            account_type: 0,
            first_name_error: "",
            last_name_error: "",
            email_error: "",
            password_error: "",
            loading: false
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="d-flex justify-content-center" style={{ marginTop: '150px'}}>
                    <div style={{ padding: "15px", border: "1px solid lightblue", borderRadius: '10px', width: "50%"}}>
                        <div>
                            <TextField style={{width: '100%'}} required variant="outlined" id="first_name" type="text" label="First Name" value={this.state.first_name} onChange={(e) => this.setState({ first_name: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '7px'}}>
                            <TextField style={{width: '100%'}} required variant="outlined" id="last_name" type="text" label="Last Name" value={this.state.last_name} onChange={(e) => this.setState({ last_name: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '7px'}}>
                            <TextField style={{width: '100%'}} required variant="outlined" id="email" type="email" label="Email" helperText={this.state.email_error} error={(this.state.email_error !== '')} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '7px'}}>
                            <TextField style={{width: '100%'}} required variant="outlined" id="password" type="password" label="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}></TextField>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '7px'}}>
                            <FormControl variant="filled" style={{width: '75%'}}>
                                <InputLabel id="account_type">Type</InputLabel>
                                <Select
                                value={this.state.account_type}
                                onChange={(e) => this.setState({ account_type: e.target.value })}
                                >
                                <MenuItem value={0}>Player</MenuItem>
                                <MenuItem value={1}>DM</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                {(this.state.loading) ? <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                                    <CircularProgress />
                                </div> : null}
                                <div className="d-flex justify-content-center">
                                    <Button style={{width: '100%'}} variant="contained" color="primary" onClick={() => this.registerUser()}>Register</Button>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px'}}>
                                    <Button style={{width: '100%'}} variant="contained" onClick={() => this.changePage('/')}>Back</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    registerUser = async () => {
        this.setState({ loading: true })
        var first_name = this.state.first_name;
        var last_name = this.state.last_name;
        var email = this.state.email;
        var password = this.state.password;
        var account_type = this.state.account_type;
        await this.context.registerUser(first_name, last_name, email, password, account_type)
        // console.log(this.context.state.register_error)
        if (this.context.state.registration_err_msg) {
            if (this.context.state.registration_err_msg.status === 422) {
                this.setState({ email_error: "Email already exists! Try a new one or try logging in!"})
                this.setState({ loading: false})
                return;
            }
        }
        this.changePage('/home')
        this.setState({ loading: false })
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}
RegisterScreen.contextType = AppContext;

export default RegisterScreen