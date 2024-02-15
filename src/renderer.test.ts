import { deepEqual, equal } from "assert/strict";
import html from "bel";
import { test } from "bun:test";
import { render } from "./renderer";

function toHTMLString(result: ReturnType<typeof render>) {
  console.log("result", result.toString());
  let testElement = html`<span>${result}</span>`;
  let ret = testElement.toString();
  const ret2 = testElement.outerHTML;
  console.log("testElement", testElement);
  console.log("ret2", ret2);
  ret = ret.substring(6, ret.length - 7);
  return ret;
}

test("render should do nothing", () => {
  equal(toHTMLString(render(["abc", "def"])), "abcdef");
});

test("render should return empty", () => {
  // @ts-ignore
  equal(toHTMLString(render()), "");
});

test("basic render", () => {
  equal(
    toHTMLString(render(["a", { rb: "今日", rt: "きょう" }, "b"])),
    "a<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>b",
  );
});

test("rb without rt", () => {
  // @ts-ignore
  equal(toHTMLString(render(["a", { rb: "b" }, "c"])), "abc");
});

test("throw error", () => {
  // @ts-ignore
  t.throws(() => render(NaN));
});

test("should render valid HTML", () => {
  const actual = toHTMLString(render(["&<>"]));
  equal(actual, "&amp;&lt;&gt;");
});

test("custom object support", () => {
  // @ts-ignore
  deepEqual(render([{ abc: 123 }]), [{ abc: 123 }]);
});

test("renderer options", () => {
  const opts = { openRp: "{", closeRp: "}" };
  equal(toHTMLString(render([{ rb: "六", rt: "ろく" }], opts)), "<ruby>六<rp>{</rp><rt>ろく</rt><rp>}</rp></ruby>");
});
