import AmplifyAuthService from "@src/services/AuthService";
import produce from "immer";
const initialState = {
  isLoggedIn: false,
  user: {
    name: null,
    lastName: null,
    locale: null,
    email: null
  },
  loading: false,
  error: null
};

// Actions
const LOGIN_REQUEST = "AuthState/LOGIN_REQUEST";
const LOGIN_SUCCESS = "AuthState/LOGIN_SUCCESS";
const LOGIN_FAIL = "AuthState/LOGIN_FAIL";
const CLEAR_ERROR = "AuthState/CLEAR_ERROR";
const LOGOUT_REQUEST = "AuthState/LOGOUT_REQUEST";
const LOGOUT_SUCESS = "AuthState/LOGOUT_SUCESS";

export function submitLoginWithAwsCognito(model) {
  const { email, password } = model;
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });
    AmplifyAuthService.signIn(email, password)
      .then(() => {
        AmplifyAuthService.isAuthenticatedUser()
          .then(res => {
            return dispatch({
              type: LOGIN_SUCCESS,
              payload: res.attributes
            });
          })
          .catch(err => {
            return dispatch({
              type: LOGIN_FAIL,
              payload: err.message
            });
          });
      })
      .catch(err => {
        return dispatch({
          type: LOGIN_FAIL,
          payload: err.message
        });
        // ,
        // setTimeout(
        //   dispatch({
        //     type: CLEAR_ERROR
        //   }),
        //   2000
        // )
      });
  };
}

export function signOut() {
  return dispatch => {
    dispatch({
      type: LOGOUT_REQUEST
    });
    AmplifyAuthService.signOut().then(res => {
      dispatch({
        type: LOGOUT_SUCESS
      });
    });
  };
}
const immerAuthReducer = produce((draft, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      draft.error = null;
      return draft;
    case LOGIN_REQUEST:
      draft.loading = true;
      return draft;
    case LOGIN_SUCCESS:
      draft.loading = false;
      draft.isLoggedIn = true;
      draft.error = null;
      draft.name = action.payload.name;
      draft.email = action.payload.email;
      return draft;
    case LOGIN_FAIL:
      draft.loading = false;
      draft.error = action.payload;
      return draft;
    case LOGOUT_SUCESS:
      draft.loading = false;
      draft.isLoggedIn = false;
      return draft;
    default:
      return draft;
  }
}, initialState);

export default immerAuthReducer;
