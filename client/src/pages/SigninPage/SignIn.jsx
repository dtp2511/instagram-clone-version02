import React, { useState, useEffect } from 'react';

import { Layout } from '../../hoc';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/actions';
import { useStyles } from './styles';
import { Copyright } from '../../components';
import { Link, useHistory, Redirect } from 'react-router-dom';
const SignIn = () => {
  const loading = useSelector(state => state.auth.loading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [form, setForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const { email, password, rememberMe } = form;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setForm({
      email: user ? user.email : '',
      rememberMe: user ? user.rememberMe : false,
    });
  }, []);

  function showRedirect() {
    if (isAuthenticated) return <Redirect to='/' />;
  }

  const _onSubmitHandler = e => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(form));
    } else {
      localStorage.removeItem('user');
    }
    dispatch(signIn({ email, password }, history));
  };

  const _onChangeHandler = ({ target: { value, name, type, checked } }) => {
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <Layout title='Sign In' containerSize='xs'>
      {showRedirect()}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form onSubmit={e => _onSubmitHandler(e)} className={classes.form}>
          <TextField
            onChange={e => _onChangeHandler(e)}
            value={email}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            value={password}
            onChange={e => _onChangeHandler(e)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <FormControlLabel
            name='rememberMe'
            onChange={e => _onChangeHandler(e)}
            checked={rememberMe}
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link className={classes.link} href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link className={classes.link} to='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Layout>
  );
};

export default SignIn;
