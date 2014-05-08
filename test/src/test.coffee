
rubyfy = require('../../lib/rubyfy')

rawText = 'わたし、今日（きょう）の日（に）本（ほん）語（ご）の（（勉強））（べんきょう）が好（す）き。'
parsedText =  ["わたし、",{"rb":"今日","rt":"きょう"},"の",{"rb":"日","rt":"に"},{"rb":"本","rt":"ほん"},{"rb":"語","rt":"ご"},"の",{"rb":"勉強","rt":"べんきょう"},"が",{"rb":"好","rt":"す"},"き。"]
renderedText = 'わたし、<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>の<ruby>日<rp>(</rp><rt>に</rt><rp>)</rp></ruby><ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby><ruby>語<rp>(</rp><rt>ご</rt><rp>)</rp></ruby>の<ruby>勉強<rp>(</rp><rt>べんきょう</rt><rp>)</rp></ruby>が<ruby>好<rp>(</rp><rt>す</rt><rp>)</rp></ruby>き。'

tests =
    parsing: (test) ->
        parser = new rubyfy.Parser(rawText)
        test.deepEqual(parser.parse(), parsedText)
        test.done()
    rendering: (test) ->
        renderer = new rubyfy.Renderer(parsedText)
        test.equal(renderer.render(), renderedText)
        test.done()
    singlePass: (test) ->
        test.equal(rubyfy(rawText), renderedText)
        test.done()

module.exports = tests
