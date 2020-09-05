import axios from 'axios';

const defaultOptions = {
  // baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
};
class AxiosService {
  constructor() {
    const instance = axios.create(defaultOptions);
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    instance.interceptors.request.use(config => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (token) {
        config.headers['Bearer'] = token;
      }
      return config;
    });
    this.instance = instance;
  }

  handleSuccess(response) {
    return response;
  }

  handleError(error) {
    return Promise.reject(error);
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new AxiosService();
