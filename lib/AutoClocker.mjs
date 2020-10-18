const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default class Clocker {
  constructor() {
    this.interval = 0;
    this.task = () => { };
  }

  setTask(task) {
    this.task = task;
  }

  // eslint-disable-next-line class-methods-use-this
  clock() {
    //
  }

  async start() {
    while (true) {
      this.task();
      // eslint-disable-next-line no-await-in-loop
      await sleep(this.interval);
    }
  }
}
