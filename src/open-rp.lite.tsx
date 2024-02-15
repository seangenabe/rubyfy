export interface OpenRpProps {
  openRp?: string
}

export default function OpenRp(props: OpenRpProps) {
  return <rp>{props.openRp || "("}</rp>
}
