import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = (link, value) => (
    <li className="nav-item">
        <Link to={link} className="nav-link"> {value} </Link>
    </li>
);

const LoginView = (userName) => (
    <ul className="nav navbar-nav pull-xs-right">
        {NavItem('/', 'Home')}
        {NavItem(`/@${userName}`, userName)}
    </ul>
)

const LogoutView = (
    <ul className="nav navbar-nav pull-xs-right">
        {NavItem('/', 'Home')}
        {NavItem('/login', 'Sign in')}
        {NavItem('/register', 'Register')}
    </ul>
)

class Header extends React.Component {
    render () {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand"> {this.props.appName.toLowerCase()} </Link>
                { 
                    this.props.currentUser ?
                        LoginView(this.props.currentUser.username) :
                        LogoutView
                }
            </nav>
        );
    }
}

export default Header;