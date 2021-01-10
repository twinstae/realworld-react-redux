import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { LOGIN, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';
import ListErrors from './ListErrors';
import Form from './Form'

const mapStateToProps = state => ({ ...state.auth });
const mapDispachToProps = dispacth => ({
    onSubmit: (email, password) =>
        dispacth({ type: LOGIN, payload: agent.Auth.login(email, password) }),
    onUnload: () => {
        dispacth({ type: LOGIN_PAGE_UNLOADED })
    },
});

class Login extends Form{
    constructor(){
        super()
        this.submitForm = (email, password) => ev => {
                ev.preventDefault();
                this.props.onSubmit(email, password);
            };
    }

    LoginForm () {
        const email = this.state.email;
        const password = this.state.password;

        return (    
            <form onSubmit={this.submitForm(email, password)}>
                <fieldset>
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
                        <h1 className="test-xs-center">Sign In</h1>
                        <Link to="/register" className="text-xs-center">
                            Need an account? Please Sign Up!
                        </Link>
                        {ListErrors(this.props.errors)}
                        {this.LoginForm()}
                    </div>
                )
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Login);