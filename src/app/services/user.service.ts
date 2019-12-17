import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootStoreState } from "../root-store";
import { UserAction, UserSelectors } from "../root-store/user-store";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { BasketService } from "./basket.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private shouldListen: boolean = true;
  private shouldLoad: boolean = true;
  private logoutRequested: boolean = false;

  constructor(
    private store$: Store<RootStoreState.State>,
    private basketService: BasketService
  ) {}

  load() {
    if (this.shouldListen) {
      this.shouldListen = false;
      this.store$.select(UserSelectors.selectIsLogged).subscribe(logged => {
        if (logged) {
          localStorage.setItem("isLogged", "true");
          this.load();
        } else {
          localStorage.removeItem("isLogged");
          if (this.logoutRequested) {
            this.logoutRequested = false;
            localStorage.clear();
            this.basketService.recreate();
            this.shouldLoad = true;
          }
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

  logout() {
    this.logoutRequested = true;
    this.store$.dispatch(new UserAction.LogoutRequestAction());
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
