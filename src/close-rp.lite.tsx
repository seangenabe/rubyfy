export interface CloseRpProps {
  closeRp?: string
}

export default function CloseRp(props: CloseRpProps) {
  return <rp>{props.closeRp || "("}</rp>
}
