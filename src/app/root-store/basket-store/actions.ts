import { Action } from "@ngrx/store";
import { Basket } from "src/app/models/Basket";

export enum ActionTypes {
  LOAD_REQUEST = "[Basket] Load Request",
  LOAD_FAILURE = "[Basket] Load Failure",
  LOAD_SUCCESS = "[Basket] Load Success",
  CREATE_REQUEST = "[Basket] Create Request",
  CREATE_FAILURE = "[Basket] Create Failure",
  CREATE_SUCCESS = "[Basket] Create Success",
  UPDATE_REQUEST = "[Basket] Add Request",
  UPDATE_FAILURE = "[Basket] Add Failure",
  UPDATE_SUCCESS = "[Basket] Add Success"
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public payload: { basketId: string }) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { basket: Basket }) {}
}

export class CreateRequestAction implements Action {
  readonly type = ActionTypes.CREATE_REQUEST;
}

export class CreateFailureAction implements Action {
  readonly type = ActionTypes.CREATE_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class CreateSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
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
  | CreateRequestAction
  | CreateFailureAction
  | CreateSuccessAction
  | UpdateRequestAction
  | UpdateFailureAction
  | UpdateSuccessAction;
