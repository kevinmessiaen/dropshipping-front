import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from "@ngrx/store";

import { State } from "./state";
import {User} from "../../models/User";

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

const getSessionId = (state: State): any => state.sessionId;

const getUser = (state: State): any => state.user;

export const selectUserState: MemoizedSelector<
  object,
  State
  > = createFeatureSelector<State>("user");

export const selectUserError: MemoizedSelector<object, any> = createSelector(
  selectUserState,
  getError
);

export const selectUserIsLoading: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectUserState, getIsLoading);

export const selectSessionId: MemoizedSelector<object, User> = createSelector(
  selectUserState,
  getSessionId
);

export const selectUser: MemoizedSelector<object, Basket> = createSelector(
  selectUserState,
  getUser
);
