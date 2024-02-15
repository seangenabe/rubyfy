import { For } from "@builder.io/mitosis"
import { type JSX } from "@builder.io/mitosis/jsx-runtime"
import { RendererOptions } from "./renderer-utils"
import { type RubyPair } from "./ruby-pair"
import RenderSingle from "./render-single.lite"

export interface RenderProps {
  options?: RendererOptions
  objects?: (RubyPair | JSX.Element)[]
}

export default function Renderer(props: RenderProps) {
  if (!Array.isArray(props.objects)) {
    throw new TypeError("objects must be an array")
  }

  return (
    <For each={props.objects}>
      {(obj) => <RenderSingle options={props.options} single={obj} />}
    </For>
  )
}
