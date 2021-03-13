import * as actionsType from "../actions/actionType";
import { updatedObject } from "../ultility";
const initialState = {
  idToken: null,
  userID: null,
  error: null,
  loading: false,
  authRedirectPath: "/", 
};
const authStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updatedObject(state, {
    idToken: action.idToken,
    userID: action.userID,
    error: null,
    loading: false,
  });
};
const authFail = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false,
  });
};
const authLogout = (state, action) => {
  return updatedObject(state, { idToken: null, userID: null });
};

const setAuthRedirectPath = (state, action) => {
    return updatedObject(state, {authRedirectPath: action.path});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.AUTH_START:
      return authStart(state, action);
    case actionsType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionsType.AUTH_FAIL:
      return authFail(state, action);
    case actionsType.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionsType.SET_AUTH_REDIRECT_PATH: 
        return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
