var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Task } from 'folktale/concurrency/task';
/*
  If the original request/task responded with status is not 401,
  it continues with a rejection.

  If the original request/task has responded wit a 401 status,
  it assumes the token has expired. It then tries to fetch another
  re/fresh token and if succeeds, it retries the original request.

  TODO: check if the refresh chain flow works correctly, after you have an api
  that supports refresh tokens

  refreshThenRetry :: (Task, Task) -> (IResponse) -> Task
*/
var refreshThenRetry = function (originalTask, refreshTask) {
    return function (response) {
        if (response.status == 401) {
            return refreshTask()
                .chain(function (refresh) {
                return originalTask()
                    .map(function (response) { return (__assign({}, refresh, response)); })
                    .mapRejected(function (error) { return (__assign({}, refresh, error)); });
            });
        }
        else {
            return Task.rejected(response);
        }
    };
};
/*
  It provides a resource located at endpoint, parameterized with `params` object.
  Will try to run the original resource request/task and if it has a status of 401,
  it runs refresh the token/task, with the help of `refreshThenRetry` function.

  resourceFlow :: (IRequestAdapter, string, string, object) -> Promise<any>
*/
function resourceFlow(adapter, api, resource, params, headers) {
    var initialTask = Task.fromPromised(adapter("" + api + resource, params, headers));
    var refreshTask = Task.fromPromised(adapter(api + "/token", params, headers));
    var retryTask = Task.fromPromised(adapter("" + api + resource, params, headers));
    // get the resource and if it fails, try and get a new token(assuming the
    // token has expired) and retry the original request.
    return initialTask()
        .orElse(refreshThenRetry(retryTask, refreshTask))
        .run()
        .promise();
}
/*
  Gives you a thenable that represents the resource you want to get, post, etc.

  The first function configures the url endpoint for the api, thus providing
  a way to be modular and have testability.
  The second function accepts the rest of parameters needed and returning a promise.

  resource :: (string) -> (IRequestAdapter, string, object, object) -> Promise<IResponse>
*/
var resource = function (api) {
    return function (adapter, resource, params, headers) {
        return resourceFlow(adapter, api, resource, params, headers);
    };
};
export default resource;
