import {
  Component,
  OnInit,
  Input,
  ViewChild,
  AfterViewInit,
  ElementRef
} from "@angular/core";
import { Product } from "src/app/models/Product";
import { ProductsService } from "src/app/services/products.service";
import { Observable } from "rxjs";
import { faExclamationTriangle as fasExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";

declare var $: any;
@Component({
  selector: "app-not-in-stock",
  templateUrl: "./not-in-stock.component.html",
  styleUrls: ["./not-in-stock.component.scss"]
})
export class NotInStockComponent implements AfterViewInit {
  product$: Observable<Product>;
  @ViewChild("toast", { static: false }) toast: ElementRef;
  shown: boolean = false;

  @Input() set product(id: number) {
    this.product$ = this.productService.findById(id);
    if (this.shown) {
      $(this.toast.nativeElement).toast("show");
    }
  }

  constructor(private productService: ProductsService, library: FaIconLibrary) {
    library.addIcons(fasExclamationTriangle);
  }

  ngAfterViewInit() {
    $(this.toast.nativeElement).toast("show");
    this.shown = true;
  }
}
