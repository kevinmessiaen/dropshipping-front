import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";
import { DataService } from "../../services/data.service";
import * as featureActions from "./actions";

@Injectable()
export class BasketEffects {
  constructor(private dataService: DataService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadRequestAction>(
      featureActions.ActionTypes.LOAD_REQUEST
    ),
    switchMap(action =>
      this.dataService.getBasket(action.payload.basket).pipe(
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
  addRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.AddRequestAction>(
      featureActions.ActionTypes.ADD_REQUEST
    ),
    switchMap(action =>
      this.dataService
        .addToBasket(action.payload.basket, action.payload.product)
        .pipe(
          map(
            basket =>
              new featureActions.AddSuccessAction({
                basket
              })
          ),
          catchError(error =>
            observableOf(new featureActions.AddFailureAction({ error }))
          )
        )
    )
  );
}
