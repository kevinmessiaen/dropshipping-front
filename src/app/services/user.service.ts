import { Injectable, EventEmitter } from "@angular/core";
import { BasketService } from "./basket.service";
import { User } from "../models/User";
import { DataService } from "./data.service";
import { isDefined } from "@angular/compiler/src/util";
import {BehaviorSubject, Observable, of} from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _isLogged: boolean;
  isLogged$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private _user: User;
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private dataService: DataService,
    private basketService: BasketService
  ) {
    this.isLogged = localStorage.getItem("isLogged") == "true";
  }

  set isLogged(isLogged: boolean) {
    if (this._isLogged === isLogged) return;
    this._isLogged = isLogged;
    this.isLogged$.next(this._isLogged);

    if (this._isLogged) {
      localStorage.setItem("isLogged", "true");
      this.getUser();
    } else {
      localStorage.clear();
      this.user = null;
    }
  }

  set user(user: User) {
    if (user === this._user) return;
    this._user = user;
    this.user$.next(this._user);

    if (isDefined(this._user)) {
      this.basketService.basketId = this._user.basketId;
    } else {
      this.basketService.basketId = null;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.dataService.login(username, password).pipe(
      map(() => {
        this.isLogged = true;
        return true;
      }),
      catchError(e => {
        this.isLogged = false;
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
      error => (this.isLogged = false)
    );
  }
}
