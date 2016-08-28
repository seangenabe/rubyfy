module.exports = class Parser {

  constructor(opts = {}) {
    Object.assign(this, opts, {
      openRt: '（', // fullwidth left parenthesis
      closeRt: '）', // fullwidth right parenthesis
      openRb: '（（',
      closeRb: '））',
      autoRb: /[々ヶ\p{Decimal_Number}\p{Block=CJK_Unified_Ideographs}\p{Block=CJK_Unified_Ideographs_Extension_A}\p{Block=CJK_Unified_Ideographs_Extension_B}\p{Block=CJK_Unified_Ideographs_Extension_C}\p{Block=CJK_Unified_Ideographs_Extension_D}\p{Block=CJK_Unified_Ideographs_Extension_E}\p{Block=CJK_Compatibility_Ideographs}\p{Block=CJK_Compatibility_Ideographs_Supplement}]/u.source
    })
  }

  parse(text) {
    if (text == null) {
      return undefined
    }
    let { openRt, closeRt, openRb, closeRb, autoRb } = this
    let regex = new RegExp(
      `(?:${openRb}(.*?)${closeRb}|(${autoRb}+)(?!${openRb}(?:.*?)${closeRb}))(?:${openRt}(.*?)${closeRt})?`,
      'ug'
    )
    let parsed = []
    let regexResult
    let startIndex = 0
    let lastIsString = false
    let hasRuby
    const push = x => {
      if (x === '') {
        return
      }
      let curIsString = typeof x === 'string'
      if (lastIsString && curIsString) {
        parsed[parsed.length - 1] = `${parsed[parsed.length - 1]}${x}`
      }
      else {
        parsed.push(x)
      }
      lastIsString = curIsString
    }
    while ((regexResult = regex.exec(text)) != null) {
      let [, rb1, rb2, rt] = regexResult
      let rb = rb1 && rb1.length ? rb1 : rb2
      let { index } = regexResult
      let leadingSubstring = text.substring(startIndex, index)
      push(leadingSubstring)
      startIndex = regex.lastIndex
      if (rt && rt.length) {
        push({ rb, rt })
        hasRuby = true
        continue
      }
      if (rb) {
        push(rb)
      }
    }
    push(text.substring(startIndex))
    parsed.hasRuby = hasRuby
    return parsed
  }

}
