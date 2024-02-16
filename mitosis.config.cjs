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
    "html",
    "mitosis",
    // "alpine",
    // "angular",
    // "customElement",
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
  commonOptions: {
    // typescript: true,
  },
}
