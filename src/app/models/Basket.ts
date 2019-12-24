import { isDefined } from "@angular/compiler/src/util";

export class Basket {
  id: string;
  products: Map<number, number>;
  notInStock: Map<number, number>;
  items: number;
  price: number;
}

export class BasketDto {
  id: string;
  products: Object;
  notInStock: Object;
  items: number;
  price: number;
}

export function parseBasket(dto: BasketDto): Basket {
  return {
    id: dto.id,
    products: parseMap(dto.products),
    notInStock: parseMap(dto.notInStock),
    items: !isDefined(dto.items) ? 0 : dto.items,
    price: !isDefined(dto.price) ? 0.0 : dto.price
  };
}

function parseMap(object: Object): Map<number, number> {
  let map: Map<number, number> = new Map();

  if (isDefined(object)) {
    Object.entries(object).forEach(k => {
      map.set(parseInt(k[0]), k[1]);
    });
  }

  return map;
}

export function mapBasket(basket: Basket): BasketDto {
  return {
    id: basket.id,
    products: mapMap(basket.products),
    notInStock: mapMap(basket.notInStock),
    items: null,
    price: null
  };
}

function mapMap(map: Map<number, number>): Object {
  let object: Object = {};

  if (isDefined(map)) {
    map.forEach((v, k) => (object[k] = v));
  }

  return object;
}
