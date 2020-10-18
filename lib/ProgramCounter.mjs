import fullAdder from './fullAdder.mjs';
import Register from './Register.mjs';

export default class ProgramCounter extends Register {
  update() {
    const { results } = fullAdder(this.data, [true, false, false, false]);
    // eslint-disable-next-line no-underscore-dangle
    results.forEach((e, i) => { this.ffs[i]._data = e; });
  }
}
