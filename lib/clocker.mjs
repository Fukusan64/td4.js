const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const clocker = async (func, ms) => {
  while (true) {
    func();
    // eslint-disable-next-line no-await-in-loop
    await sleep(ms);
  }
};

export default clocker;
