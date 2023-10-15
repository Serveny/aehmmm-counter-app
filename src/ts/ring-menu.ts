export function initRingMenu(menuEl: HTMLElement) {
  const items = menuEl.children;
  const n = items.length;

  // add points circle
  const pointsEl = document.createElement('div');
  pointsEl.classList.add('ring-menu-middle');
  menuEl.appendChild(pointsEl);

  for (let i = 0; i < n; i++) {
    const item = items.item(i) as HTMLElement;
    if (item) addMenuItem(item, n, i);
  }
}

function addMenuItem(el: HTMLElement, n: number, i: number) {
  const rotation = 360 / n;
  el.style.transform = `rotate(${rotation * i}deg)`;
  const x = 180 / n;
  el.style.clipPath = `polygon(50% 0%, ${50 - x}% 100%, ${50 + x}% 100%)`;

  // Rotate text against
  const textEl = document.createElement('span');
  textEl.innerText = el.innerText;
  textEl.style.transform = `rotate(-${rotation * i}deg)`;
  el.innerHTML = '';
  el.appendChild(textEl);
}
