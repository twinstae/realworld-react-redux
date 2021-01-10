import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { LOGIN, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';
import ListErrors from './ListErrors';

const SignInButton = (
    <button 
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit">
        Sign In
    </button>
);

const mapStateToProps = state => ({ ...state.auth });
const mapDispachToProps = dispacth => ({
    onSubmit: (email, password) =>
        dispacth({ type: LOGIN, payload: agent.Auth.login(email, password) }),
    onUnload: () => {
        dispacth({ type: LOGIN_PAGE_UNLOADED })
    },
});

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        };

        this.changeInput = this.handleInputChange.bind(this);
        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
        };
    }

    handleInputChange(ev){
        const target = ev.target;
        const name = target.name;

        this.setState(state => {
            const newState = {
                ...state,
                [name] : target.value
            }
            return newState
        });
    }

    componentWillUnmount(){ this.props.onUnload(); }

    Field (type, value){
        return (
            <fieldset className="form-group">
                <input
                    className="form-control form-control-lg"
                    type={type}
                    placeholder={type}
                    name={type}
                    value={value}
                    onChange={this.changeInput} />
            </fieldset>
        );
    }

    LoginForm () {
        const email = this.state.email;
        const password = this.state.password;

        return (    
            <form onSubmit={this.submitForm(email, password)}>
                <fieldset>
                    {this.Field('email', email)}
                    {this.Field('password', password)}
                    {SignInButton}
                </fieldset>
            </form>
        )
    }

    

    render() {
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="test-xs-center">Sign In</h1>
                            <Link to="/register" className="text-xs-center">Need an account?</Link>
                            {ListErrors(this.props.errors)}
                            {this.LoginForm()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Login);