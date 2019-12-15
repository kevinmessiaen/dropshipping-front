import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of as observableOf } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { DataService } from "../../services/data.service";
import * as featureActions from "./actions";

@Injectable()
export class UserEffects {
  constructor(private dataService: DataService, private actions$: Actions) {}


}
