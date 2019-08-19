import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Preloader = () => (
  <div className="preloader">
    <FontAwesomeIcon icon={faSpinner} spin />
  </div>
);

export default Preloader;
