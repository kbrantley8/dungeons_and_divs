import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, Typography, CircularProgress } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
import userStorage from "../Backend/localStorage/userStorage";
// import $ from 'jquery'

class UserProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state={
            user: {},
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
                    <div style={{ padding: "15px", border: "1px solid lightblue", borderRadius: '10px', width: '80%'}}>
                        <div>
                            <Typography variant="h3" align="center">
                                First Name: {this.state.user.first_name} 
                            </Typography>
                            <Typography variant="h3" align="center">
                                Last Name: {this.state.user.last_name}
                            </Typography>
                            <Typography variant="h3" align="center">
                                Email: {this.state.user.email} 
                            </Typography>
                            <Typography variant="h3" align="center">
                                Bio: {this.state.user.bio}
                            </Typography>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                {(this.state.loading) ? <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                                    <CircularProgress />
                                </div> : null}
                                <div className="d-flex justify-content-center">
                                    <Button style={{width: '100%'}} variant="contained" onClick={() => this.props.history.push({pathname: '/editProfile', state: { first_name: this.state.user.first_name, last_name: this.state.user.last_name, email: this.state.user.email, id: this.state.user.id}})}>Edit Profile</Button>
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

    changePage = (page) => {
        this.props.history.push(page)
    }
}
UserProfileScreen.contextType = AppContext;

export default UserProfileScreen