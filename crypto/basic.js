const crypto = require('crypto');

const msg = 'This message is clear text that can be hashed';

console.log(
  'List of supported hashes : \n',
  crypto.getHashes().join(', '),
  '\n'
);

/**
 * Hashing
 * @param {*} msg
 * @param {*} hashingAlgorithm
 * @param {*} encoding
 */
const getHashMsg = (msg = '', hashingAlgorithm, encoding) => {
  const algorithm = hashingAlgorithm || 'sha1';
  const hash = crypto.createHash(algorithm);
  const digest = encoding || 'hex';
  hash.update(msg);
  return hash.digest(digest);
};

console.log('--hashing sha1--');
console.log('original message: ', msg);
console.log('hashed hex message: ', getHashMsg(msg));
console.log('hashed base64 message: ', getHashMsg(msg, null, 'base64'));
//console.log('hashed binary message: ', getHashMsg(msg, null, 'binary'));

/**
 * HMAC combines the hashing algorithms with a
 * cryptographic key in order to stop a number of attacks on the integrity of the signature
 * @param {*} msg
 * @param {*} hashingAlgorithm
 * @param {*} encoding
 */
const getHmacMsg = (msg, hashingAlgorithm, encoding) => {
  const algorithm = hashingAlgorithm || 'sha1';
  const key = 'very secure key';
  const hmac = crypto.createHmac(algorithm, key);
  const digest = encoding || 'hex';

  hmac.update(msg);
  return hmac.digest(digest);
};

console.log('---Hmac sha1');
console.log('original message: ', msg);
console.log('hashed message with key: ', getHmacMsg(msg));

console.log('List of ciphers: \n', crypto.getCiphers().join(', '), '\n');

/**
 * Cryptography
 *
 * @param {*} msg
 * @param {*} algorithm
 */
const getCipherMsg = (msg, algorithm) => {
  const algo = algorithm || 'aes-128-cbc';
  const password = 'very secure key';
  const cipher = crypto.createCipher(algo, password);
  cipher.update(msg);
  return cipher.final('hex');
};

console.log('--Cryptography');
console.log('original message : ', msg);
console.log('ciphered message: ', getCipherMsg(msg));
