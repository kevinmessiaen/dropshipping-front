import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {RootStoreState} from "../root-store";
import {UserAction, UserSelectors} from "../root-store/user-store";
import {Observable} from "rxjs";
import {ProductsSelectors} from "../root-store/products-store";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private store$: Store<RootStoreState.State>) {
  }

  login(username: string, password: string) {
    this.store$.dispatch(new UserAction.LoginRequestAction({
      username: username,
      password: password
    }));
  }

  sessionId(): Observable<string> {
    return this.store$.select(UserSelectors.selectSessionId);
  }

  error(): Observable<string> {
    return this.store$.select(UserSelectors.selectUserError);
  }
}
