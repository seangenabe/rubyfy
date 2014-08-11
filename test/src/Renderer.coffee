
rubyfy = require('../..')
Renderer = rubyfy.Renderer
expect = require('chai').expect

describe 'Renderer', ->

    describe '#constructor()', ->
        it 'should be a Renderer', ->
            r = new Renderer()
            expect(r).instanceof(Renderer)
            expect(r.objects).undefined
        it '.objects should be set', ->
            r = new Renderer(['abc'])
            expect(r.objects).deep.equal(['abc'])

    describe '#render()', ->
        it 'should render to null', ->
            expect(new Renderer(null).render).null
            expect(new Renderer('abc').render()).null
        it 'basic render', ->
            r = new Renderer(['abc', {rb: '今日', rt: 'きょう'}, 'xyz'])
            expect(r.render()).equal('abc<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>xyz')
        it 'render single', ->
            o = Renderer.renderSingle({rb: '今日', rt: 'きょう'})
            expect(o).equal('<ruby>今日<rp>(</rp><rt>きょう</rt><rp>)</rp></ruby>')
