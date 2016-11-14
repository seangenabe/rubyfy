const t = require('ava')
const rubyfy = require('..')
const bel = require('bel')

t('rubyfy', t => {
  let content = rubyfy('a字（じ）b')
  let testElement = bel`<span>${content}</span>`
  t.is(testElement.toString(), '<span>a<ruby>字<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>b</span>')
})
