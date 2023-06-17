import * as CryptoJS from 'crypto-js'

// 编码为 Base64
export const toBase64 = (str: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
}

// 解码为原始字符串
export const toStr = (str: string) => {
  try {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(str))
  } catch (error) {
    return -1
  }
}
