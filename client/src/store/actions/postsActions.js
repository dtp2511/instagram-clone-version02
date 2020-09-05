import * as postsApi from '../../api/posts';
import { showToast } from '../../helpers/toast';
import {
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILED,
  UPDATE_LIKES,
  DELETE_COMMENT,
  ADD_COMMENT,
  CREATE_POST,
  DELETE_POST,
  GET_ALL_POST_REQUEST,
} from '../../common/constants';

export const getAllPosts = () => async dispatch => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const { data } = await postsApi.getAllPosts();
    dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: GET_ALL_POSTS_FAILED });
    showToast(errors[0].msg, 'error');
  }
};

export const likePost = idPost => async dispatch => {
  try {
    const { data } = await postsApi.likePost(idPost);
    dispatch({ type: UPDATE_LIKES, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};

export const unlikePost = idPost => async dispatch => {
  try {
    const { data } = await postsApi.unlikePost(idPost);
    dispatch({ type: UPDATE_LIKES, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};

export const addComment = (idPost, form) => async dispatch => {
  try {
    const { data } = await postsApi.addComment(idPost, form);
    dispatch({ type: ADD_COMMENT, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};

export const deleteComment = (idPost, idComment) => async dispatch => {
  try {
    const { data } = await postsApi.removeComment(idPost, idComment);
    dispatch({ type: DELETE_COMMENT, payload: data });
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};

export const createPost = (formData, history) => async dispatch => {
  try {
    const { data } = await postsApi.createPost(formData);
    dispatch({ type: CREATE_POST, payload: data });
    showToast('Create Success !', 'success');
    history.push('/');
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};

export const deletePost = idPost => async dispatch => {
  try {
    await postsApi.deletePost(idPost);
    dispatch({ type: DELETE_POST, payload: idPost });
    showToast('Delete success !', 'success');
  } catch (err) {
    const errors = err.response.data.errors;
    showToast(errors[0].msg, 'error');
  }
};
