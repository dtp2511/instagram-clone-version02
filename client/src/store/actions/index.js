import { signIn, signUp, auth, logout } from './authActions';
import {
  getAllPosts,
  likePost,
  unlikePost,
  deleteComment,
  addComment,
  createPost,
  deletePost,
} from './postsActions';
import {
  getUserDetailedInfo,
  followingUser,
  unfollowingUser,
  updateProfileImg,
} from './userActions';
import { setSelectedImage } from './imageActions';
export {
  signIn,
  signUp,
  auth,
  getAllPosts,
  likePost,
  unlikePost,
  deleteComment,
  addComment,
  createPost,
  deletePost,
  getUserDetailedInfo,
  followingUser,
  unfollowingUser,
  logout,
  setSelectedImage,
  updateProfileImg,
};
