import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            passw: "",
            errorText: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value, //? have questions
            errorText: ""
        })
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions", 
        {
            client: {
                email: this.state.email,
                password: this.state.passw
            }
        },
        { withCredentials: true } //send secure items like cookies etc
        
        ).then(response => {
            if (response.data.status === 'created') {
                console.log("You can come in...")
                this.props.handleSuccessfulAuth();
            } else {
                this.setState({
                    errorText: "Wrong email/password"
                });
                this.props.handleUnSuccessfulAuth();
            }
        }).catch(error => {
            this.setState({
                errorText: "An error occured"
            });
            this.props.handleUnSuccessfulAuth();
        });

        event.preventDefault();
    }
    render() {
        return (
            <div>
                <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
                <div>{this.state.errorText}</div>
                
                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope-open" />
                        <input type="email" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="lock" />
                        <input type="password" name="passw" placeholder="Your password" value={this.state.passw} onChange={this.handleChange}/>
                    </div>
                    
                    

                    
                    <button className="btn" type="submit">Login</button>
                </form>
            </div>
        )
    }
}