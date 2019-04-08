import axios from 'axios'

const config = {
  company: {}
};

function doTheREST(method, url, callback, body = {}) {
  axios({
    method,
    url,
    auth: {
      username: 'dev',
      password: 'dev'
    },
    data: body,
    timeout: 2000,
  }).then((response) => {
    console.log("[AXIOS.Then]");
    console.log(response.data);
    callback(response, undefined);
  }).catch((error) => {
    console.log("[AXIOS.Catch]");
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
    callback(undefined, error);
  });
}

export default {
  get(url, callback) {
    console.log('GET');
    console.log(url);
    doTheREST('get', url, (response, error) => {
      callback((response) ? response.data : {});
    });
  },
  post(data, url, callback) {
    console.log('POST');
    console.log(data);
    doTheREST('post', url, (response, error) => {
      console.log(response.data);
      callback((response) ? {success: true, responseData: response.data, error: undefined} : {
        success: false,
        responseData: undefined,
        error: error
      });
    }, data);
  },
  delete(data, url, callback) {
    console.log('DELETE');
    console.log(data);
    doTheREST('delete', url, (response, error) => {
      callback((response) ? {success: true, error: undefined} : {success: false, error: error});
    }, data);
  },
}
