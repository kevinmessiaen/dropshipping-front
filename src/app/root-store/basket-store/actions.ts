import { Action } from "@ngrx/store";
import { Basket } from "src/app/models/Basket";

export enum ActionTypes {
  LOAD_REQUEST = "[Basket] Load Request",
  LOAD_FAILURE = "[Basket] Load Failure",
  LOAD_SUCCESS = "[Basket] Load Success",
  UPDATE_REQUEST = "[Basket] Add Request",
  UPDATE_FAILURE = "[Basket] Add Failure",
  UPDATE_SUCCESS = "[Basket] Add Success"
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { basket: Basket }) {}
}

export class UpdateRequestAction implements Action {
  readonly type = ActionTypes.UPDATE_REQUEST;
  constructor(public payload: { basket: Basket }) {}
}

export class UpdateFailureAction implements Action {
  readonly type = ActionTypes.UPDATE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: { basket: Basket }) {}
}

export type Actions =
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | UpdateRequestAction
  | UpdateFailureAction
  | UpdateSuccessAction;
