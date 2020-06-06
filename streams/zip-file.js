const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const src = fs.createReadStream(
  path.resolve(__dirname, '../resources/bigfile.txt')
);
const dest = fs.createWriteStream(
  path.resolve(__dirname, '../resources/bigfile.txt.gz')
);
const gzipper = zlib.createGzip();

src
  .on('error', (err) => console.error(err))
  .pipe(gzipper)
  .pipe(dest)
  .on('error', (err) => console.error(err));
