const t = require('ava')
const Renderer = require('..').Renderer
const bel = require('bel')

function toHTMLString(result) {
  let testElement = bel`<span>${result}</span>`
  let ret = testElement.toString()
  ret = ret.substring(6, ret.length - 7)
  return ret
}

t('render should do nothing', t => {
  let r = new Renderer()
  t.is(toHTMLString(r.render(['abc', 'def'])), 'abcdef')
})

t('render should return empty', t => {
  let r = new Renderer()
  t.is(toHTMLString(r.render()), '')
})

t('basic render', t => {
  let r = new Renderer()
  t.is(
    toHTMLString(r.render(['a', { rb: '今日', rt: 'きょう' }, 'b'])),
    'a<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>b'
  )
})

t('rb without rt', t => {
  let r = new Renderer()
  t.is(toHTMLString(r.render(['a', { rb: 'b' }, 'c'])), 'abc')
})

t('throw error', t => {
  let r = new Renderer()
  t.throws(() => r.render(NaN))
})

t('should render valid HTML', t => {
  let r = new Renderer()
  t.is(toHTMLString(r.render(['&><'])), '&amp;&gt;&lt;')
})

t('custom object support', t => {
  let r = new Renderer()
  t.deepEqual(r.render([{ abc: 123 }]), [{ abc: 123 }])
})
