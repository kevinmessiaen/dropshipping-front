import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error$: Observable<String>;
  sessionId$: Observable<String>;

  username: string;
  password: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.error$ = this.userService.error();
    this.sessionId$ = this.userService.sessionId();
  }

  login() {
    this.userService.login(this.username, this.password);
  }

}
