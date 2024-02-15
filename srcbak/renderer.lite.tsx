import RtGroup from "../src/rt-group.lite"

export function Render(props: RenderProps) {
  const options = props.options ?? {}
  const objects = props.objects ?? []

  if (objects == null) {
    return undefined
  }

  if (!Array.isArray(objects)) {
    throw new TypeError("objects must be an array")
  }

  return objects.map((obj) => <RenderSingle options={options} single={obj} />)
}

export function RenderSingle(props: RenderSingleProps) {
  const options = props.options ?? {}
  const single = props.single
  const openRp = options.openRp ?? "("
  const closeRp = options.closeRp ?? ")"

  if (
    typeof single === "string" ||
    typeof single === "number" ||
    typeof single === "boolean" ||
    single == null
  ) {
    return single
  }

  if (hasRt(single)) {
    if (hasRb(single)) {
      return (
        <ruby>
          {single.rb}
          <RtGroup options={{ openRp, closeRp }}>{single.rt}</RtGroup>
        </ruby>
      )
    } else {
      return single
    }
  } else {
    if (hasRb(single)) {
      return single.rb
    } else {
      return single
    }
  }
}

function hasRt<T>(obj: T): obj is T & { rt: string } {
  return typeof obj === "object" && obj != null && "rt" in obj
}

function hasRb<T>(obj: T): obj is T & { rb: string } {
  return typeof obj === "object" && obj != null && "rb" in obj
}
