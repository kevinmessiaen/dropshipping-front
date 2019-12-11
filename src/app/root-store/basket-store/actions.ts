import { Action } from "@ngrx/store";
import { Basket } from "src/app/models/Basket";

export enum ActionTypes {
  LOAD_REQUEST = "[Basket] Load Request",
  LOAD_FAILURE = "[Basket] Load Failure",
  LOAD_SUCCESS = "[Basket] Load Success",
  UPDATE_REQUEST = "[Basket] Add Request",
  UPDATE_FAILURE = "[Basket] Add Failure",
  UPDATE_SUCCESS = "[Basket] Add Success",
  ADD_REQUEST = "[Products] Add Request",
  ADD_FAILURE = "[Products] Add Failure",
  ADD_SUCCESS = "[Products] Add Success"
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public payload: { basket: string }) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { basket: Basket }) {}
}

export class AddRequestAction implements Action {
  readonly type = ActionTypes.ADD_REQUEST;
  constructor(public payload: { basket: string; product: number }) {}
}

export class AddFailureAction implements Action {
  readonly type = ActionTypes.ADD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class AddSuccessAction implements Action {
  readonly type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: { basket: Basket }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | AddRequestAction
  | AddFailureAction
  | AddSuccessAction;
