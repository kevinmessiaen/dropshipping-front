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
import { filter } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  error: boolean = false;

  validate: boolean = false;
  username: string;
  password: string;

  @ViewChild("closeLoginModal", { static: false })
  private closeModal: ElementRef;

  @ViewChild("openRegisterModal", { static: false })
  private openRegisterModal: ElementRef;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.error = false;
    this.validate = true;
    if (
      isDefined(this.username) &&
      this.username.length >= 4 &&
      this.username.length <= 32 &&
      isDefined(this.password) &&
      this.password.length > 0
    ) {
      this.userService.login(this.username, this.password).subscribe(loged => {
        if (loged) {
          this.closeModal.nativeElement.click();
          let subscription: Subscription = this.userService
            .fullState()
            .pipe(filter(([isLogged, user]) => isLogged))
            .subscribe(([isLogged, user]) => {
              if (user.isAdmin) this.router.navigate(["/admin"]);
              else this.router.navigate(["/store"]);
              subscription.unsubscribe();
            });
        } else {
          this.error = true;
        }
      });
    }
  }

  register() {
    this.closeModal.nativeElement.click();
    this.openRegisterModal.nativeElement.click();
  }
}
