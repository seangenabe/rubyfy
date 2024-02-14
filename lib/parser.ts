import { regex as autoRbRegex } from "./regex";

export interface ParserOptions {
  openRt?: string;
  closeRt?: string;
  openRb?: string;
  closeRb?: string;
  autoRb?: string;
}

export interface RubyPair {
  rb: string;
  rt: string;
}

export function parse(text: string, options: ParserOptions) {
  const {
    openRt = "（",
    closeRt = "）",
    openRb = "（（",
    closeRb = "））",
    autoRb = autoRbRegex.source,
  } = options;
  let regex = new RegExp(
    `(?:${openRb}(.*?)${closeRb}|(${autoRb}+)(?!${openRb}(?:.*?)${closeRb}))(?:${openRt}(.*?)${closeRt})?`,
    "ug",
  );

  let parsed: (string | RubyPair)[] = [];
  let regexResult: RegExpExecArray | null;
  let startIndex = 0;
  let lastIsString = false;
  let hasRuby = false;

  const push = (x: string | RubyPair) => {
    if (x === "") {
      return;
    }
    let curIsString = typeof x === "string";
    if (lastIsString && curIsString) {
      parsed[parsed.length - 1] = `${parsed[parsed.length - 1]}${x}`;
    } else {
      parsed.push(x);
    }
    lastIsString = curIsString;
  };

  while ((regexResult = regex.exec(text)) != null) {
    const [, rb1, rb2, rt] = regexResult;
    const rb = rb1 && rb1.length ? rb1 : rb2;
    const { index } = regexResult;
    const leadingSubstring = text.substring(startIndex, index);
    push(leadingSubstring);
    startIndex = regex.lastIndex;
    if (rt && rt.length) {
      push({ rb, rt });
      hasRuby = true;
      continue;
    }
    if (rb) {
      push(rb);
    }
  }

  push(text.substring(startIndex));

  return { parsed, hasRuby };
}
