import axiosService from '../axios/axiosServices';

const url = `/api`;

export const getUserDetailedInfo = userId => {
  return axiosService.get(`${url}/getuserinfo/${userId}`);
};

export const followingUser = followId => {
  return axiosService.put(`${url}/follow`, { followId });
};

export const unfollowingUser = unFollowId => {
  return axiosService.put(`${url}/unfollow`, { unFollowId });
};

export const updateProfileImg = formData => {
  return axiosService.put(`${url}/uploadproimg`, formData);
};
