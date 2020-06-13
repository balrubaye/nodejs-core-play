const fs = require('fs');
const path = require('path');

const rdr = fs.createReadStream(
  path.resolve(__dirname, '../resources/file1.txt')
);
const dest = process.stdout;

/**
 * Merging Streams
 * which involve piping a set of readable streams into one writable streams
 * @param {Array} sources
 * @param {WritableStream} destination
 * @param {function} done
 */
function mergeStreams(sources, destination, done) {
  const len = sources.length;
  let cur = 0;
  sources.forEach((src) => {
    src
      .on('end', () => {
        cur++;
        if (cur === len) {
          destination.end(null, done);
        }
      })
      .pipe(destination, { end: false });
  });

  return destination;
}

//dest.on('finish', () => console.log('finiiiiiii'));
mergeStreams([process.stdin, rdr], dest, () =>
  console.log('everything is done')
);
