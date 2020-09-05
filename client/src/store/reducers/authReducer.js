import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
  GET_USER_INFO_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  GET_USER_INFO_REQUEST,
  SIGN_OUT,
  GET_USER_INFO_FAILED,
} from '../../common/constants';
const initialState = {
  token: JSON.parse(localStorage.getItem('token'))
    ? JSON.parse(localStorage.getItem('token'))
    : '',
  user: null,
  isAuthenticated: false,
  loading: true,
  isResolved: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
    case GET_USER_INFO_REQUEST: {
      state.loading = true;
      return state;
    }
    case GET_USER_INFO_SUCCESS: {
      const { user } = payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = user;
      state.isResolved = true;
      return state;
    }
    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS: {
      const { user, token } = payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.user = user;
      state.token = token;
      return state;
    }
    case GET_USER_INFO_FAILED:
    case SIGN_UP_FAILED:
    case SIGN_IN_FAILED:
    case SIGN_OUT:
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.isResolved = true;
      return state;
    default:
      return state;
  }
};
