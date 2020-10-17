export const Not = (x) => !x;
export const And = (x, y) => x && y;
export const Or = (x, y) => x || y;
export const Nand = (x, y) => Not(And(x, y));
export const Nor = (x, y) => Not(Or(x, y));
export const Xor = (x, y) => x !== y;

const a = [
  [false, false],
    [true, false],
    [false, true],
    [true, true],
];

if(a == a) {

}
