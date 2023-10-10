import { sm2 } from "sm-crypto";
const publicKey =
  "04637a8ffdc221b8c9ebee1b4b751c1a9b26fa7399d6b09edd88ce2bc09676da7d93974ea2bd7310e2bc766ce3dcd51d1804d9a7b3d3bc11dd72c533064dd3ab8e";
const privateKey =
  "68253cea63d6451d834252ef7c1f55c497435ec35217643f6ffffeb08216e9cf";

export default {
  encryptSM: function (text) {
    let encrypted = sm2.doEncrypt(text, publicKey);
    encrypted = "04" + encrypted;
    return encrypted;
  },
  decryptSM: function (text) {
    const decrypted = sm2.doDecrypt(text.substring(2), privateKey);
    return decrypted;
  },
};
