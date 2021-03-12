import * as actionsType from "../actions/actionType";
import { updatedObject } from "../ultility";
const initialState = {
  idToken: null,
  userID: null,
  error: null,
  loading: false,
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
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.AUTH_START:
      return authStart(state, action);
    case actionsType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionsType.AUTH_FAIL:
      return authFail(state, action);

    default:
      return state;
  }
};

export default reducer;
