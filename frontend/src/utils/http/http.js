import { APP_URL } from '../config';
import axios from 'axios';
class HTTP {

  async postData (url = ``, data = {}) {

    let headers = {};
    let response = {};
    url = `${APP_URL}/${url}`;
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    try {

      response = await axios.post(url, data, {
        headers,
        withCredentials: true,
      });
      
      return response.data;

    } catch (err) {
      return err.response.data;
    }

  }

}


export default new HTTP();