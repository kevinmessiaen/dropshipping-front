import { Injectable, EventEmitter } from "@angular/core";
import { BasketService } from "./basket.service";
import { User } from "../models/User";
import { DataService } from "./data.service";
import { isDefined } from "@angular/compiler/src/util";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _isLogged: boolean;
  isLogged$: EventEmitter<boolean> = new EventEmitter();

  private _user: User;
  user$: EventEmitter<User> = new EventEmitter();

  constructor(
    private dataService: DataService,
    private basketService: BasketService
  ) {
    this.isLogged = localStorage.getItem("isLogged") == "true";
  }

  set isLogged(isLogged: boolean) {
    if (this._isLogged === isLogged) return;
    this.isLogged$.emit(this._isLogged);

    if (this._isLogged) {
      localStorage.setItem("isLogged", "user");
      this.getUser();
    } else {
      localStorage.clear();
      this.user = null;
    }
  }

  set user(user: User) {
    if (user === this._user) return;
    this.user$.emit(this._user);

    if (isDefined(this.user)) {
      this.basketService.basketId = this.user.basketId;
    } else {
      this.basketService.basketId = null;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.dataService.login(username, password).pipe(
      map(() => {
        this._isLogged = true;
        return true;
      }),
      catchError(e => {
        this._isLogged = false;
        return of(false);
      })
    );
  }

  logout() {
    this.dataService.logout().subscribe(() => (this.isLogged = false));
  }

  getUser() {
    this.dataService.getUser().subscribe(
      user => (this.user = user),
      error => (this.user = null)
    );
  }
}
