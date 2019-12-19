import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let subscription: Subscription = this.userService
        .fullState()
        .subscribe(([isLogged, user]) => {
          console.log("rerout");
          if (!isLogged || !user.isAdmin) {
            this.router.navigate(["/store"]);
          }
          subscription.unsubscribe();
        });
    });
  }
}
