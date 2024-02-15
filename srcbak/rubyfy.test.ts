import html from "bel";
import { test } from "bun:test";
import { equal } from "node:assert/strict";
import { rubyfy } from "./index";

test("rubyfy", () => {
  let content = rubyfy("a字（じ）b");
  let testElement = html`<span>${content}</span>`;
  equal(testElement.toString(), "<span>a<ruby>字<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>b</span>");
});
