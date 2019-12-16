import { Actions, ActionTypes } from "./actions";
import { initialState, State } from "./state";

export function userReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLogged: false,
        isLoading: true
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isLogged: true,
        isLoading: false
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLogged: false,
        isLoading: false
      };
    case ActionTypes.LOAD_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        isLogged: true,
        isLoading: false
      };
    case ActionTypes.LOAD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLogged: false,
        isLoading: false
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        isLogged: false,
        isLoading: false
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload.error,
        isLogged: false,
        isLoading: false
      };
    default: {
      return state;
    }
  }
}
