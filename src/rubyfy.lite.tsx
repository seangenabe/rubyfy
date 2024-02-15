import { ParserOptions, parse } from "./parser"
import { RendererOptions } from "./renderer-utils"
import Renderer from "./renderer.lite"

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
