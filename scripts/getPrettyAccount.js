const { Keypair } = require("@solana/web3.js");
const { getPrivateKeyBySecretKey } = require("../utils/secretKeyUtils");

let keyPair;

/* 
- 开头几位字符匹配，我们用`^`符号，例如`^0x000`就会匹配以`0x000`开头的地址。
- 最后几位字符匹配，我们用`$`符号，例如`000$`就会匹配以`000`结尾的地址。
- 中间几位我们不关心，可以利用`.*`通配符，例如`^0x000.*000$`就会匹配任何以`0x000`开头并以`000`结尾的地址。
*/
const regex = /^ETH.*$/;
var isValid = false;
while (!isValid) {
  keyPair = Keypair.generate();

  isValid = regex.test(keyPair.publicKey.toString()); // 检验正则表达式
}
// 打印靓号地址与私钥
console.log("publicKey:" + keyPair.publicKey.toString());

console.log("keyPair:" + `[${keyPair.secretKey.join(",")}]`);

console.log("privateKey:" + getPrivateKeyBySecretKey(keyPair.secretKey));
