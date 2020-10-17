import fs from 'fs';
import readline from 'readline';

export default class ROM {
  constructor(bytes = 15) {
    this.data = [];
    this.bytes = bytes;
  }

  init() {
    return new Promise((res, rej) => {
      const rl = readline.createInterface(
        fs.createReadStream('ROM.txt'),
        {},
      );
      rl.on('line', (line) => {
        this.data.push(line);
      });
      rl.on('close', () => {
        if (this.bytes < this.data.length) rej(new Error('too many data'));
        else res();
      });
    });
  }

  read(...address) {
    // TODO: マルチプレクサを実装し使うべき(ic 化されているのでどうでもいいか)
    const addressNum = parseInt(address.map((v) => (v ? '1' : '0')).join(''), 2);
    return this.data[addressNum].split('').map((v) => v === '1');
  }
}
