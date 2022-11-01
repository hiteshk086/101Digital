var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');

const generateKeyAndIv = () => {
  const PBKDF2_PASSPHRASE = 'oajoicj90978bh2t5415vbvghxcgfVVVJJJ';
  const PBKDF2_SALT = 'kajhajhv5hbb442420826424';
  const PBKDF2_ITERATIONS = '128';
  const bytes = CryptoJS.PBKDF2(PBKDF2_PASSPHRASE, PBKDF2_SALT, {
    keySize: 48,
    iterations: Number(PBKDF2_ITERATIONS),
  });
  const iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
  const key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));
  return {key, iv};
};
export const enc = (plain: string) => {
  const {key, iv} = generateKeyAndIv();
  const ciphertext = CryptoJS.AES.encrypt(plain, key, {iv: iv});
  return ciphertext.toString();
};
export const dec = (cipher: string) => {
  const {key, iv} = generateKeyAndIv();
  const decryptedText = AES.decrypt(cipher, key, {iv: iv});
  return decryptedText.toString(CryptoJS.enc.Utf8);
};
export const encryptRequestData = (data: any, keys: string[]) => {
  const encryptedData = data;
  Object.keys(data)
    ?.filter(dataKey => keys.includes(dataKey))
    ?.map(k => (encryptedData[k] = enc(data[k])));

  return encryptedData;
};
