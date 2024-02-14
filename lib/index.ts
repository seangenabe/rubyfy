export { Parser } from './parser'
export { Renderer } from './renderer'

export function rubyfy(text: string) {
  const parsed = new Parser().parse(text)
  return new Renderer().render(parsed)
}

export default rubyfy;
