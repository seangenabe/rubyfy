const Parser = require('./parser')
const Renderer = require('./renderer')

function rubyfy(text) {
  let parsed = (new Parser()).parse(text)
  return (new Renderer()).render(parsed)
}

rubyfy.Parser = Parser
rubyfy.Renderer = Renderer

module.exports = rubyfy
