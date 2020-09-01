import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, FormControl, Select, InputLabel, MenuItem, CircularProgress } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import userStorage from "../Backend/localStorage/userStorage";
// import $ from 'jquery'

class EditProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state={
            user: {},
            first_name: this.props.history.location.state.first_name,
            last_name: this.props.history.location.state.last_name,
            email: this.props.history.location.state.email,
            bio: (this.props.history.location.state.bio) ? this.props.history.location.state.bio : undefined,
            id: this.props.history.location.state.id,
            loading: false,
            first_name_error: "",
            last_name_error: "",
            email_error: ""
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
                            <TextField 
                                helperText={this.state.first_name_error} 
                                error={(this.state.first_name_error !== "")} 
                                style={{width: '100%'}} 
                                required 
                                variant="outlined" 
                                id="first_name" 
                                type="text" 
                                label="First Name" 
                                value={this.state.first_name} 
                                onChange={(e) => this.setState({ first_name: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '10px'}}>
                            <TextField 
                                helperText={this.state.last_name_error} 
                                error={(this.state.last_name_error !== "")} 
                                style={{width: '100%'}} 
                                required 
                                variant="outlined" 
                                id="last_name" 
                                type="text" 
                                label="Last Name" 
                                value={this.state.last_name} 
                                onChange={(e) => this.setState({ last_name: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '10px'}}>
                            <TextField 
                                helperText={this.state.email_error} 
                                error={(this.state.email_error !== "")} 
                                style={{width: '100%'}} 
                                required 
                                variant="outlined" 
                                id="email" 
                                type="email" 
                                label="Email" 
                                value={this.state.email} 
                                onChange={(e) => this.setState({ email: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '10px'}}>
                            <TextField style={{width: '100%'}} variant="outlined" multiline rows={5} label="Bio" value={this.state.bio} onChange={(e) => this.setState({ bio: e.target.value })}></TextField>
                        </div>
                        <div className="" style={{ marginTop: '15px'}}>
                            <div className="d-flex justify-content-center">
                                <Button style={{width: '50%'}} variant="contained" color="primary" onClick={() => this.editUser()}>Edit</Button>
                            </div>
                            <div className="d-flex justify-content-center" style={{ marginTop: '7px'}}>
                                <Button style={{width: '50%'}} variant="contained" onClick={() => this.handleBackButton()}>Back</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    checkInputsForValues = () => {
        var valid = true;
        if (!this.state.email) {
            this.setState({ email_error: "Please provide an email"})
            valid = false;
        } else {
            this.setState({ email_error: ""})
        }
        if (!this.state.first_name) {
            this.setState({ first_name_error: "Please provide a first name"})
            valid = false;
        } else {
            this.setState({ first_name_error: ""})
        }
        if (!this.state.last_name) {
            this.setState({ last_name_error: "Please provide a last name"})
            valid = false;
        } else {
            this.setState({ last_name_error: ""})
        }
        return valid
    }

    editUser = async () => {
        this.setState({loading: true})
        var user = this.state.user;
        if (this.checkInputsForValues()) {
            var updated_user = await user.editUser(this.state.first_name, this.state.last_name, this.state.email, user.password, user.account_type, user.party_id, this.state.bio)
            userStorage.storeUser(updated_user)
            this.setState({loading: false})
                    if (this.state.user.account_type === 0) {
                this.changePage('/home');
            } else if (this.state.user.account_type === 1) {
                this.changePage('/home-dm')
            }
        }
    }

    handleBackButton = () => {
        if (this.state.user.account_type === 0) {
            this.changePage('/home');
        } else if (this.state.user.account_type === 1) {
            this.changePage('/home-dm')
        }
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}
EditProfileScreen.contextType = AppContext;

export default EditProfileScreen