Parser = require('./Parser')
Renderer = require('./Renderer')

rubyfy = (text) ->
    parsed = (new Parser(text)).parse()
    (new Renderer(parsed)).render()

rubyfy.Parser = Parser
rubyfy.Renderer = Renderer

module.exports = rubyfy
