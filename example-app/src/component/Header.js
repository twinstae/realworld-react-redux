import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants/actionTypes';

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser
});
  
const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT }),
});
  
function Header({appName, currentUser, onClickLogout}){
    return (
        <nav className="navbar navbar-light">
            <Link to="/" className="navbar-brand"> {appName.toLowerCase()} </Link>
            { 
                currentUser ?
                    LoginView(
                        currentUser.username,
                        onClickLogout
                    ) :
                    LogoutView
            }
        </nav>
    );
}

const LoginView = (userName, onClickLogout) => (
    <ul className="nav navbar-nav pull-xs-right">
        {NavItem('/', 'Home')}
        {NavItem(`/@${userName}`, userName)}
        {NavItem('/editor', 'Write')}
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

function NavItem(link, value){
    return (
        <li className="nav-item">
            <Link to={link} className="nav-link"> {value} </Link>
        </li>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
export { NavItem, LoginView, LogoutView }