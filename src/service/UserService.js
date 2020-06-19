import {API_BASE_URL} from '../config/APIConfig'

import axios from 'axios';
import authHeader from '../components/AuthHeader';

const API_URL = API_BASE_URL;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'test/all');
  }

  getAdminBoard() {
    return axios.get(API_URL + 'test/admin', { headers: authHeader() });
  }
}

export default new UserService();
