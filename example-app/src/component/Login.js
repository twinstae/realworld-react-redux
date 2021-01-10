import { connect } from 'react-redux';
import agent from '../agent';
import { LOGIN, LOGIN_PAGE_UNLOADED } from '../constants/actionTypes';
import Form from './Form'

const mapStateToProps = state => ({ ...state.auth });
const mapDispachToProps = dispacth => ({
    onSubmit: ({email, password}) =>
        dispacth({
            type: LOGIN,
            payload: agent.Auth.login(email, password)
        }
    ),
    onUnload: () => {
        dispacth({ type: LOGIN_PAGE_UNLOADED })
    },
});

class Login extends Form {
    template = {
        email: 'email',
        password: 'password'
    };
    submitMessage = "Sign In";
}

export default connect(mapStateToProps, mapDispachToProps)(Login);