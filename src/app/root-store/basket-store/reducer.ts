import { Actions, ActionTypes } from "./actions";
import { initialState, State } from "./state";

export function basketReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        basket: action.payload.basket,
        error: null,
        isLoading: false
      };
    case ActionTypes.LOAD_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    case ActionTypes.UPDATE_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case ActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        basket: action.payload.basket,
        error: null,
        isLoading: false
      };
    case ActionTypes.UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false
      };
    default: {
      return state;
    }
  }
}
