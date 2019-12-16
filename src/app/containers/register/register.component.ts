import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild("closeRegisterModal", { static: false })
  private closeModal: ElementRef;

  @ViewChild("openLoginModal", { static: false })
  private openLoginModal: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  register() {

  }

  login() {
    this.closeModal.nativeElement.click();
    this.openLoginModal.nativeElement.click();
  }

}
