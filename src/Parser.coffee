class Parser
    constructor: (text) ->
        @text = text
        @hasRuby = false
        @openRt = '\uff08'
        @closeRt = '\uff09'
        @openRb = '\uff08{2}'
        @closeRb = '\uff09{2}'
        # 4e00-9fff: CJK
        # 3400-4dbf: CJK extended A
        # 3005: Kanji repetition mark
        @autoRb = '[0-9\u4e00-\u9fff\u3400-\u4dbf\u3005]+'

    parse: () ->
        return null unless @text?
        return [] if @text is ''
        startIndex = 0
        regex = ///
            # Match rb
            (?:#{@openRb}(.*?)#{@closeRb}|(#{@autoRb}))
            # Match optionally with an rt
            (?:#{@openRt}(.*?)#{@closeRt})?
            ///g
        parsed = []
        while (regexResult = regex.exec(@text))?
            do (regexResult) =>
                [_, rb1, rb2, rt] = regexResult
                rb = if rb1?.length then rb1 else rb2
                {index} = regexResult
                leadingSubstring = @text.substring(startIndex, index)
                parsed.push(leadingSubstring) if leadingSubstring.length
                startIndex = regex.lastIndex
                if rt?.length
                    @hasRuby = true
                    parsed.push {rb, rt}
                    return
                if rb?.length
                    parsed.push rb
                return
        remainingSubstring = @text.substring(startIndex)
        parsed.push(remainingSubstring) if remainingSubstring.length
        @parsed = parsed

module.exports = Parser
