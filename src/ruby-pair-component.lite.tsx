import { Show } from "@builder.io/mitosis"
import CloseRp from "./close-rp.lite.jsx"
import OpenRp from "./open-rp.lite.jsx"
import { hasRb, hasRt, type RendererOptions } from "./renderer-utils.js"
import { type RubyPair } from "./ruby-pair.js"

export interface RenderRubyPairProps {
  single?: RubyPair
  options?: RendererOptions
}

export default function RubyPairComponent(props: RenderRubyPairProps) {
  return (
    <Show when={hasRb(props.single)}>
      <ruby>
        {props.single?.rb}
        <Show when={hasRt(props.single)}>
          <OpenRp openRp={props.options?.openRp} />
          <rt>{props.single?.rt}</rt>
          <CloseRp closeRp={props.options?.closeRp} />
        </Show>
      </ruby>
    </Show>
  )
}
