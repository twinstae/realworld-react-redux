import agent from '../agent';
import {connect} from 'react-redux';
import Form from './Form';

import {
    REGISTER,
    REGISTER_PAGE_UNLOADED
  } from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onSubmit: ({username, email, password}) => {
        dispatch({
            type: REGISTER,
            payload : agent.Auth.register(username, email, password)
        })
    },
    onUnload: () =>
        dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends Form {
    template = {
        username:'text',
        email: 'email',
        password: 'password'
    };
    submitMessage = "Register";
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);