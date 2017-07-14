import axios from 'axios';
/*
  This function does an axios GET request to and `endpoint`, passing some params
  and headers.

  TODO: maybe filter out headers that shouldn't be passed alongside a GET
  request, headers like `application/x-www-urlencoded`, etc.

  get :: (string, object) -> ()
*/
export var get = function (endpoint, params, headers) {
    if (params === void 0) { params = {}; }
    if (headers === void 0) { headers = {}; }
    return function () {
        return axios
            .get("" + endpoint, { params: params, headers: headers })
            .then(function (_a) {
            var status = _a.status, data = _a.data;
            return ({ status: status, data: data });
        })
            .catch(function (error) {
            throw { status: error.response.status, data: error.response.data };
        });
    };
};
/*
  This function does an axios POST request to and `endpoint`, passing some params
  and headers

  post :: (string, object) -> ()
*/
export var post = function (endpoint, params, headers) {
    if (params === void 0) { params = {}; }
    if (headers === void 0) { headers = {}; }
    return function () {
        return axios
            .post("" + endpoint, params, { headers: headers })
            .then(function (_a) {
            var status = _a.status, data = _a.data;
            return ({ status: status, data: data });
        })
            .catch(function (error) {
            throw { status: error.response.status, data: error.response.data };
        });
    };
};
