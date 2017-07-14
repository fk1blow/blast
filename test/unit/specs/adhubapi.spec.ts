import {} from 'jasmine'
import JasmineExpect from 'jasmine-expect';
import { Just, Nothing } from 'folktale/data/maybe';
import IRequestAdapter from '../../../src/lib/adhub/resource/irequestadapter';
import resource from '../../../src/lib/adhub/resource';

const TEST_TOKEN = '$$$-token-$$$';

const statusCode =
  (code: number) => ({ status: code, data: {} });

// This just wraps the normal adapter in order to trick the flow into returning
// initially a 401 status, then switch to a 200 status(firs time it will return
// a 401, then increment the `repeat` var, following a 200 response status code)
const requestStepper =
  (...steps) => {
    let step = 1;
    return (resource: string, params: object, headers: object) => {
      return () => {
        switch(step) {
          case 1:
            step += 1;
            return steps[0].call();
            break;
          case 2:
            step += 1;
            return steps[1].call();
            break;
          default:
            return steps[2].call();
            break;
        }
      }
    }
  }

// Spec descriptions

describe('adhub api resources', () => {
  const {toBeFunction} = JasmineExpect;
  let resourceApi = resource('adhub.com/api');

  it('resource should pe a function', () => {
    expect(resource).toBeFunction();
  });

  it('calling resource should return a function', () => {
    expect(resourceApi).toBeFunction();
  })

  it('calling the resource should return a promise', () => {
    const refreshFlow = requestStepper(
      () => Promise.reject(statusCode(401)),
      () => Promise.resolve(statusCode(200)),
      () => Promise.reject(statusCode(500)));

    const someResource = resourceApi(refreshFlow, '/some/resource', {});
    expect(someResource).toEqual(jasmine.any(Promise));
  });

  it('should reject if the refresh fails but passed retry/original request', () => {
    const refreshFlow = requestStepper(
      () => Promise.reject({ ...statusCode(401) }),
      () => Promise.resolve({ ...statusCode(200), token: TEST_TOKEN }),
      () => Promise.reject(statusCode(500)));

    resourceApi(refreshFlow, 'a/b/', {})
      .catch(({ token, status }) => {
        expect(token).toEqual(TEST_TOKEN);
        expect(status).toEqual(500);
        done();
      });
  });

  it('should reject if the retry request resolved but failed the refresh', () => {
    const refreshFlow = requestStepper(
      () => Promise.reject({ ...statusCode(401) }),
      () => Promise.reject({ ...statusCode(404) }),
      () => Promise.resolve(statusCode(500)));

    resourceApi(refreshFlow, 'a/b/', {})
      .catch(({ status }) => {
        expect(status).toEqual(404);
        done();
      });
  });

  it('should resolve with a token and status if happy path', () => {
    const refreshFlow = requestStepper(
      () => Promise.reject({ ...statusCode(401) }),
      () => Promise.resolve({ ...statusCode(200), token: TEST_TOKEN }),
      () => Promise.resolve(statusCode(200)));

    resourceApi(refreshFlow, 'a/b/', {})
      .then(({ status, token }) => {
        expect(status).toEqual(200);
        expect(token).toEqual(TEST_TOKEN);
        done();
      });
  });
})
