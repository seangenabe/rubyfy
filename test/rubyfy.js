const t = require('ava')
const rubyfy = require('..')

t('rubyfy', t => {
  let result = rubyfy('a字（じ）b')
  t.is(result, 'a<ruby>字<rp>(</rp><rt>じ</rt><rp>)</rp></ruby>b')
})
