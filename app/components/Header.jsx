import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ candidateName }) => (
  <div className="header">
    <p className="header__name">Welcome, {candidateName}</p>
  </div>
);

Header.propTypes = {
  candidateName: PropTypes.string.isRequired,
};

export default Header;
