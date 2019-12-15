import {AfterViewInit, Component, OnInit} from '@angular/core';
import 'jarallax';
import {UserService} from "../../services/user.service";
declare var jarallax: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  year: number = new Date().getFullYear()

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior:"smooth"});
  }

}
