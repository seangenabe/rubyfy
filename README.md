# rubyfy

Easily write ruby annotations and output it as HTML.

## Usage

```javascript
const rubyfy = require('rubyfy')
```

Convert a string by wrapping the ruby text in full-width parentheses:

```javascript
rubyfy('日（に）本（ほん）語（ご）')
// => "<ruby>日<rp>(</rp><rt>に</rt><rp>)</rp></ruby><ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby><ruby>語<rp>(</rp><rt>ご</rt><rp>)</rp></ruby>"
```

Any string of numerals 0-9, CJK characters, and the characters `々` and `ヶ`, will be captured.

```javascript
rubyfy('今日（きょう）')
// => "<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>"
```

Force a portion of the text to be the ruby body using double full-width parentheses:

```javascript
rubyfy('（（Alice））（アリス）')
// => "<ruby>Alice<rp>(</rp><rt>アリス</rt><rp>)</rp></ruby>"
```

## Advanced usage

You can take the parser and the renderer to use for yourself:

```javascript
let parser = new rubyfy.Parser('漢（かん）字（じ）です')
let parseResult = parser.parse()
parseResult
```

Output:
```json
[
  { "rb": "漢", "rt": "かん" },
  { "rb": "字", "rt": "じ"},
  "です"
]
```

Render using the parse result:
```javascript
let renderer = new rubyfy.Renderer(parseResult)
let renderResult = renderer.render()
```

More details on the [API documentation](./API.md).

## License

MIT
