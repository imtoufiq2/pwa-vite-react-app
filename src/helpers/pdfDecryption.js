import CryptoJS from "crypto-js";

const AES_KEY = "24@b73#7qc23&4dk"; // Replace with your actual key
const AES_IV = "24@b73#7qc23&4dk"; // Replace with your actual IV

export function getDecryptedPDFForJWT(pdfPath) {
  try {
    // Decode base64
    const base64Decoded = CryptoJS.enc.Base64.parse(pdfPath);

    // Convert to a WordArray
    const encryptedWordArray = CryptoJS.lib.WordArray.create(
      base64Decoded.words
    );
    // Decrypt
    const decryptedBytes = CryptoJS.AES.decrypt(
      { ciphertext: encryptedWordArray },
      CryptoJS.enc.Utf8.parse(AES_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(AES_IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // Convert decrypted bytes to string
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedString;
  } catch (error) {
    console.error("Error during decryption:", error);
    return null; // Handle the error as needed
  }
}
