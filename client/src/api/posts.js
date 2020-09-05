import axiosService from '../axios/axiosServices';

const url = '/api';

export const getAllPosts = () => {
  return axiosService.get(`${url}/posts`);
};

export const getMyPosts = () => {
  return axiosService.get(`${url}/myposts`);
};

export const likePost = idPost => {
  return axiosService.put(`${url}/like/${idPost}`);
};

export const unlikePost = idPost => {
  return axiosService.put(`${url}/unlike/${idPost}`);
};

export const removeComment = (idPost, idComment) => {
  return axiosService.delete(`${url}/comment/${idPost}/${idComment}`);
};

export const addComment = (idPost, data) => {
  return axiosService.put(`${url}/comment/${idPost}`, data);
};

export const createPost = formData => {
  return axiosService.post(`${url}/create-post`, formData);
};

export const deletePost = idPost => {
  return axiosService.delete(`${url}/post/${idPost}`);
};
