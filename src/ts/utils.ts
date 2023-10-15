import { ItemCount } from './item-count';

export function throwErr(msg: string): never {
  throw new Error(msg);
}

export function elByIdOrErr(id: string): HTMLElement {
  return document.getElementById(id) ?? throwErr(`Element ${id} doesnt exist`);
}

export function sortItemCounts(itemCounts: ItemCount[]) {
  itemCounts.sort((a, b) => (a.itemCount < b.itemCount ? 1 : 0));
  for (const [i, ic] of itemCounts.entries()) {
    ic.setOrder(i);
    ic.setBar();
  }
}
