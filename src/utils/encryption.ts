import { decrypt, encrypt } from './crypt'
import { valuesDecode, valuesEncode } from './socialistCoreValues'
import addRandomElements from './randomElements'
import { toBase64, toStr } from './base64'
import config from './config'

// 加密
export const encode = (text: string) => {
  const encry = encrypt(text, config.key)
  const encrys = valuesEncode(encry, config.encode_value)
  const encryss = addRandomElements(encrys, config.encode_words)
  const safe = toBase64(encryss)
  return {
    default: `${config.before_encode}-${encryss}`,
    safe: `${config.before_encode}-${safe}`
  }
}

// 解密
export const decode = (text: string): -1 | string => {
  // 处理前面
  const before = config.before_encode + '-'
  if (text.startsWith(before)) {
    text = text.substring(before.length)
  } else {
    return -1
  }
  // 处理base64
  if (toStr(text) !== -1) {
    text = toStr(text) as string
  }
  try {
    const decry = valuesDecode(text, config.encode_value)
    const dectys = decrypt(decry, config.key)
    return dectys
  } catch (error) {
    return -1
  }
}
