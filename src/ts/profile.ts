import { Combo, IComboSave } from './combo';
import { IItemCountSave, ItemCount } from './item-count';

export class Profile implements IProfileSave {
  constructor(
    public name: string,
    public count: number = 0,
    public points: number = 0,
    public itemCounts: ItemCount[] = [],
    public combo: Combo
  ) {}
}

export interface IProfileSave {
  name: string;
  count: number;
  points: number;
  itemCounts: IItemCountSave[];
  combo: IComboSave;
}

export class ProfilesSelect {
  el = document.createElement('div');
  openBtnEl = document.createElement('button');
  selectBoxEl = document.createElement('select');

  constructor(profileNames: string[]) {
    this.el.classList.add('profiles-select-box');

    for (const name of profileNames) {
      const option = document.createElement('option');
      option.innerText = name;
      this.selectBoxEl.appendChild(option);
    }
    this.el.append(this.openBtnEl, this.selectBoxEl);
  }
}
