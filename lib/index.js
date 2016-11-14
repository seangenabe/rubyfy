const Parser = require('./parser')
const Renderer = require('./renderer')

function rubyfy(text) {
  let parsed = (new Parser()).parse(text)
  return (new Renderer()).render(parsed)
}

module.exports = rubyfy
module.exports.Parser = Parser
module.exports.Renderer = Renderer
