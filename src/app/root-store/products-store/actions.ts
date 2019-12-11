import { Action } from "@ngrx/store";
import { Product } from "src/app/models/Product";

export enum ActionTypes {
  LOAD_REQUEST = "[Products] Load Request",
  LOAD_FAILURE = "[Products] Load Failure",
  LOAD_SUCCESS = "[Products] Load Success"
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
  constructor(public payload: { items: Product[] }) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
