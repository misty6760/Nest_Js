// 암호화 관련 유틸리티 함수들을 정의하는 모듈입니다.
import * as crypto from 'crypto';
import { buffer } from 'stream/consumers';

// RSA 키 쌍을 생성하는 함수
export const generateRSAKeyPair = (): {
  publicKey: string;
  privateKey: string;
} => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  return { publicKey, privateKey };
};

// AES 암호화 함수
export const encryptAES = (password: string, data: string): string => {
  const key = crypto.createHash('sha256').update(password).digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return `${iv.toString('base64')}:${encrypted}`;
};

// AES 복호화 함수
export const decryptAES = (password: string, encryptedData: string): string => {
  const key = crypto.createHash('sha256').update(password).digest();
  const [ivBase64, encryptedBase64] = encryptedData.split(':');
  const iv = Buffer.from(ivBase64, 'base64');
  const encrypted = Buffer.from(encryptedBase64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = decipher.update(encrypted);
  return Buffer.concat([decrypted, decipher.final()]).toString('utf8');
};

// RSA 공개키 암호화 함수
export const encryptRSA = (publicKey: string, data: string): string => {
  const buffer = Buffer.from(data, 'utf-8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};

// RSA 개인키 복호화 함수
export const decryptRSA = (
  privateKey: string,
  encryptedData: string,
): string => {
  const buffer = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf-8');
};

// RSA 서명 생성 함수
export const signRSA = (privateKey: string, data: string): string => {
  const signer = crypto.createSign('SHA256');
  signer.update(data);
  signer.end();
  const signature = signer.sign(privateKey, 'base64');
  return signature;
};

// RSA 서명 검증 함수
export const verifyRSASignature = (
  publicKey: string,
  data: string,
  signature: string,
): boolean => {
  const verifier = crypto.createVerify('SHA256');
  verifier.update(data);
  verifier.end();
  return verifier.verify(publicKey, signature, 'base64');
};

// 하이브리드 암호화 함수 (RSA + AES)
export const hybridEncrypt = (
  rsaPublicKey: string,
  plaintext: string,
): string => {
  const aesKey = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const algorithm = 'aes-256-cbc';

  const cipher = crypto.createCipheriv(algorithm, aesKey, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  const encryptedKey = crypto.publicEncrypt(
    {
      key: rsaPublicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    aesKey,
  );

  const payload = {
    iv: iv.toString('base64'),
    ciphertext: encrypted,
    encryptedKey: encryptedKey.toString('base64'),
  };

  return Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
};

// 하이브리드 복호화 함수 (RSA + AES)
export const hybridDecrypt = (
  rsaPrivateKey: string,
  encryptedData: string,
): string => {
  const algorithm = 'aes-256-cbc';

  const decoded = Buffer.from(encryptedData, 'base64').toString('utf-8');
  const { iv, ciphertext, encryptedKey } = JSON.parse(decoded);

  const aesKey = crypto.privateDecrypt(
    {
      key: rsaPrivateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedKey, 'base64'),
  );

  const decipher = crypto.createDecipheriv(
    algorithm,
    aesKey,
    Buffer.from(iv, 'base64'),
  );

  const decrypted =
    decipher.update(ciphertext, 'base64', 'utf8') + decipher.final('utf8');

  return decrypted;
};
