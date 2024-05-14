import CryptoJS from "crypto-js";

const SECRET_KEY = "secret-key";

export const encryptPassword = (password: string) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

export const decryptPassword = (encryptedPassword: string) => {
  return CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
};
