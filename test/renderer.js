const t = require('ava')
const Renderer = require('..').Renderer
const bel = require('bel')

t('render should do nothing', t => {
  let r = new Renderer()
  t.deepEqual(r.render(['abc', 'def']), ['abc', 'def'])
})

t('render should return empty', t => {
  let r = new Renderer()
  t.deepEqual(r.render(), [])
})

t('basic render', t => {
  let r = new Renderer()
  let content = r.render(['a', { rb: '今日', rt: 'きょう' }, 'b'])
  let testElement = bel`<span>${content}</span>`
  t.is(testElement.toString(), '<span>a<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>b</span>')
})

t('rb without rt', t => {
  let r = new Renderer()
  t.deepEqual(r.render(['a', { rb: 'b' }, 'c']), ['a', 'b', 'c'])
})

t('throw error', t => {
  let r = new Renderer()
  t.throws(() => r.render(NaN))
})

t('should render valid HTML', t => {
  let r = new Renderer()
  let content = r.render(['&><'])
  let testElement = bel`<span>${content}</span>`
  t.is(testElement.toString(), '<span>&amp;&gt;&lt;</span>')
})
