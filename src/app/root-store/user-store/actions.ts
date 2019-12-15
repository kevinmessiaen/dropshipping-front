import {Action} from "@ngrx/store";
import {User} from "../../models/User";

export enum ActionTypes {
  LOGIN_REQUEST = "[User] Login Request",
  LOGIN_FAILURE = "[User] Login Failure",
  LOGIN_SUCCESS = "[User] Login Success",
  LOAD_REQUEST = "[User] Load Request",
  LOAD_FAILURE = "[User] Load Failure",
  LOAD_SUCCESS = "[User] Load Success"
}

export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;

  constructor(public payload: { username: string; password: string }) {
  }
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { sessionId: string }) {
  }
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;

  constructor(public payload: { sessionId: string }) {
  }
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;

  constructor(public payload: { error: string }) {
  }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: { user: User }) {
  }
}

export type Actions =
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction;
