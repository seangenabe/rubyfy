const document = require('global/document')

module.exports = class Renderer {

  constructor({ openRp = '(', closeRp = ')' } = {}) {
    this.openRp = openRp
    this.closeRp = closeRp
  }

  render(objects) {
    let { openRp, closeRp } = this
    if (objects == null) {
      return
    }
    if (!Array.isArray(objects)) {
      throw new TypeError("objects must be an array")
    }
    return objects.map(obj => Renderer.renderSingle(obj))
  }

  renderSingle(single) {
    const { openRp, closeRp } = this
    if (typeof single === 'string') {
      return document.createTextNode(single)
    }
    if (!single.rb) {
       return single
    }
    if (!(single.rt && single.rt.length)) {
      return document.createTextNode(single.rb)
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
