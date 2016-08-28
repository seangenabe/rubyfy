const t = require('ava')
const Renderer = require('..').Renderer

t('render should do nothing', t => {
  let r = new Renderer()
  t.is(r.render(['abc', 'def']), 'abcdef')
})

t('render should return undefined', t => {
  let r = new Renderer()
  t.falsy(r.render())
})

t('basic render', t => {
  let r = new Renderer()
  t.is(r.render(['a', { rb: '今日', rt: 'きょう' }, 'b']), 'a<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>b')
})
