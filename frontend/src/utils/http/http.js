import { APP_URL } from '../config';

class HTTP {

  async postData (url = ``, data = {}, token) {
    
    url = `${APP_URL}/${url}`;
    
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    
    return response.json();

  }

}


export default new HTTP();