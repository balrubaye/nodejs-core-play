/**
 * Piping external applications to process text file
 */
const { spawn } = require('child_process');
const path = require('path');

const cat = spawn('cat', ['names.txt'], {
  cwd: path.resolve(__dirname, '../resources'),
});
const sort = spawn('sort');
const uniq = spawn('uniq');

cat.on('error', (err) => console.error(err));
cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);
