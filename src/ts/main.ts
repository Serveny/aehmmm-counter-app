//import { invoke } from '@tauri-apps/api/tauri';
import { initRingMenu } from './ring-menu';
import { ItemCount } from './item-count';
import { Combo } from './combo';
import { throwErr } from './utils';
import { Profile, ProfilesSelect } from './profile';
import { Store } from './store';

const counter = new Profile('default', 0, 0, [], new Combo(0, 0));

window.addEventListener('load', async () => {
  const profiles = Store.loadProfileNames();
  document.body.appendChild(new ProfilesSelect(profiles).el);
  const menuEl = document.getElementsByClassName('ring-menu')[0] as HTMLElement;
  initRingMenu(menuEl);
  addPointsCounter(menuEl);
  addComboEl(menuEl);
});

function addPointsCounter(menuEl: HTMLElement) {
  const menuMiddleEl = menuEl.getElementsByClassName('ring-menu-middle')[0];
  menuMiddleEl.innerHTML +=
    '<h5>Count: <span id="count">0</span></h5>' +
    '<h4>Points: <span id="points">0</span></h4>';
  const itemPointsCon = document.createElement('div');
  itemPointsCon.classList.add('item-points-container');
  menuMiddleEl.appendChild(itemPointsCon);

  for (const menuItemEl of menuEl.getElementsByTagName('li')) {
    counter.itemCounts.push(new ItemCount(menuItemEl, itemPointsCon, counter));
  }
}

function addComboEl(menuEl: HTMLElement) {
  const menuMiddleEl =
    (menuEl.getElementsByClassName('ring-menu-middle')[0] as HTMLElement) ??
    throwErr('No ring-menu-middle element');
  counter.combo.addPointsEl(menuMiddleEl);
}
