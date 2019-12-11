export class Category {
  id: number;
  name: string;
  desc: string;
  path: string;
  parent: number;
  children: number[];
  level: number;
}
