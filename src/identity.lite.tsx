import { Show } from "@builder.io/mitosis"
import { JSX } from "@builder.io/mitosis/jsx-runtime"

export interface IdentityProps {
  children?: JSX.Element
}

export default function Identity(props: IdentityProps) {
  return <Show when={true}>{props.children}</Show>
}
