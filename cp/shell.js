const { promisify } = require('util');
const { exec } = require('child_process');
const path = require('path');

const execPromise = promisify(exec);
/**
 * Run shell commands and pipe them
 * @param {string} file -file in the resources dir
 */
async function getUniqueNames(file) {
  const { stdout, stderr } = await execPromise(`cat ${file} | sort | uniq `, {
    cwd: path.resolve(__dirname, '../resources'),
  });
  console.error(stderr);
  return stdout;
}

getUniqueNames('names.txt').then((stdout) => console.log(stdout));
