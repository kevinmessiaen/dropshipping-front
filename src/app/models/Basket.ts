import {isDefined} from "@angular/compiler/src/util";

export class Basket {
  id: string;
  products: Map<number, number>;
  items: number;
  price: number;
}

export class BasketDto {
  id: string;
  products: Object;
  items: number;
  price: number;
}

export function parseBasket(dto: BasketDto): Basket {
  let map: Map<number, number> = new Map();

  if (isDefined(dto.products)) {
    Object.entries(dto.products).forEach(k => {
      map.set(parseInt(k[0]), k[1]);
    });
  }

  return {
    id: dto.id,
    products: map,
    items: dto.items,
    price: dto.price
  };
}

export function mapBasket(basket: Basket): BasketDto {
  let products = {};
  if (isDefined(basket.products)) {
    basket.products.forEach((v, k) => (products[k] = v));
  }
  return {
    id: basket.id,
    products: products,
    items: null,
    price: null
  };
}
