import {LOGIN, LOGIN_SUCCESS} from '../actions/actions';

const initialState = {
  isRequesting: false,
  data: [],
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isRequesting: true,
        data:[]
      };
    case LOGIN_SUCCESS:
      return {
          ...state,
          isRequesting: false,
          data:action.payload
      };
    default:
      return state;
  }
};

export default reducerUser