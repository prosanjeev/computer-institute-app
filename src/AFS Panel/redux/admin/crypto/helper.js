import CryptoJS from 'crypto-js';

const SECRET_KEY = 'dlksfjldsfpodiflkf'; // Use a secure key

export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
    if (!encryptedData) {
      return null; // or handle the case where encryptedData is null
    }
  
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };
  