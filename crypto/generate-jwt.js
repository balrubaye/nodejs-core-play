const crypto = require('crypto');

const encodeBase64Url = (str) => {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const hmac = crypto.createHmac('sha256', encodeBase64Url('secret'));
// JWT => HHHH.PPPPP.SSSSS
const header = {
  alg: 'HS256',
  typ: 'JWT',
};

const payload = {
  sub: '11223344',
  name: 'John Doe',
  admin: true,
};

/**
 * Generate a signed JWT from payload and header Objects the token is sign using HMAC sha256
 * @param {Object} header jwt header object
 * @param {Object} payload  jwt payload object
 * @param {crypto.hmac} hmac HMAC
 */
const generateJWT = (header, payload, hmac) => {
  const encodedHeader = encodeBase64Url(JSON.stringify(header));
  console.log('Header: ', encodedHeader);
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  console.log('payload : ', encodedPayload);
  const signature = hmac.update(`${encodedHeader}.${encodedPayload}`).digest();
  console.log('signature: ', signature);
  const encodedSignature = encodeBase64Url(signature);

  const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  return jwt;
};

console.log('jwt :', generateJWT(header, payload, hmac));
