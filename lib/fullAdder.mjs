import { And, Or, Not } from './Gate.mjs';

const halfAdder = (a, b) => {
  const c = And(a, b);
  const s = And(Or(a, b), Not(c));
  return { s, c };
};

const fullAdderModule = (a, b, x) => {
  const { s: s1, c: c1 } = halfAdder(a, b);
  const { s, c: c2 } = halfAdder(s1, x);
  return { s, c: Or(c1, c2) };
};

const fullAdder = (busA, busB) => {
  const results = [];
  let tmp;

  tmp = halfAdder(busA[0], busB[0]);
  results[0] = tmp.s;
  tmp = fullAdderModule(busA[1], busB[1], tmp.c);
  results[1] = tmp.s;
  tmp = fullAdderModule(busA[2], busB[2], tmp.c);
  results[2] = tmp.s;
  tmp = fullAdderModule(busA[3], busB[3], tmp.c);
  results[3] = tmp.s;

  return { results, carry: tmp.c };
};

export default fullAdder;
