import { Combo } from './combo';
import { ItemCount } from './item-count';
import { Store } from './store';

export class Counter {
  constructor(
    public count: number = 0,
    public points: number = 0,
    public itemCounts: ItemCount[] = [],
    public combo: Combo,
    public store?: Store
  ) {}
}
