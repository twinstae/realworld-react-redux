import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants/actionTypes';

const NavItem = (link, value) => (
    <li className="nav-item">
        <Link to={link} className="nav-link"> {value} </Link>
    </li>
);

const LoginView = (userName, onClickLogout) => (
    <ul className="nav navbar-nav pull-xs-right">
        {NavItem('/', 'Home')}
        {NavItem(`/@${userName}`, userName)}
        {<li className="nav-item">
            <button
                className="btn btn-outline-danger"
                onClick={onClickLogout}>
                Logout
            </button>
        </li>}
    </ul>
)

const LogoutView = (
    <ul className="nav navbar-nav pull-xs-right">
        {NavItem('/', 'Home')}
        {NavItem('/login', 'Sign in')}
        {NavItem('/register', 'Register')}
    </ul>
)
const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser
});
  
const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT }),
});
  
class Header extends React.Component {
    render () {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand"> {this.props.appName.toLowerCase()} </Link>
                { 
                    this.props.currentUser ?
                        LoginView(
                            this.props.currentUser.username,
                            this.props.onClickLogout
                        ) :
                        LogoutView
                }
            </nav>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);