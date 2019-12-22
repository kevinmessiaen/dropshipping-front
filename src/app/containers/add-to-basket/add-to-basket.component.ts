import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/Product";

@Component({
  selector: 'app-add-to-basket',
  templateUrl: './add-to-basket.component.html',
  styleUrls: ['./add-to-basket.component.scss']
})
export class AddToBasketComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
