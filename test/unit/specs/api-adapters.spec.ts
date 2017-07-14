import {} from 'jasmine'
import JasmineExpect from 'jasmine-expect';
import {post, get} from '../../../src/lib/adhub/adapters/axios-adapter';

describe('adhub api request adapters', () => {
  const {toBeFunction} = JasmineExpect;

  it('post adapter should be a function', () => {
    expect(post).toBeFunction();
  });

  it('post adapter should return a function', () => {
    expect(post()).toBeFunction();
  });

  it('post adapter should return a promise on second application');

  it('get adapter should be a function');

  it('get adapter should return a function');

  it('get adapter should return a promise on second application');
});
