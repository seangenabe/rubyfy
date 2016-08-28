const Parser = require('./parser')
const Renderer = require('./renderer')

function rubyfy(text) {
  parsed = (new Parser(text)).parse()
  return (new Renderer(parsed)).render()
}

rubyfy.Parser = Parser
rubyfy.Renderer = Renderer

module.exports = rubyfy
