import React, { Component } from 'react'
import '../Style/WelcomeScreen.css'
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { Context as AppContext } from "../context/appContext";
// import $ from 'jquery'
import background_img from '../dnd_background.webp'

class WelcomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state={
            email: "",
            password: "",
            email_error: "",
            password_error: "",
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="d-flex justify-content-center" style={{ marginTop: '15px' }}>
                    <img alt="" style={{ width: '30%', border: '3px solid black', borderRadius: '50%' }} src={background_img} />
                </div>
                <div className="d-flex justify-content-center" style={{ marginTop: '15px', marginBottom: '150px'}}>
                    <div style={{ padding: "15px", border: "1px solid lightblue", borderRadius: '10px', width: '30%'}}>
                        <div>
                            <TextField helperText={this.state.email_error} error={(this.state.email_error !== "")} style={{width: '100%'}} id="email" type="email" label="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></TextField>
                        </div>
                        <div>
                            <TextField helperText={this.state.password_error} error={(this.state.password_error !== "")} style={{width: '100%'}} id="password" type="password" label="Password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}></TextField>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '15px'}}>
                            <div>
                                {(this.state.loading) ? <div className="d-flex justify-content-center" style={{ marginBottom: '7px'}}>
                                    <CircularProgress />
                                </div> : null}
                                <div className="d-flex justify-content-center">
                                    <Button style={{width: '100%'}} variant="contained" onClick={() => this.loginUser()}>Login</Button>
                                </div>
                                <div className="d-flex justify-content-center" style={{ marginTop: '7px'}}>
                                    <Button style={{width: '100%'}} variant="contained" color="primary" onClick={() => this.changePage('/register')}>Register</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    loginUser = async () => {
        var valid = true;
        if (!this.state.email) {
            this.setState({ email_error: "Please provide an email"})
            valid = false;
        } else {
            this.setState({ email_error: ""})
        }
        if (!this.state.password) {
            this.setState({ password_error: "Please provide a password"})
            valid = false;
        } else {
            this.setState({ password_error: ""})
        }
        if (!valid) {
            return;
        }
        this.setState({ loading: true })
        var email = this.state.email;
        var password = this.state.password;
        await this.context.loginUser(email, password);
        if (this.context.state.login_err_msg.status === 404) {
            this.setState({ email_error: this.context.state.login_err_msg.message})
            this.setState({ loading: false })
            return
        } else if (this.context.state.login_err_msg.status === 400) {
            this.setState({ password_error: this.context.state.login_err_msg.message})
            this.setState({ loading: false })
            return
        }
        var login_user = this.context.state.user;
        this.setState({ loading: false })
        this.props.history.push({
            pathname: '/home',
            state: {
                first_name: login_user.first_name,
                last_name: login_user.last_name,
                email: login_user.email,
                user_id: login_user.id
            }
        })
    }

    changePage = (page) => {
        this.props.history.push(page)
    }
}
WelcomeScreen.contextType = AppContext;

export default WelcomeScreen