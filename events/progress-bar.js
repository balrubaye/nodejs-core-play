const EventEmitter = require('events');

// Display progress from 0 => 100 increasing by 20
class ProgressBar extends EventEmitter {
  constructor(percent = 100) {
    super();
    this.percent = percent;
    this.interval = null;
    this.currentValue = 0;
  }

  start() {
    this.emit('start', this.currentValue);
    let self = this;
    this.interval = setInterval(self.progress.bind(this), 200);
  }

  progress() {
    if (this.currentValue < this.percent) {
      this.emit('progress', this.currentValue);
      this.currentValue += 20;
    } else {
      clearInterval(this.interval);
      this.emit('end', this.percent);
    }
  }
}

const progress = new ProgressBar();
progress
  .on('start', (val) => console.log('start at: ', val))
  .on('progress', (val) => console.log('progress => ', val))
  .on('end', (val) => console.log('end : ', val))
  .on('error', () => console.error('oops something is wrong'));

progress.start();
