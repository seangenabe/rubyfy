import { Show } from "@builder.io/mitosis"
import { type JSX } from "@builder.io/mitosis/jsx-runtime"
import Identity from "./identity.lite.jsx"
import { isRubyPair, type RendererOptions } from "./renderer-utils.js"
import RubyPairComponent from "./ruby-pair-component.lite.jsx"
import { type RubyPair } from "./ruby-pair.js"

export interface RenderSingleProps {
  single?: RubyPair | JSX.Element
  options?: RendererOptions
}

export default function RenderSingle(props: RenderSingleProps) {
  return (
    <Show
      when={isRubyPair(props.single)}
      else={<Identity>{props.single as JSX.Element}</Identity>}
    >
      <RubyPairComponent
        single={props.single as RubyPair}
        options={props.options}
      />
    </Show>
  )
}
