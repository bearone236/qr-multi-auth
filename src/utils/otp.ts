import QRCode from "qrcode";
import CryptoJS from "crypto-js";

const SECRET_KEY = "secret-key";

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (encryptedData: string) => {
  return CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
};

export const generateQRCode = async (authCode: string) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const data = JSON.stringify({ authCode, timestamp });
    const encryptedData = encryptData(data);
    return await QRCode.toDataURL(encryptedData);
  } catch (err) {
    console.error(err);
  }
};
