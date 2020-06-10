const crypto = require('crypto');
const fs = require('fs');

const file = process.argv[2] || __filename;
const rdr = fs.createReadStream(file);
const hash = crypto.createHash('sha256');
hash.setEncoding('hex');

console.log(`SHASUM256 for the file: ${file} `);
rdr
  .on('error', (err) => console.error(err))
  .pipe(hash)
  .pipe(process.stdout)
  .on('error', (err) => console.error(err));
