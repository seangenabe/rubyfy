const document = require('global/document')
const DEFAULT_OPEN_RP = '('
const DEFAULT_CLOSE_RP = ')'

module.exports = class Renderer {

  constructor(opts = {}) {
    Object.assign(this, opts, {
      openRp: DEFAULT_OPEN_RP,
      closeRp: DEFAULT_CLOSE_RP
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
      yield Renderer.renderSingle(obj, { openRp, closeRp })
    }
  }

  render(objects) {
    return [...this.renderI(objects)]
  }

  static renderSingle(
      single,
      { openRp = DEFAULT_OPEN_RP, closeRp = DEFAULT_CLOSE_RP } = {}
    ) {

    if (typeof single === 'string' || !single.rb) {
      return document.createTextNode(single)
    }
    if (!(single.rt && single.rt.length)) {
      return single.rb
    }
    let ret = document.createElement('ruby')
    appendText(ret, single.rb)
    if (openRp.length) {
      let openRpElement = document.createElement('rp')
      appendText(openRpElement, openRp)
      ret.appendChild(openRpElement)
    }
    let rtElement = document.createElement('rt')
    appendText(rtElement, single.rt)
    ret.appendChild(rtElement)
    if (closeRp.length) {
      let closeRpElement = document.createElement('rp')
      appendText(closeRpElement, closeRp)
      ret.appendChild(closeRpElement)
    }
    return ret
  }

}

function appendText(node, text) {
  node.appendChild(document.createTextNode(text))
}
