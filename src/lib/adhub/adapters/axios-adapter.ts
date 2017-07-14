import axios from 'axios';

/*
  This function does an axios GET request to and `endpoint`, passing some params
  and headers.

  TODO: maybe filter out headers that shouldn't be passed alongside a GET
  request, headers like `application/x-www-urlencoded`, etc.

  get :: (string, object) -> ()
*/
export const get =
  (endpoint: string, params = {}, headers = {}) =>
    () => {
      return axios
        .get(`${endpoint}`, { params, headers })
        .then(({ status, data }) => ({ status, data }))
        .catch(error => {
          throw { status: error.response.status, data: error.response.data }
        });
    }


/*
  This function does an axios POST request to and `endpoint`, passing some params
  and headers

  post :: (string, object) -> ()
*/
export const post =
  (endpoint: string, params = {}, headers = {}) =>
    () => {
      return axios
        .post(`${endpoint}`, params, { headers })
        .then(({ status, data }) => ({ status, data }))
        .catch(error => {
          throw { status: error.response.status, data: error.response.data }
        });
    }
