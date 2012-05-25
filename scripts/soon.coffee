$ = (sel) -> Array::slice.call document.querySelectorAll sel

parts = $('.porto')

imageSizes = [
    [800, 369]
    [1960, 369]
    [1960, 42]
    [1960, 64]
    [1960, 102]
]

prefix = do ->
    div = document.createElement 'div'
    return p for p in ['Webkit', 'Moz', 'O', 'ms'] when div.style[p+'Transform']?

cssPrefix = if not prefix then ''  else "-#{prefix.toLowerCase()}-"

cssAnimation = null

do setupAnimation = ->
    #return
    cssAnimation = document.createElement 'style'
    cssAnimation.type = 'text/css'
    $('head')[0].appendChild cssAnimation

    parts.forEach (p, i) ->
        styles = getComputedStyle(p)
        width  = parseInt(styles.getPropertyValue('width'), 10)
        height = parseInt(styles.getPropertyValue('height'), 10)

        imageWidth = Math.floor (height / imageSizes[i][1]) * imageSizes[i][0]
        rules = """
            @#{cssPrefix}keyframes slice#{i} {
                0%   { #{cssPrefix}transform:translateX(0); }
                100% { #{cssPrefix}transform:translateX(-#{imageWidth}px); }
            }
            .p#{i} {
                width: #{width+imageWidth}px;
                #{cssPrefix}animation-name: slice#{i};
            }
        """
        if cssAnimation.styleSheet
            cssAnimation.styleSheet.cssText = rules
        else
            cssAnimation.appendChild document.createTextNode rules
        return

lastResize = 0
window.onresize = ->
    now = +new Date()
    console.log now, lastResize, now-lastResize
    return if (now - lastResize) < 2000
    lastResize = now
    cssAnimation.parentNode.removeChild cssAnimation
    setupAnimation()
