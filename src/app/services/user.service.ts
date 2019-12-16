import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import { UserAction, UserSelectors } from "../root-store/user-store";
import { Observable } from "rxjs";
import { User } from "../models/User";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private shouldListen: boolean = true;
  private shouldLoad: boolean = true;

  constructor(private store$: Store<RootStoreState.State>) {}

  load() {
    if (this.shouldListen) {
      this.shouldListen = false;
      this.store$.select(UserSelectors.selectIsLogged).subscribe(logged => {
        console.log(localStorage.getItem("isLogged") == "true");
        if (logged) {
          localStorage.setItem("isLogged", "true");
          this.load();
        } else {
          localStorage.clear();
          this.shouldLoad = true;
        }
      });
    }
    if (this.shouldLoad && localStorage.getItem("isLogged") == "true") {
      this.shouldLoad = false;
      this.store$.dispatch(new UserAction.LoadRequestAction());
    }
  }

  login(username: string, password: string) {
    this.store$.dispatch(
      new UserAction.LoginRequestAction({
        username: username,
        password: password
      })
    );
  }

  isLogged(): Observable<boolean> {
    return this.store$.select(UserSelectors.selectIsLogged);
  }

  error(): Observable<string> {
    return this.store$.select(UserSelectors.selectUserError);
  }

  user(): Observable<User> {
    return this.store$.select(UserSelectors.selectUser);
  }
}
