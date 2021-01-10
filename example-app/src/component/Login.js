import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';

const Field = (type, placeholder, value, onChange)=>(
    <fieldset className="form-group">
        <input
            className="form-control form-control-lg"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange} />
    </fieldset>
);

const SignInButton = (
    <button 
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit">
        Sign In
    </button>
);

const Head = (
    <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="test-xs-center">Sign In</h1>
        <p className="text-xs-center"><a>Need an account?</a></p>
    </div>
)

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

        this.changeEmail = ev => this.setState(state => ({
            ...state,
            email : ev.target.value
        }));
        this.changePassword = ev => this.setState(state => ({
            ...state,
            password : ev.target.value
        }));
        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
        };
    }

    componentWillUnmount(){ this.props.onUnload(); }

    LoginForm () {
        const email = this.state.email;
        const password = this.state.password;

        return (
            <form onSubmit={this.submitForm(email, password)}>
            <fieldset>
                {Field('email', 'Email', email, this.changeEmail)}
                {Field('password', 'Password', password, this.changePassword)}
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
                        {Head}
                        {LoginForm()}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Login);