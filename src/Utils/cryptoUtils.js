// import sodium from 'libsodium-wrappers';

// // Get the encryption key from environment variables
// const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

// export const encryptData = async (data) => {
//   await sodium.ready;
//   const keyBytes = sodium.from_string(ENCRYPTION_KEY);
//   const dataBytes = sodium.from_string(data);
//   const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
//   const encryptedBytes = sodium.crypto_secretbox_easy(dataBytes, nonce, keyBytes);
//   return sodium.to_base64(nonce) + ':' + sodium.to_base64(encryptedBytes);
// };

// export const decryptData = async (encryptedData) => {
//   await sodium.ready;
//   const [nonce64, encrypted64] = encryptedData.split(':');
//   const nonce = sodium.from_base64(nonce64);
//   const encryptedBytes = sodium.from_base64(encrypted64);
//   const keyBytes = sodium.from_string(ENCRYPTION_KEY);
//   const decryptedBytes = sodium.crypto_secretbox_open_easy(encryptedBytes, nonce, keyBytes);
//   return sodium.to_string(decryptedBytes);
// };


import sodium from 'libsodium-wrappers';

// Get the encryption key from environment variables
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

export const encryptData = async (data) => {
  await sodium.ready;

  // Convert base64-encoded key to bytes
  const keyBytes = sodium.from_base64(ENCRYPTION_KEY);
  
  // Ensure key length is 32 bytes
  if (keyBytes.length !== sodium.crypto_secretbox_KEYBYTES) {
    throw new Error('Invalid key length');
  }

  // const dataBytes = sodium.from_string(data);
  // Convert the object to a JSON string
  const dataString = JSON.stringify(data);
  const dataBytes = sodium.from_string(dataString);
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
  const encryptedBytes = sodium.crypto_secretbox_easy(dataBytes, nonce, keyBytes);
  return sodium.to_base64(nonce) + ':' + sodium.to_base64(encryptedBytes);
};

/*
export const decryptData = async (encryptedData) => {
  await sodium.ready;

  // Convert base64-encoded key to bytes
  const keyBytes = sodium.from_base64(ENCRYPTION_KEY);
  
  // Ensure key length is 32 bytes
  if (keyBytes.length !== sodium.crypto_secretbox_KEYBYTES) {
    throw new Error('Invalid key length');
  }

  const [nonce64, encrypted64] = encryptedData.split(':');
  const nonce = sodium.from_base64(nonce64);
  const encryptedBytes = sodium.from_base64(encrypted64);
  const decryptedBytes = sodium.crypto_secretbox_open_easy(encryptedBytes, nonce, keyBytes);
  console.log(sodium.to_string(decryptedBytes))
  return sodium.to_string(decryptedBytes);
};
*/

export const decryptData = async (encryptedData) => {
  await sodium.ready;

  // Convert base64-encoded key to bytes
  const keyBytes = sodium.from_base64(ENCRYPTION_KEY);
  
  // Ensure key length is 32 bytes
  if (keyBytes.length !== sodium.crypto_secretbox_KEYBYTES) {
    throw new Error('Invalid key length');
  }

  const [nonce64, encrypted64] = encryptedData.split(':');
  const nonce = sodium.from_base64(nonce64);
  const encryptedBytes = sodium.from_base64(encrypted64);
  const decryptedBytes = sodium.crypto_secretbox_open_easy(encryptedBytes, nonce, keyBytes);

  // Convert decrypted bytes to string and parse it as JSON
  const decryptedString = sodium.to_string(decryptedBytes);
  try {
    const decryptedObject = JSON.parse(decryptedString);
    return decryptedObject;
  } catch (error) {
    console.error('Failed to parse decrypted string:', error);
    throw new Error('Decryption failed');
  }
};
