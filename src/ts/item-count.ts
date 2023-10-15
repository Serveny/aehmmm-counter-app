import { Counter } from './counter';
import { elByIdOrErr, sortItemCounts, throwErr } from './utils';

export class ItemCount {
  pointsUp: number;
  itemCount: number;
  pointsEl: HTMLElement;
  countEl: HTMLElement;
  itemCountRow: HTMLElement;
  itemCountEl: HTMLElement;
  itemPointsBar: HTMLElement;
  constructor(
    private menuItemEl: HTMLElement,
    itemPointsCon: HTMLElement,
    private counter: Counter
  ) {
    this.pointsUp = parseInt(
      this.menuItemEl.getAttribute('data-points') ??
        throwErr('data-points doesnt exist')
    );
    this.itemCount = 0;
    this.pointsEl = elByIdOrErr('points');
    this.countEl = elByIdOrErr('count');

    this.itemCountRow = document.createElement('p');
    this.itemCountRow.classList.add('item-points-row');
    this.itemCountEl = document.createElement('span');
    this.itemCountEl.innerText = '0';
    this.itemCountRow.innerText = `${
      (this.menuItemEl.children[0] as HTMLElement).innerText
    }'s: `;
    this.itemCountRow.appendChild(this.itemCountEl);
    itemPointsCon.append(this.itemCountRow);

    this.itemPointsBar = document.createElement('div');
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
