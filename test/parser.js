const t = require('ava')
const Parser = require('..').Parser

t('no ruby should do nothing', t => {
  let p = new Parser()
  t.deepEqual(p.parse('abc').join(''), 'abc')
})

t('no ruby should do nothing with possible auto', t => {
  let p = new Parser()
  t.deepEqual(p.parse('aあ字').join(''), 'aあ字')
})

t('parse should return undefined', t => {
  let p = new Parser()
  t.is(p.parse(), undefined)
})

t('auto parse with surrounding characters', t => {
  let p = new Parser()
  t.deepEqual(p.parse('ab字（じ）cd'), ['ab', { rb: '字', rt: 'じ' }, 'cd'])
})

t('auto parse 2 characters', t => {
  let p = new Parser()
  let result = p.parse('今日（きょう）').filter(Boolean)
  t.deepEqual(result, [{ rb: '今日', rt: 'きょう' }])
})

t('force parse', t => {
  let p = new Parser()
  let result = p.parse('（（cm））（センチ）').filter(Boolean)
  t.deepEqual(result, [{ rb: 'cm', rt: 'センチ' }])
})

t('force parse with surrounding characters', t => {
  let p = new Parser()
  let result = p.parse('5（（cm））（センチ）/ms')
  t.deepEqual(result, ['5', { rb: 'cm', rt: 'センチ' }, '/ms'])
})

t('inactive ruby + force ruby', t => {
  let p = new Parser()
  t.deepEqual(p.parse('5000（（%））（パーセント）'), ['5000', { rb: '%', rt: 'パーセント' }])
})

t('parse isolated rb', t => {
  let p = new Parser()
  t.is(p.parse('a（（z））b').join(''), 'azb')
})

t('end with isolated rb', t => {
  let p = new Parser()
  t.is(p.parse('（（z））').join(''), 'z')
})

t("don't parse cut-off delimiters", t => {
  let p = new Parser()
  t.is(p.parse('a（（z）').join(''), 'a（（z）')
})

t('end with auto char', t => {
  let p = new Parser()
  t.is(p.parse('字').join(''), '字')
})

t('end with open rt', t => {
  let p = new Parser()
  t.is(p.parse('（（ji））（じ').join(''), 'ji（じ')
})

t('custom delimiters', t => {
  let p = new Parser()
  p.openRt = '【'
  p.closeRt = '】'
  p.openRb = '≪'
  p.closeRb = '≫'
  t.deepEqual(
    p.parse('今日【きょう】6【ろく】7≪cm≫【センチ】'),
    [
      { rb: '今日', rt: 'きょう' },
      { rb: '6', rt: 'ろく' },
      '7',
      { rb: 'cm', rt: 'センチ' }
    ]
  )
})
