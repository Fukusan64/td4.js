import FF from './FF.mjs';

export default class Register {
  constructor(size = 4) {
    this.ffs = [];
    for (let i = 0; i < size; i++) {
      this.ffs.push(new FF());
    }
  }

  set data(input) {
    input.forEach((v, i) => {
      this.ffs[i].data = v;
    });
  }

  get data() {
    return this.ffs.map((ff) => ff.data);
  }

  set loadFlag(input) {
    this.ffs.forEach((ff) => {
      // eslint-disable-next-line no-param-reassign
      ff.loadFlag = input;
    });
  }

  clock() {
    this.ffs.forEach((ff) => ff.clock());
  }
}
