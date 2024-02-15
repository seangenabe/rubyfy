"use strict"

/** @type {import('@builder.io/mitosis').MitosisConfig} */
module.exports = {
  files: "src/**",
  targets: [
    "qwik",
    "vue3",
    "solid",
    "svelte",
    "react",
    "preact",
    // "alpine",
    // "angular",
    // "customElement",
    // "html",
    // "mitosis",
    // "liquid",
    // "reactNative",
    // "swift",
    // "template",
    // "vue2",
    // "stencil",
    // "marko",
    // "vue",
  ],
  dest: "out",
  parserOptions: {},
}
