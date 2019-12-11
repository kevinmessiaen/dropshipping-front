import { Action } from "@ngrx/store";
import { Category } from "src/app/models/Category";

export enum ActionTypes {
  LOAD_REQUEST = "[Categories] Load Request",
  LOAD_FAILURE = "[Categories] Load Failure",
  LOAD_SUCCESS = "[Categories] Load Success"
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
  constructor(public payload: { items: Category[] }) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
