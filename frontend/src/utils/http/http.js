import { APP_URL } from '../config';
import axios from 'axios';
class HTTP {

  async postData (url = ``, data = {}, token) {

    let headers = {};
    let response = {};
    url = `${APP_URL}/${url}`;
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    if (token !== undefined && token !== null) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    try {

      response = await axios.post(url, data, {
        headers
      });
      
      return response.data;

    } catch (err) {
      return err.response.data;
    }

  }

}


export default new HTTP();