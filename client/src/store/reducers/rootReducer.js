import { combineReducers } from 'redux-immer';

import authReducer from './authReducer';
import postsReducer from './postsReducer';
import produce from 'immer';
import userReducer from './userReducer';
import imageReducer from './imageReducer';
export default combineReducers(produce, {
  auth: authReducer,
  posts: postsReducer,
  userDetailed: userReducer,
  image: imageReducer,
});
