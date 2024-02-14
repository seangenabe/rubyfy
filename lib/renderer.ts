import document from "global/document";
import type { RubyPair } from "./parser";

function appendText(node: Node, text: string) {
  ndoe.appendChild(document.createTextNode(text));
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

export function renderSingle(single: RubyPair | string, opts: RendererOptions = {}) {
  const { openRp = "(", closeRp = ")" } = opts;

  if (typeof single === "string" || typeof single === "number") {
    return document.createTextNode(single);
  }

  if (!single.rb) {
    return single;
  }

  if (!(single.rt && single.rt.length)) {
    return document.createTextNode(single.rb);
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
  return ret;
}
