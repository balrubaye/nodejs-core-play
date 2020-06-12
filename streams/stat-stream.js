const { Readable } = require('stream');
const util = require('util');

class StatStream extends Readable {
  constructor(options = {}) {
    super(options);
    this.limit = 0;
  }
  _read(size) {
    if (this.limit < 10) {
      let chunk = this.objectMode
        ? process.memoryUsage()
        : util.inspect(process.memoryUsage());
      this.push(chunk);
      this.push('\n');
      this.limit++;
    } else {
      this.push(null);
    }
  }
}

const statsStream = new StatStream({ encoding: 'utf8', objectMode: false });

statsStream
  .on('readable', () => {
    let chunk;
    while ((chunk = statsStream.read())) {
      console.log(chunk);
    }
  })
  .on('end', () => console.log('End of streaming'))
  .on('error', (err) => console.error(err));
