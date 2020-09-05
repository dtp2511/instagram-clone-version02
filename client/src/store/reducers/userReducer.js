import {
  GET_DETAILED_USER_INFO_SUCCESS,
  GET_DETAILED_USER_INFO_FAILED,
  GET_DETAILED_USER_INFO_REQUEST,
  FOLLOW_USER,
  UNFOLLOW_USER,
  UPLOAD_PROFILE_IMG,
} from '../../common/constants';
const initialState = {
  userInfo: null,
  detailedUserPosts: [],
  isFollowing: null,
  loading: true,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DETAILED_USER_INFO_REQUEST: {
      state.userInfo = null;
      state.detailedUserPosts = [];
      state.loading = true;
      state.isFollowing = null;
      return state;
    }
    case GET_DETAILED_USER_INFO_SUCCESS: {
      const { posts, user, isFollowing } = payload;
      state.detailedUserPosts = posts;
      state.userInfo = user;
      state.loading = false;
      state.isFollowing = isFollowing;
      return state;
    }
    case GET_DETAILED_USER_INFO_FAILED:
      state.userInfo = null;
      state.detailedUserPosts = [];
      state.loading = false;
      state.isFollowing = null;
      return state;
    case FOLLOW_USER: {
      const { user } = payload;
      state.userInfo = user;
      state.isFollowing = !state.isFollowing;
      return state;
    }
    case UNFOLLOW_USER: {
      const { user } = payload;
      state.userInfo = user;
      state.isFollowing = !state.isFollowing;
      return state;
    }
    case UPLOAD_PROFILE_IMG: {
      const { user } = payload;
      state.userInfo = user;
      return state;
    }
    default:
      return state;
  }
};
