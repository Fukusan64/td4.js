export const NOT = (x) => !x;
export const AND = (x, y) => x && y;
export const OR = (x, y) => x || y;
export const NAND = (x, y) => NOT(AND(x, y));
export const NOR = (x, y) => NOT(OR(x, y));
export const XOR = (x, y) => x !== y;
