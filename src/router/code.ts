import express from 'express'
import config from './../utils/config'
import { decode, encode } from './../utils/encryption'
import type { encodeType, decodeType } from './../types/req'
const router = express.Router()

// 加密接口
router.post('/encode', (req: encodeType, res) => {
  // 必须有参数
  if (!req || !req.body || !req.body.text) {
    return res.send({
      status: 400,
      msg: '请提供参数'
    })
  }
  // 加密
  const finishcode = encode(req.body.text)
  res.send({
    status: 200,
    msg: '加密成功！',
    text: finishcode.default,
    safe: finishcode.safe,
    lite: finishcode.lite
  })
})

// 解密接口
router.post('/decode', (req: decodeType, res) => {
  // 必须有参数
  if (!req || !req.body || !req.body.text) {
    return res.send({
      status: 400,
      msg: '请提供参数'
    })
  }
  // 解密
  const finishcode = decode(req.body.text)
  if (finishcode === -1) {
    return res.send({
      status: 405,
      msg: `解密失败，这不是有效的${config.before_encode}！`
    })
  }
  return res.send({
    status: 200,
    msg: '解密成功！',
    text: finishcode
  })
})

export default router
