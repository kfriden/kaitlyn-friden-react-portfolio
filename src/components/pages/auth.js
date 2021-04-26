import React, { Component } from 'react';
import Login from "../auth/login"
import loginImage from "../../../static/assets/images/auth/login2.jpg";

export default class Auth extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth() { //updating props that we recieve
        this.props.handleSuccessfulLogin(); //instead of passing a string through props we pass a function this time
        this.props.history.push("/");
    }

    handleUnSuccessfulAuth() { 
        this.props.handleUnSuccessfulLogin(); 
    }
    render() {
        return (
            <div className="auth-page-wrapper">
                <div className="left-column" 
                    style={{
                        backgroundImage: `url(${loginImage})`
                    }}
                />

                
                <div className="right-column">
                    <Login
                        handleSuccessfulAuth={this.handleSuccessfulAuth}
                        handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
                    />
                </div>
            </div>
        )
    }
}    