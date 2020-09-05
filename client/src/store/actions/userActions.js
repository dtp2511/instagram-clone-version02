import {
  GET_DETAILED_USER_INFO_SUCCESS,
  GET_DETAILED_USER_INFO_FAILED,
  GET_DETAILED_USER_INFO_REQUEST,
  FOLLOW_USER,
  UNFOLLOW_USER,
  UPLOAD_PROFILE_IMG,
} from '../../common/constants';
import { showToast } from '../../helpers/toast';
import * as userApi from '../../api/user';

export const getUserDetailedInfo = userId => async dispatch => {
  dispatch({ type: GET_DETAILED_USER_INFO_REQUEST });

  try {
    const { data } = await userApi.getUserDetailedInfo(userId);
    dispatch({ type: GET_DETAILED_USER_INFO_SUCCESS, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: GET_DETAILED_USER_INFO_FAILED });

    showToast(errors[0].msg, 'error');
  }
};

export const followingUser = userId => async dispatch => {
  try {
    const { data } = await userApi.followingUser(userId);
    return dispatch({ type: FOLLOW_USER, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};

export const unfollowingUser = unFollowId => async dispatch => {
  try {
    const { data } = await userApi.unfollowingUser(unFollowId);
    return dispatch({ type: UNFOLLOW_USER, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};

export const updateProfileImg = formData => async dispatch => {
  try {
    const { data } = await userApi.updateProfileImg(formData);
    return dispatch({ type: UPLOAD_PROFILE_IMG, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};
