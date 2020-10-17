export default class FF {
  constructor() {
    this._loadFlag = false;
    this._data = false;
  }

  get data() {
    return this._data;
  }

  set data(input) {
    this.input = input;
  }

  set loadFlag(flag) {
    this._loadFlag = flag;
  }

  clock() {
    if (this._loadFlag) this._data = this.input;
  }
}
