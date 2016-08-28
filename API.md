# API documentation

## Parser

### Parser options

These options can be passed to the constructor or be changed after construction in the parser object.

* `openRt: String` - String to mark the beginning of the ruby text. Default: `（`
* `closeRt: String` - String to mark the end of the ruby text. Default: `）`
* `openRb: String` - String to force the beginning of the ruby body. Default: `（（`
* `closeRb: String` - String to end a forced ruby body. Default: `））`
* `autoRb: RegExp` - Static regular expression to match a single character that will be automatically read as a ruby body. Default: decimal digits + CJK ideographs + `々` + `ヶ` (Consult the code for the exact value. ☺)

### new Parser(opts = {})

### parser.parse(text)

Parses the input iterable character sequence.

Parameters:
* `text: String`

Returns: `Array<String|{rb: String, rt: String}>` - An array of strings and objects. Strings are returned for detected plain strings and objects for text with ruby.

## Renderer

### Renderer options

These options can be passed to the constructor or be changed after construction in the renderer object.

* `openRp: String` - Content of opening rp element. Default `(`. Specify the empty string `''` to disable placing an opening rp element.
* `closeRp: String` - Content of closing rp element. Default: `)`. Specify the empty string `''` to disable placing a closing rp element.

### new Renderer(opts = {})

### renderer.render(objects)

Renders the inputted values into an HTML string.

Parameters:
* `objects: Iterable<String|{rb: String, rt: String}>`

Returns: `String` - HTML string

### renderer.renderI(objects)

Return: `Generator<String>`

### Renderer.renderSingle(single, { openRp, closeRp })
