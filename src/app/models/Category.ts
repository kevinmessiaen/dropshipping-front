import { isDefined } from "@angular/compiler/src/util";

export class Category {
  id: number;
  name: string;
  desc: string;
  path: string;
  parent: number;
  children: number[];
  level: number;
}

export class CategoryTree {
  data: Category;
  parent: CategoryTree;
  children: CategoryTree[];
}

export function buildTree(categories: Category[]): CategoryTree[] {
  return categories
    .filter(c => !isDefined(c.parent))
    .map(c => buildFromParent(null, c, categories));
}

function buildFromParent(
  parent: CategoryTree,
  categoryChild: Category,
  categories: Category[]
): CategoryTree {
  let node: CategoryTree = {
    data: categoryChild,
    parent: parent,
    children: null
  };
  node.children = categories
    .filter(c => c.parent === categoryChild.id)
    .map(c => buildFromParent(node, c, categories));
  return node;
}

export function findPath(path: string, categories: CategoryTree[]): Category[] {
  if (!isDefined(categories) || categories.length === 0) return null;
  let cur: CategoryTree = categories.find(c => c.data.path === path);
  if (isDefined(cur)) return [cur.data];
  return categories
    .map(c => {
      let found = findPath(path, c.children);
      if (isDefined(found)) {
        found.unshift(c.data);
        return found;
      } else {
        return null;
      }
    })
    .find(c => isDefined(c));
}

export function findDeepChildren(id: number, tree: CategoryTree[]): number[] {
  let root = findById(id, tree);
  if (!isDefined(root)) return [];
  return fetchDeepChildren(root);
}

function fetchDeepChildren(tree: CategoryTree): number[] {
  let ids: number[] = [tree.data.id];
  if (isDefined(tree.children) && tree.children.length > 0)
    tree.children.forEach(c =>
      fetchDeepChildren(c).forEach(id => ids.push(id))
    );
  return ids;
}

function findById(id: number, tree: CategoryTree[]): CategoryTree {
  if (!isDefined(tree) || tree.length === 0) return null;

  let cur: CategoryTree = tree.find(c => c.data.id === id);
  if (isDefined(cur)) return cur;
  return tree.map(node => findById(id, node.children)).find(c => isDefined(c));
}
