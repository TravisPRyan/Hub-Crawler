import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

// Use Link (react-router-dom) instaed of <a> to keep original state intact
const Navbar = ({icon, title}) => {
    return (
        <nav className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li> 
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {
    title: 'Hub Crawler',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default Navbar
