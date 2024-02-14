import { test } from "bun:test";
import { deepEqual, equal, ok } from "node:assert/strict";
import { parse } from "../src/parser.mts";

test("no ruby should do nothing", () => {
  equal(parse("abc").objects.join(""), "abc");
});

test("no ruby should do nothing with possible auto", () => {
  equal(parse("aあ字").objects.join(""), "aあ字");
});

test("parse should return undefined", () => {
  // @ts-ignore
  deepEqual(parse().objects, []);
});

test("auto parse with surrounding characters", () => {
  let result = parse("ab字（じ）cd").objects;
  deepEqual([...result], ["ab", { rb: "字", rt: "じ" }, "cd"]);
});

test("auto parse 2 characters", () => {
  let result = parse("今日（きょう）").objects.filter(Boolean);
  deepEqual([...result], [{ rb: "今日", rt: "きょう" }]);
});

test("force parse", () => {
  let result = parse("（（cm））（センチ）").objects.filter(Boolean);
  deepEqual([...result], [{ rb: "cm", rt: "センチ" }]);
});

test("force parse with surrounding characters", () => {
  let result = parse("5（（cm））（センチ）/ms").objects;
  deepEqual([...result], ["5", { rb: "cm", rt: "センチ" }, "/ms"]);
});

test("inactive ruby + force ruby", () => {
  let result = parse("5000（（%））（パーセント）").objects;
  deepEqual([...result], ["5000", { rb: "%", rt: "パーセント" }]);
});

test("parse isolated rb", () => {
  equal(parse("a（（z））b").objects.join(""), "azb");
});

test("end with isolated rb", () => {
  equal(parse("（（z））").objects.join(""), "z");
});

test("don't parse cut-off delimiters", () => {
  equal(parse("a（（z）").objects.join(""), "a（（z）");
});

test("end with auto char", () => {
  equal(parse("字").objects.join(""), "字");
});

test("end with open rt", () => {
  equal(parse("（（ji））（じ").objects.join(""), "ji（じ");
});

test("empty rt", () => {
  let result = parse("教（きょう）科（）書（しょ）");
  deepEqual(
    [...result.objects],
    [{ rb: "教", rt: "きょう" }, "科", { rb: "書", rt: "しょ" }],
  );
});

test("custom delimiters", () => {
  const opts = {
    openRt: "【",
    closeRt: "】",
    openRb: "≪",
    closeRb: "≫",
  };
  let result = parse("今日【きょう】6【ろく】7≪cm≫【センチ】", opts);
  deepEqual(
    [...result.objects],
    [
      { rb: "今日", rt: "きょう" },
      { rb: "6", rt: "ろく" },
      "7",
      { rb: "cm", rt: "センチ" },
    ],
  );
});

test("has ruby", () => {
  ok(!parse("abc").hasRuby);
  ok(parse("字（じ）").hasRuby);
});

test("parse ka and noma", () => {
  let result = parse("ヶ（か）々（び）");
  deepEqual(
    [...result.objects],
    [
      { rb: "ヶ", rt: "か" },
      { rb: "々", rt: "び" },
    ],
  );
});
