import clocker from './lib/clocker.mjs';
import Pc from './lib/ProgramCounter.mjs';
import Input from './lib/Input.mjs';
import Output from './lib/Output.mjs';
import Register from './lib/Register.mjs';
import Selector from './lib/Selector.mjs';
import FF from './lib/FF.mjs';
import decode from './lib/decode.mjs';
import fullAdder from './lib/fullAdder.mjs';
import ROM from './lib/ROM.mjs';

const pc = new Pc();
const input = new Input();
const output = new Output();
const aregister = new Register();
const bregister = new Register();
const selector = new Selector(aregister, bregister, input, { data: [false, false, false, false] });
const cflag = new FF();
const rom = new ROM();

cflag.loadFlag = true;

// ここはガン無視をキメ込むしかないeslint先輩がtop-level-awaitに対応していない(parsing error)
await rom.init();

clocker(() => {
  // load opCode
  const opCode = rom.read(...pc.data);

  // set load flags
  [
    aregister.loadFlag,
    bregister.loadFlag,
    output.loadFlag,
    pc.loadFlag,
    selector.flagA,
    selector.flagB,
  ] = decode(opCode.slice(0, 4), cflag.data);

  // calculate
  const { results, carry } = fullAdder(selector.output.data, opCode.slice(4));

  // eslint-disable-next-line no-param-reassign
  [aregister, bregister, output, pc].forEach((rg) => { rg.data = results; });
  cflag.data = carry;

  // update programCounter
  pc.update();

  // store calc data
  [
    aregister,
    bregister,
    output,
    pc,
    cflag,
  ].forEach((rg) => { rg.write(); });
}, 1000);
