import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = (link, value) => (
    <li className="nav-item">
        <Link to={link} className="nav-link"> {value} </Link>
    </li>
);

class Header extends React.Component {
    render () {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand"> {this.props.appName.toLowerCase()} </Link>
                <ul className="nav navbar-nav pull-xs-right">    
                    {NavItem('/', 'Home')}
                    {NavItem('/login', 'Sign In')}
                </ul>
            </nav>
        );
    }
}

export default Header;