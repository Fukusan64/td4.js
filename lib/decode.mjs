import { AND, OR, NOT } from './gate.mjs';

/* decoder output
0: selector.flagB,
1: selector.flagA,
2: aregister.loadFlag,(本と出力値が逆なので注意) load0
3: bregister.loadFlag,(本と出力値が逆なので注意) load1
4: output.loadFlag,(本と出力値が逆なので注意) load2
5: pc.loadFlag,(本と出力値が逆なので注意) load3
*/

/* decoder input
([op3, op2, op1, op0], cflag)
*/

const decode = (opcode, carry) => {
  const [op3, op2, op1, op0] = opcode;

  const nOp2 = NOT(op2);

  const loadA = NOT(OR(op3, op2));
  const loadB = NOT(OR(nOp2, op3));
  const loadOut = AND(nOp2, op3);
  const loadPC = AND(OR(NOT(carry), op0), AND(op2, op3));
  const selectA = OR(op0, op3);
  const selectB = op1;
  return [selectB, selectA, loadA, loadB, loadOut, loadPC];
};
export default decode;
