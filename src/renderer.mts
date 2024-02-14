import document from "global/document";
import type { RubyPair } from "./parser.mts";

function appendText(node: Node, text: string) {
  node.appendChild(document.createTextNode(text));
}

export interface RendererOptions {
  openRp?: string;
  closeRp?: string;
}

export function render(objects: (RubyPair | string)[], opts: RendererOptions = {}) {
  if (objects == null) {
    return;
  }

  if (!Array.isArray(objects)) {
    throw new TypeError("objects must be an array");
  }

  return objects.map(obj => renderSingle(obj, opts));
}

export function renderSingle(single: RubyPair | string, opts?: RendererOptions): Node;
export function renderSingle<ExtraType extends object>(
  single: RubyPair | string | ExtraType,
  opts?: RendererOptions,
): Node | ExtraType;
export function renderSingle<ExtraType extends object>(
  single: RubyPair | string | ExtraType,
  opts: RendererOptions = {},
) {
  const { openRp = "(", closeRp = ")" } = opts;

  if (typeof single === "string" || typeof single === "number") {
    return document.createTextNode(single);
  }

  if (isExtraType<ExtraType>(single)) {
    return single;
  }

  if (!(single.rt && single.rt.length)) {
    return single;
  }

  const ret = document.createElement("ruby");
  appendText(ret, single.rb);

  if (openRp.length) {
    let openRpElement = document.createElement("rp");
    appendText(openRpElement, openRp);
    ret.appendChild(openRpElement);
  }

  let rtElement = document.createElement("rt");
  appendText(rtElement, single.rt);
  ret.appendChild(rtElement);

  if (closeRp.length) {
    let closeRpElement = document.createElement("rp");
    appendText(closeRpElement, closeRp);
    ret.appendChild(closeRpElement);
  }
  console.log("ret", ret);
  return ret;
}

function isExtraType<T extends object>(obj: RubyPair | T): obj is T {
  return !("rb" in obj);
}
