const sleep = ms => new Promise(res => setTimeout(res, ms));

const clocker = async (func, ms) => {
    while(true) {
        func();
        await sleep(ms);
    }
};

export default clocker;