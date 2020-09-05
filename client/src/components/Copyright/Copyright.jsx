import React from 'react';

import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Copyright() {
  const style = {
    textDecoration: 'none',
  };

  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link style={style} color='inherit' to='/'>
        Instagram
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}
export default Copyright;
