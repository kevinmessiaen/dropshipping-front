import { Action } from "@ngrx/store";
import { User } from "../../models/User";

export enum ActionTypes {
  LOGIN_REQUEST = "[User] Login Request",
  LOGIN_FAILURE = "[User] Login Failure",
  LOGIN_SUCCESS = "[User] Login Success",
  LOAD_REQUEST = "[User] Load Request",
  LOAD_FAILURE = "[User] Load Failure",
  LOAD_SUCCESS = "[User] Load Success",
  LOGOUT_REQUEST = "[User] Logout Request",
  LOGOUT_FAILURE = "[User] Logout Failure",
  LOGOUT_SUCCESS = "[User] Logout Success"
}

export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;

  constructor(public payload: { username: string; password: string }) {}
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;

  constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
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

  constructor(public payload: { user: User }) {}
}

export class LogoutRequestAction implements Action {
  readonly type = ActionTypes.LOGOUT_REQUEST;
}

export class LogoutFailureAction implements Action {
  readonly type = ActionTypes.LOGOUT_FAILURE;

  constructor(public payload: { error: string }) {}
}

export class LogoutSuccessAction implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
}

export type Actions =
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction
  | LoadRequestAction
  | LoadFailureAction
  | LoadSuccessAction
  | LogoutRequestAction
  | LogoutFailureAction
  | LogoutSuccessAction;
