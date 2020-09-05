import {
  GET_ALL_POST_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILED,
  UPDATE_LIKES,
  DELETE_COMMENT,
  ADD_COMMENT,
  CREATE_POST,
  DELETE_POST,
} from '../../common/constants';

const initialState = {
  posts: [],
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POST_REQUEST: {
      state.loading = true;
      return state;
    }
    case GET_ALL_POSTS_SUCCESS: {
      const { posts } = payload;
      state.posts = posts;
      state.loading = false;
      return state;
    }
    case GET_ALL_POSTS_FAILED:
      state.posts = [];
      state.loading = false;
      return state;
    case UPDATE_LIKES: {
      const {
        post: { _id, likes },
      } = payload;
      state.posts = state.posts.map(post =>
        post._id === _id ? { ...post, likes } : post
      );
      return state;
    }
    case ADD_COMMENT: {
      const {
        post: { _id, comments },
      } = payload;
      state.posts = state.posts.map(post =>
        post._id === _id ? { ...post, comments } : post
      );
      return state;
    }

    case DELETE_COMMENT: {
      const {
        post: { _id, comments },
      } = payload;
      state.posts = state.posts.map(post =>
        post._id === _id ? { ...post, comments } : post
      );
      return state;
    }
    case CREATE_POST: {
      const { post } = payload;
      state.posts = state.posts.unshift(post);
      return state;
    }
    case DELETE_POST: {
      const postId = payload;
      state.posts = state.posts.filter(post => post._id !== postId);
      return state;
    }
    default:
      return state;
  }
};
