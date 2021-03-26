import reducer from "./auth";
import * as actionTypes from "../actions/actionType";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userID: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("Should store token upon login", () => {
    expect(
      reducer(
        {
          idToken: null,
          userID: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userID: "some-user-id",
        }
      )
    ).toEqual({
      idToken: "some-token",
      userID: "some-user-id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
});
