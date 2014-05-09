class Renderer
    constructor: (objects) ->
        @objects = objects
        @openRp = '('
        @closeRp = ')'

    render: () ->
        return null unless @objects?
        if Array.isArray @objects
            renderedObjects = for obj in @objects
                Renderer.renderSingle(obj, {@openRp, @closeRp})
            return renderedObjects.join('')
        null

    Renderer.renderSingle = (single, opts = {}) ->
        {openRp, closeRp} = opts
        openRp ?= '('
        closeRp ?= ')'
        if typeof single is 'string'
            return single
        if single.rb
            if single.rt?.length
                ret = "<ruby>#{single.rb}"
                ret += "<rp>#{openRp}</rp>" if openRp.length
                ret += "<rt>#{single.rt}</rt>"
                ret += "<rp>#{closeRp}</rp>" if closeRp.length
                ret += "</ruby>"
                ret
                return ret
            else
                return single.rb
        return single

module.exports = Renderer
