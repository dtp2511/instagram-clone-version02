import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Button } from '@material-ui/core';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';
import { linksConstants } from '../../common/constants';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions';
import { showToast } from '../../helpers/toast';
import Search from '../Search/Search';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const userId = useSelector(
    state => state.auth && state.auth.user && state.auth.user._id
  );
  const classes = useStyles();

  function _onHandleLogout() {
    dispatch(logout());
    showToast(`Logout Successfully !`, 'success');
  }

  function showLinks() {
    let pagesLinks = [];
    if (!isAuthenticated) {
      pagesLinks = linksConstants.pages.filter(link => link.public === true);
    } else {
      pagesLinks = linksConstants.pages.filter(link => link.public === false);
    }

    return pagesLinks.map((item, index) =>
      item.name === 'Sign Out' ? (
        <Link key={index} className={classes.link} to={item.linkTo}>
          <Button onClick={() => _onHandleLogout()} color='inherit'>
            {item.name}
          </Button>
        </Link>
      ) : (
        <Link
          key={index}
          className={classes.link}
          to={item.name === 'Profile' ? `/profile/${userId}` : item.linkTo}
        >
          <Button color='inherit'>{item.name}</Button>
        </Link>
      )
    );
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <InstagramIcon />
        &nbsp;
        <Typography variant='h6' className={classes.title}>
          <Link to='/' className={classes.link}>
            Instagram
          </Link>
        </Typography>
        {showLinks()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
