import { ParserOptions, parse } from "./parser.js"
import { RendererOptions } from "./renderer-utils.js"
import Renderer from "./renderer.lite.jsx"

export interface RubyfyProps {
  text: string
  parseOptions?: ParserOptions
  renderOptions?: RendererOptions
}

export default function Rubyfy(props: RubyfyProps) {
  return (
    <Renderer
      options={props.renderOptions}
      objects={parse(props.text, props.parseOptions).objects}
    />
  )
}
