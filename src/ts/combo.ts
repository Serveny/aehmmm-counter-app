export class Combo {
  private countDown: number | null = null;
  private comboCount?: HTMLElement;
  private comboBar?: HTMLElement;

  constructor(public percent: number = 0, public bonusMulti: number = 0) {}

  addPointsEl(pointsEl: HTMLElement) {
    const comboRow = document.createElement('p');
    comboRow.classList.add('combo-row');

    this.comboCount = document.createElement('div');
    comboRow.appendChild(this.comboCount);

    this.comboBar = document.createElement('div');
    this.comboBar.classList.add('bar');
    comboRow.appendChild(this.comboBar);
    this.setComboRow();
    pointsEl.appendChild(comboRow);
  }

  progressUp(toAdd: number) {
    this.percent += toAdd;
    if (this.percent > 100) this.percent = 100;
    this.bonusMulti = Math.floor(this.percent / 25) + 1;
    if (this.bonusMulti > 4) this.bonusMulti = 4;
    this.setComboRow();
    this.setComboBar();
    this.addCountDown();
  }

  progressDown(toSub: number): boolean {
    this.percent -= toSub;
    if (this.percent < 0) this.percent = 0;
    this.bonusMulti = Math.floor(this.percent / 25) + 1;
    this.setComboRow();
    this.setComboBar();
    return this.percent !== 0;
  }
  setComboRow() {
    if (this.comboCount)
      this.comboCount.innerHTML = `Combo: <b>${this.bonusMulti}x</b>`;
  }

  setComboBar() {
    if (this.comboBar) {
      const width = this.percent >= 100 ? 100 : (this.percent % 25) * 4;
      this.comboBar.style.width = `${width}%`;
    }
  }

  addCountDown() {
    if (this.countDown == null) {
      this.countDown = setTimeout(() => {
        this.countDown = null;
        if (this.progressDown(0.2 * this.bonusMulti)) {
          this.addCountDown();
        }
      }, 400);
    }
  }
}
