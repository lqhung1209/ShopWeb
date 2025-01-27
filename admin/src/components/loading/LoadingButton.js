import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingButton = () => {
  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faSpinner} transform='left-10' spin />
      Loading
    </React.Fragment>
  );
};

export default LoadingButton;
