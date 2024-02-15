import { parse } from "./parser";
import { render } from "./renderer";

export function rubyfy(text: string, parseOptions = {}, renderOptions = {}) {
  parse;
  const parsed = parse(text, parseOptions);
  return render(parsed.objects, renderOptions);
}

export default rubyfy;
export { parse, render };
