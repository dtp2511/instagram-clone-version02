export const setAuthToken = token => {
  if (token) {
    localStorage.setItem('token', JSON.stringify(token));
  } else {
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
