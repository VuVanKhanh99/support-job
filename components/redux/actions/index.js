import {LOGIN} from './actions';

export const Login = data => {
  return {
      type:LOGIN,
      payload: data
  }
};
