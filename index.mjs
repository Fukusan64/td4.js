import keypress from 'keypress';
import dotenv from 'dotenv';

import AutoClocker from './lib/AutoClocker.mjs';
import ManualClocker from './lib/ManualClocker.mjs';
import Pc from './lib/ProgramCounter.mjs';
import Input from './lib/Input.mjs';
import Register from './lib/Register.mjs';
import Selector from './lib/Selector.mjs';
import FF from './lib/FF.mjs';
import decode from './lib/decode.mjs';
import fullAdder from './lib/fullAdder.mjs';
import ROM from './lib/ROM.mjs';
import { print, clearConsole } from './lib/console.mjs';
dotenv.config();

const pc = new Pc();
const input = new Input();
const output = new Register();
const aregister = new Register();
const bregister = new Register();
const selector = new Selector(aregister, bregister, input, { data: [false, false, false, false] });
const cflag = new FF();
const rom = new ROM();
const clocker = process.env.CLOCKER === 'manual' ?
  new ManualClocker() :
  new AutoClocker()
;

clocker.interval = parseInt(process.env.CLOCKER_INTERVAL ?? 1000);

// set clock event
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', (ch, key) => {
  if (key?.name === 'space') clocker.clock();
  if (ch === '1') input.toggle(0);
  if (ch === '2') input.toggle(1);
  if (ch === '3') input.toggle(2);
  if (ch === '4') input.toggle(3);

  if (key?.ctrl && (key?.name === 'c' || key?.name === 'd')) {
    process.stdin.pause();
    process.exit(0);
  }
});
process.stdin.setRawMode(true);
process.stdin.resume();

////////////////////////////////////////////////////////////////////////////////
cflag.loadFlag = true;
await rom.init();

clocker.setTask(() => {
  clearConsole();
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
  // output input status
  print(
    'addres: ',
    pc.data.map(e => e ? '1' : '0').join(','),
    parseInt(
      pc.data
        .reverse()
        .map((e) => e ? '1' : '0' )
        .join(''),
      2,
    ),
  );
  print(
    'opcode: ',
    opCode.map(e => e ? '1' : '0').join(','),
  )
  print(
    'input : ',
    input.data.map(e => e ? '1' : '0').join(','),
    parseInt(
      input.data
        .reverse()
        .map((e) => e ? '1' : '0' )
        .join(''),
      2,
    ),
  );
  // calculate
  const { results, carry } = fullAdder(selector.output.data, opCode.slice(4));

  // eslint-disable-next-line no-param-reassign
  [aregister, bregister, output, pc].forEach((rg) => rg.data = results);
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
  ].forEach((rg) => rg.write());
  print(
    'output: ',
    output.data.map(e => e ? '1' : '0').join(','),
    parseInt(
      output.data
        .reverse()
        .map((e) => e ? '1' : '0' )
        .join(''),
      2,
    ),
  );
});

clocker.start();
