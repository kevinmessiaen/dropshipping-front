import { AfterViewInit, Component, OnInit } from "@angular/core";
import "jarallax";
import { UserService } from "../../services/user.service";
import { Observable } from "rxjs";
import { User } from "src/app/models/User";
declare var jarallax: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLogged$: Observable<boolean>;
  user$: Observable<User>;

  year: number = new Date().getFullYear();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.isLogged$ = this.userService.isLogged();
    this.user$ = this.userService.user();
    this.userService.load();
  }

  ngAfterViewInit(): void {
    jarallax(document.querySelectorAll(".jarallax"), {
      speed: 0.2
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
