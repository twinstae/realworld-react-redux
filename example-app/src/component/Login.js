import React from 'react';
import { connect } from 'react-redux';

const Field = (type, placeholder)=>(
    <fieldset className="form-group">
        <input
            className="form-control form-control-lg"
            type={type}
            placeholder={placeholder} />
    </fieldset>
);

const SignInButton = (
    <button 
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit">
        Sign In
    </button>
);

const LoginForm = (
    <form>
        <fieldset>
            {Field('password', 'Password')}
            {Field('email', 'Email')}
            {SignInButton}
        </fieldset>
    </form>
);

class Login extends React.Component {
    render() {
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="test-xs-center">Sign In</h1>
                            <p className="text-xs-center"><a>Need an account?</a></p>
                        </div>
                        {LoginForm}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(()=>{})(Login);