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
            id: this.props.history.location.state.id,
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
                            <TextField style={{width: '100%'}} required variant="outlined" id="first_name" type="text" label="First Name" value={this.state.first_name} onChange={(e) => this.setState({ first_name: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '7px'}}>
                            <TextField style={{width: '100%'}} required variant="outlined" id="last_name" type="text" label="Last Name" value={this.state.last_name} onChange={(e) => this.setState({ last_name: e.target.value })}></TextField>
                        </div>
                        <div style={{ marginTop: '7px'}}>
                            <TextField style={{width: '100%'}} required variant="outlined" id="email" type="email" label="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></TextField>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                {(this.state.loading) ? <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                                    <CircularProgress />
                                </div> : null}
                                <div className="d-flex justify-content-center">
                                    <Button style={{width: '100%'}} variant="contained" color="primary" onClick={() => this.editUser()}>Edit</Button>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px'}}>
                                    <Button style={{width: '100%'}} variant="contained" onClick={() => this.changePage('/profilePage')}>Back</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    editUser = async () => {
        this.setState({loading: true})
        var user = this.state.user;
        var updated_user = await user.editUser(this.state.first_name, this.state.last_name, this.state.email, user.password)
        userStorage.storeUser(updated_user)
        this.setState({loading: false})
        this.changePage('/profilePage')
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}
EditProfileScreen.contextType = AppContext;

export default EditProfileScreen