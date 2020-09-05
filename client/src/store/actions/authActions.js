import { showToast } from '../../helpers/toast';
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_REQUEST,
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_OUT,
} from '../../common/constants';
import * as authAPI from '../../api/auth';

export const signIn = (formData, history) => async dispatch => {
  dispatch({ type: SIGN_IN_REQUEST });
  try {
    const { data } = await authAPI.signIn(formData);
    dispatch({ type: SIGN_IN_SUCCESS, payload: data });
    showToast('Login Successfully !', 'success');
    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: SIGN_IN_FAILED });
    showToast(errors[0].msg, 'error');
  }
};

export const signUp = (formData, history) => async dispatch => {
  dispatch({ type: SIGN_UP_REQUEST });
  try {
    const { data } = await authAPI.signUp(formData);
    dispatch({ type: SIGN_UP_SUCCESS, payload: data });
    showToast('Sign Up Successfully !', 'success');
    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: SIGN_UP_FAILED });
    showToast(errors[0].msg, 'error');
  }
};

export const auth = () => async dispatch => {
  dispatch({ type: GET_USER_INFO_REQUEST });
  try {
    const { data } = await authAPI.auth();
    dispatch({ type: GET_USER_INFO_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: GET_USER_INFO_FAILED });
  }
};

export const logout = () => async dispatch => {
  dispatch({ type: SIGN_OUT });
};
