import React from 'react';
import agent from '../agent';
import {connect} from 'react-redux';
import ListErrors from './ListErrors';
import Form from './Form';
import { Link } from 'react-router-dom';

import {
    REGISTER,
    REGISTER_PAGE_UNLOADED
  } from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onSubmit: (username, email, password) => {
        const payload = agent.Auth.register(username, email, password);
        dispatch({ type: REGISTER, payload })
    },
    onUnload: () =>
        dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends Form{
    constructor(){
        super()
        this.submitForm = (email, password, username) => ev => {
                ev.preventDefault();
                this.props.onSubmit(email, password, username);
            };
    }

    RegisterForm () {
        const email = this.state.email;
        const password = this.state.password;
        const username = this.state.username;

        return (    
            <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>
                    {this.Field('username', username, 'text')}
                    {this.Field('email', email)}
                    {this.Field('password', password)}
                    {this.SubmitButton('Sign In')}
                </fieldset>
            </form>
        )
    }

    render (){
        return this.Frame(
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="test-xs-center">Sign Up</h1>
                        <Link to="/login" className="text-xs-center">Already have an account? Please Login!</Link>
                        {ListErrors(this.props.errors)}
                        {this.RegisterForm()}
                    </div>
                )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);