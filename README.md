# rubyfy

Easily write ruby annotations and output them as HTML.

[![npm](https://img.shields.io/npm/v/rubyfy.svg?style=flat-square)](https://www.npmjs.com/package/rubyfy)
[![node](https://img.shields.io/node/v/rubyfy.svg?style=flat-square)](https://nodejs.org/en/download/)

## Usage

```javascript
import { rubyfy } from "rubyfy"
```

Convert a string by wrapping the ruby text in full-width parentheses `（）`:

```javascript
rubyfy('日（に）本（ほん）語（ご）')
// => <ruby>日<rp>(</rp><rt>に</rt><rp>)</rp></ruby><ruby>本<rp>(</rp><rt>ほん</rt><rp>)</rp></ruby><ruby>語<rp>(</rp><rt>ご</rt><rp>)</rp></ruby>
```

The type of the return value is an array of DOM `Node`s, which should be compatible with libraries like [bel](https://www.npmjs.com/package/bel).

Any string of numerals 0-9, CJK characters, and the characters `々` and `ヶ`, will be captured.

```javascript
rubyfy('今日（きょう）')
// => <ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>
```

Force a portion of the text to be the ruby body using double full-width parentheses `（（））`:

```javascript
rubyfy('（（Alice））（アリス）')
// => <ruby>Alice<rp>(</rp><rt>アリス</rt><rp>)</rp></ruby>
```

## Advanced usage

You can take the parser and the renderer to use for yourself:

```javascript
import { parse } from "rubyfy/out/parser.js"
parse('漢（かん）字（じ）です')
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
import { render } from "rubyfy/out/render.js"
render(parseResult)
```

More details on the [API documentation](./API.md).
