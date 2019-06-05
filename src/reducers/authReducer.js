import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  token: null,
  message: null,
  isSignedUp: null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload.userId, token: action.payload.token };
    case SIGN_UP:
      return { ...state, isSignedUp: true, userId: action.payload.userId, message: action.payload.message };
    case SIGN_OUT:
      return { ...state, isSignedIn: false,isSignedUp: false, userId: null, token: null };
    default:
      return state;
  }
};
