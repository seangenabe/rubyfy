module.exports = class Renderer {

  constructor(opts = {}) {
    Object.assign(this, opts, {
      openRp: '(',
      closeRp: ')'
    })
  }

  *renderI(objects) {
    let { openRp, closeRp } = this
    if (objects == null) {
      return
    }
    if (!Array.isArray(objects)) {
      throw new TypeError("objects must be an array")
    }
    for (let obj of objects) {
      yield* this.constructor.renderSingle(obj, { openRp, closeRp })
    }
  }

  render(objects) {
    return [...this.renderI(objects)].join('')
  }

  static renderSingle(single, { openRp, closeRp }) {
    if (typeof single === 'string' || !single.rb) {
      return single
    }
    if (!(single.rt && single.rt.length)) {
      return single.rb
    }
    let buf = []
    buf.push(`<ruby>${single.rb}`)
    if (openRp.length) {
      buf.push(`<rp>${openRp}</rp>`)
    }
    buf.push(`<rt>${single.rt}</rt>`)
    if (closeRp.length) {
      buf.push(`<rp>${closeRp}</rp>`)
    }
    buf.push('</ruby>')
    return buf.join('')
  }

}
