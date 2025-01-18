import { Profile } from './profile';
import { elByIdOrErr, sortItemCounts, throwErr } from './utils';

export interface IItemCountSave {
  pointsUp: number;
  itemCount: number;
}

export class ItemCount implements IItemCountSave {
  pointsUp: number;
  itemCount: number;
  pointsEl = elByIdOrErr('points');
  countEl = elByIdOrErr('count');
  itemCountRow = document.createElement('p');
  itemCountEl = document.createElement('span');
  itemPointsBar = document.createElement('div');
  constructor(
    private menuItemEl: HTMLElement,
    itemPointsCon: HTMLElement,
    private counter: Profile
  ) {
    this.pointsUp = parseInt(
      this.menuItemEl.getAttribute('data-points') ??
        throwErr('data-points doesnt exist')
    );
    this.itemCount = 0;

    this.itemCountRow.classList.add('item-points-row');
    this.itemCountEl.innerText = '0';
    this.itemCountRow.innerText = `${
      (this.menuItemEl.children[0] as HTMLElement).innerText
    }'s: `;
    this.itemCountRow.appendChild(this.itemCountEl);
    itemPointsCon.append(this.itemCountRow);

    this.itemPointsBar.classList.add('bar');
    this.itemCountRow.append(this.itemPointsBar);

    menuItemEl.onclick = () => this.countUp();
  }

  countUp() {
    this.countEl.innerText = (++this.counter.count).toString();
    this.itemCountEl.innerText = (++this.itemCount).toString();
    this.counter.points += this.pointsUp * this.counter.combo.bonusMulti;

    this.pointsEl.innerText = this.counter.points.toString();
    this.counter.combo.progressUp(this.pointsUp * 2);
    sortItemCounts(this.counter.itemCounts);
    this.setBar();
  }

  setOrder(i: number) {
    this.itemCountRow.style.order = i.toString();
  }

  setBar() {
    this.itemPointsBar.style.width = `${
      (this.itemCount / this.counter.count) * 100
    }%`;
  }
}
