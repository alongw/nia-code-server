const assert = (...express: (boolean | string)[]): void => {
  const l = express.length
  const msg = typeof express[l - 1] === 'string' ? express[l - 1] : 'Assert Error'
  for (let b of express) {
    if (!b) {
      throw new Error(msg as any)
    }
  }
}

const randBin = (): boolean => {
  return Math.random() >= 0.5
}

const str2utf8 = (str: string): string => {
  const notEncoded = /[A-Za-z0-9\-\_\.\!\~\*\'\(\)]/g
  const str1 = str.replace(notEncoded, (c) => c.codePointAt(0)!.toString(16))
  let str2 = encodeURIComponent(str1)
  const concated = str2.replace(/%/g, '').toUpperCase()
  return concated
}

const utf82str = (utfs: string): string => {
  assert(typeof utfs === 'string', 'utfs Error')

  const l = utfs.length

  assert((l & 1) === 0)

  const splited = []

  for (let i = 0; i < l; i++) {
    if ((i & 1) === 0) {
      splited.push('%')
    }
    splited.push(utfs[i])
  }

  return decodeURIComponent(splited.join(''))
}

const hex2duo = (hexs: string): number[] => {
  assert(typeof hexs === 'string')

  const duo: number[] = []

  for (let c of hexs) {
    const n = Number.parseInt(c, 16)
    if (n < 10) {
      duo.push(n)
    } else {
      if (randBin()) {
        duo.push(10)
        duo.push(n - 10)
      } else {
        duo.push(11)
        duo.push(n - 6)
      }
    }
  }
  return duo
}

const duo2hex = (duo: number[]): string => {
  assert(Array.isArray(duo))

  const hex: number[] = []

  const l = duo.length

  let i = 0

  while (i < l) {
    if (duo[i] < 10) {
      hex.push(duo[i])
    } else {
      if (duo[i] === 10) {
        i++
        hex.push(duo[i] + 10)
      } else {
        i++
        hex.push(duo[i] + 6)
      }
    }
    i++
  }
  return hex.map((v) => v.toString(16).toUpperCase()).join('')
}

const duo2values = (duo: number[], encodeValue: string): string => {
  return duo.map((d) => encodeValue[2 * d] + encodeValue[2 * d + 1]).join('')
}

export const valuesEncode = (str: string, encodeValue: string): string => {
  return duo2values(hex2duo(str2utf8(str)), encodeValue)
}

export const valuesDecode = (encoded: string, encodeValue: string): string => {
  const duo: number[] = []

  for (let c of encoded) {
    const i = encodeValue.indexOf(c)
    if (i === -1) {
      continue
    } else if (i % 2 !== 0) {
      continue
    } else {
      duo.push(i / 2)
    }
  }

  const hexs = duo2hex(duo)

  assert((hexs.length & 1) === 0)

  let decoded: string
  try {
    decoded = utf82str(hexs)
  } catch (e) {
    throw e
  }
  return decoded
}
