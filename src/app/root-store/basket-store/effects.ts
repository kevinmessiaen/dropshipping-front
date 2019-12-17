import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { DataService } from "../../services/data.service";
import * as featureActions from "./actions";

@Injectable()
export class BasketEffects {
  constructor(private dataService: DataService, private actions$: Actions) {}

  @Effect()
  createRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.CreateRequestAction>(
      featureActions.ActionTypes.CREATE_REQUEST
    ),
    switchMap(action =>
      this.dataService.createBasket().pipe(
        map(
          basket =>
            new featureActions.LoadSuccessAction({
              basket
            })
        ),
        catchError(error =>
          observableOf(new featureActions.LoadFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadRequestAction>(
      featureActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService.getBasket(action.payload.basketId).pipe(
        map(
          basket =>
            new featureActions.CreateSuccessAction({
              basket
            })
        ),
        catchError(error =>
          observableOf(new featureActions.CreateFailureAction({ error }))
        )
      )
    )
  );

  @Effect()
  updateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.UpdateRequestAction>(
      featureActions.ActionTypes.UPDATE_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .updateBasket(action.payload.basket, action.payload.fuse)
        .pipe(
          map(
            basket =>
              new featureActions.UpdateSuccessAction({
                basket
              })
          ),
          catchError(error =>
            observableOf(new featureActions.UpdateFailureAction({ error }))
          )
        )
    )
  );
}
