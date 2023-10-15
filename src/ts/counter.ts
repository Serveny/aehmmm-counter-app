import { Combo } from './combo';
import { ItemCount } from './item-count';

export class Counter {
  constructor(
    public count: number = 0,
    public points: number = 0,
    public itemCounts: ItemCount[] = [],
    public combo: Combo
  ) {}
}
