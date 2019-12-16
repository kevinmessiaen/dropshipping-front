import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from "@angular/core";
import { UserService } from "../../services/user.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { isDefined } from "@angular/compiler/src/util";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  error$: Observable<String>;
  subcribtion: Subscription;

  validate: boolean = false;
  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {}

  @ViewChild("closeLoginModal", { static: false })
  private closeModal: ElementRef;

  ngOnInit() {
    this.error$ = this.userService.error();
    this.subcribtion = this.userService.isLogged().subscribe(logged => {
      if (logged) {
        this.closeModal.nativeElement.click();
        this.router.navigate(["/store"]);
      }
    });
    this.userService.load();
  }

  login() {
    this.validate = true;
    if (
      isDefined(this.username) &&
      this.username.length >= 4 &&
      this.username.length <= 32 &&
      isDefined(this.password) &&
      this.password.length > 0
    ) {
      this.userService.login(this.username, this.password);
    } else {
      this.username = this.username;
      this.password = this.password;
    }
    console.log(
      this.validate && !(isDefined(this.password) && this.password.length > 0)
    );
  }

  ngOnDestroy() {
    this.subcribtion.unsubscribe();
  }
}
