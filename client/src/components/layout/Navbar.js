import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LocationsContext from '../../context/locations/locationsContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const locationsContext = useContext(LocationsContext);

  const { isAuthenticated, logout } = authContext;
  const { clearErrors } = locationsContext;

  const onLogout = () => {
    logout();
    clearErrors();
  };

  const authLinks = (
    <Fragment>
        <div className="justify-content-end">
          <a onClick={onLogout} href="#!">
            <i className='fas fa-sign-out-alt' />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
        <div>
          <Link to='/register'>Register</Link>
        </div>
        <div>
          <Link to='login'>Login</Link>
        </div>
    </Fragment>
  );

  return (
    <div className="navbar bg-light">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <div>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Welcome, see your visits worldwide!',
  icon: 'fas fa-globe-americas'
};

export default Navbar;