import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Product} from "../../models/Product";
import {BasketService} from "../../services/basket.service";
import {isDefined} from "@angular/compiler/src/util";

@Component({
  selector: 'app-add-to-basket',
  templateUrl: './add-to-basket.component.html',
  styleUrls: ['./add-to-basket.component.scss']
})
export class AddToBasketComponent implements OnInit, OnChanges {

  @Input() private product: Product;
  private quantity: string = "1";

  @ViewChild("closeAddToBasketModal", { static: false })
  private closeModal: ElementRef;

  constructor(private basketService: BasketService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isDefined(changes.product.previousValue)
      && changes.product.previousValue.id !== changes.product.currentValue.id)
      this.quantity = "1";
  }

  counter(n: number): any[] {
    return new Array(n);
  }

  addToBasket() {
    this.basketService.addToBasket(this.product.id, parseInt(this.quantity));
    this.closeModal.nativeElement.click();
  }

}
