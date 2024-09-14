import CryptoJS from "crypto-js";


// const AES_KEY = import.meta.env.VITE_AES_KEY;
// const AES_IV = import.meta.env.VITE_AES_IV;
const AES_KEY = "24@b73#7qc23&4dk"; // Replace with your actual key
const AES_IV = "24@b73#7qc23&4dk"; // Replace with your actual IV

const decryptData = (encryptedData) => {
    const key = CryptoJS.enc.Utf8.parse(AES_KEY);
    const iv = CryptoJS.enc.Utf8.parse(AES_IV);
    const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  export default decryptData