import { test } from "bun:test";
import html from "nanohtml";
import { equal } from "node:assert/strict";
import { rubyfy } from "../src/index.mjs";

test("rubyfy", () => {
  let content = rubyfy("a字（じ）b");
  let testElement = html`<span>${content}</span>`;
  equal(testElement.toString(), "<span>a<ruby>字<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>b</span>");
});
