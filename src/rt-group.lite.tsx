import { JSX } from "@builder.io/mitosis/jsx-runtime"
import CloseRp from "./close-rp.lite"
import OpenRp from "./open-rp.lite"

export interface RtGroupProps {
  options?: {
    openRp?: string
    closeRp?: string
  }
  children: JSX.Element
}

export default function RtGroup(props: RtGroupProps) {
  return (
    <>
      <OpenRp openRp={props.options?.openRp} />
      {props.children}
      <CloseRp closeRp={props.options?.closeRp} />
    </>
  )
}