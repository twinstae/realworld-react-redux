import React from 'react';
import ListErrors from './ListErrors';
import agent from '../agent';
import {connect} from 'react-redux';
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

class Register extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);