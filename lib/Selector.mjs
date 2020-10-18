export default class Selector {
  constructor(...sources) {
    Object.assign(this, { sources });
    this.flagA = false;
    this.flagB = false;
  }

  get output() {
    const selectedSourceId = parseInt(
      [this.flagB, this.flagA].map((flag) => (flag ? '1' : '0')).join(''),
      2,
    );
    return this.sources[selectedSourceId];
  }
}
