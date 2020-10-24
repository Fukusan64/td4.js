import Register from './Register.mjs';

export default class Input extends Register {
  toggle(num) {
    // eslint-disable-next-line no-underscore-dangle
    this.ffs[num]._data = !this.ffs[num]._data;
  }
}
