
rubyfy = require('../..')
Parser = rubyfy.Parser
expect = require('chai').expect

describe 'Parser', ->

    describe '#constructor()', ->
        it 'should be a Parser', ->
            p = new Parser()
            expect(p).instanceof(Parser)
            expect(p.text).undefined
        it '.text should be set', ->
            p = new Parser('abc')
            expect(p.text).equal('abc')

    describe '#parse()', ->
        it 'should do nothing', ->
            p = new Parser('abcあいうxyz')
            expect(p.parse()).deep.equal(['abcあいうxyz'])
            expect(p.parsed).deep.equal(['abcあいうxyz'])
        it 'auto parse with surrounding characters', ->
            p = new Parser('あいう木（き）えお')
            expect(p.parse()).deep.equal(['あいう', {rb: '木', rt: 'き'}, 'えお'])
        it 'auto parse 2 kanji with surrounding characters', ->
            p = new Parser('あいう今日（きょう）えお')
            expect(p.parse()).deep.equal(['あいう', {rb: '今日', rt: 'きょう'}, 'えお'])
        it 'parse with surrounding characters', ->
            p = new Parser('abc（（cm））（センチ）xyz')
            expect(p.parse()).deep.equal(['abc', {rb: 'cm', rt: 'センチ'}, 'xyz'])
        it 'parse inactive ruby and non-auto ruby', ->
            p = new Parser('abc5000（（%））（パーセント）xyz')
            expect(p.parse()).deep.equal(['abc5000', {rb: '%', rt: 'パーセント'}, 'xyz'])
