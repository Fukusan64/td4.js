import { print } from './console.mjs';

export default class Clocker {
  constructor() {
    this.task = () => { };
  }

  setTask(task) {
    this.task = task;
  }

  clock() {
    this.task();
  }

  // eslint-disable-next-line class-methods-use-this
  start() {
    print('press [space] to clock');
  }
}
