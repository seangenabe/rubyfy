import { deepEqual, equal } from "assert/strict";
import html from "bel";
import { test } from "bun:test";
import { render } from "../src/renderer.mts";

function toHTMLString(result: ReturnType<typeof render>) {
  let testElement = html`<span>${result}</span>`;
  let ret = testElement.toString();
  ret = ret.substring(6, ret.length - 7);
  return ret;
}

test("render should do nothing", t => {
  equal(toHTMLString(render(["abc", "def"])), "abcdef");
});

test("render should return empty", t => {
  // @ts-ignore
  equal(toHTMLString(render()), "");
});

test("basic render", t => {
  equal(
    toHTMLString(render(["a", { rb: "今日", rt: "きょう" }, "b"])),
    "a<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>b",
  );
});

test("rb without rt", t => {
  // @ts-ignore
  equal(toHTMLString(render(["a", { rb: "b" }, "c"])), "abc");
});

test("throw error", t => {
  // @ts-ignore
  t.throws(() => render(NaN));
});

test("should render valid HTML", t => {
  equal(toHTMLString(render(["&><"])), "&amp;&gt;&lt;");
});

test("custom object support", t => {
  // @ts-ignoreq
  deepEqual(render([{ abc: 123 }]), [{ abc: 123 }]);
});

test("renderer options", t => {
  const opts = { openRp: "{", closeRp: "}" };
  equal(toHTMLString(render([{ rb: "六", rt: "ろく" }], opts)), "<ruby>六<rp>{</rp><rt>ろく</rt><rp>}</rp></ruby>");
});
