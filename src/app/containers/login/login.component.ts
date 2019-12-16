import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  error$: Observable<String>;
  subcribtion: Subscription;

  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.error$ = this.userService.error();
    this.subcribtion = this.userService.isLogged().subscribe(logged => {
      if (logged) {
        this.router.navigate(["/store"]);
      }
    });
    this.userService.load();
  }

  login() {
    this.userService.login(this.username, this.password);
  }

  ngOnDestroy() {
    this.subcribtion.unsubscribe();
  }
}
