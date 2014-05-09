# Rubyfy

Easily write ruby annotations and output it as HTML.

## Installation

    npm install rubyfy

## Usage

Require the module:

    var rubyfy = require('rubyfy')

Convert a string by wrapping the ruby text in full-width parentheses:

    rubyfy('日（に）本（ほん）語（ご）')
    // <ruby>日<rp>(</rp><rt>に</rt><rp>)</rp></ruby><ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby><ruby>語<rp>(</rp><rt>ご</rt><rp>)</rp></ruby>

Any string of CJK characters will be captured.

    rubyfy('今日（きょう）')
    // <ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>


Force a portion of the text to be the ruby body:

    rubyfy('（（Alice））（アリス）')
    // <ruby>Alice<rp>(</rp><rt>アリス</rt><rp>)</rp></ruby>

## Advanced usage

You can take the parser and the renderer to use for yourself:

    var parser = new rubyfy.Parser('漢（かん）字（じ）')
    var parseResult = parser.parse()

    var renderer = new rubyfy.Renderer(parseResult)
    var renderResult = renderer.render()

Parser options:

* parser.text - The text that was passed to the constructor. Or pass the text here if that wasn't done.
* parser.hasRuby - After parsing, will indicate if the text has any ruby at all.
* parser.openRt - Regular expression to match the beginning of the ruby text. Default: '\uff08'
* parser.closeRt - Regular expression to match the end of the ruby text. Default: '\uff09'
* parser.openRb - Regular expression to match the beginning of an explicit ruby body. Default: '\uff08{2}'
* parser.closeRb - Regular expression to match the end of an explicit ruby body. Default: '\uff09{2}'

Renderer options:

* renderer.objects - The parsed objects passed to the constructor and will be used by the renderer.
* renderer.openRp - Content of opening rp element. Default: '('. Empty to disable.
* renderer.closeRb - Content of closing rp element. Default: ')'. Empty to disable.
