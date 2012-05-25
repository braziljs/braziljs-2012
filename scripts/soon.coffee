$ = (sel) -> Array::slice.call document.querySelectorAll sel
$$ = (sel) -> document.querySelector sel

prefix = do ->
    div = document.createElement 'div'
    return p for p in ['Webkit', 'Moz', 'O', 'ms'] when div.style[p+'Transform']?

cssPrefix = if not prefix then ''  else "-#{prefix.toLowerCase()}-"

parts = [
    $$('.p0')
    $$('.p1')
    $$('.p2')
    $$('.p3')
    $$('.p4')
]

imageSizes = [
    [800, 369]
    [1960, 369]
    [1960, 42]
    [1960, 64]
    [1960, 102]
]

imageSpeed = [1,1.2,2,5,8]
baseSpeed = 180

cssAnimation = null

do setupAnimation = ->
    return if not prefix
    #return

    cssAnimation = document.createElement 'style'
    cssAnimation.type = 'text/css'
    $('head')[0].appendChild cssAnimation

    rules = ''

    parts.forEach (p, i) ->
        styles = getComputedStyle(p)
        width  = parseInt(styles.getPropertyValue('width'), 10)
        height = parseInt(styles.getPropertyValue('height'), 10)

        imageWidth = Math.floor (height / imageSizes[i][1]) * imageSizes[i][0]
        rules += """
            @#{cssPrefix}keyframes slice#{i} {
                0%   { #{cssPrefix}transform:translateX(0); }
                100% { #{cssPrefix}transform:translateX(-#{imageWidth}px); }
            }
            .p#{i} {
                width: #{width+imageWidth}px;
                #{cssPrefix}animation: slice#{i} #{Math.floor baseSpeed / imageSpeed[i]}s linear 0 infinite normal;
            }
        """
    console.log rules
    if cssAnimation.styleSheet
        cssAnimation.styleSheet.cssText = rules
    else
        cssAnimation.appendChild document.createTextNode rules
    return

resizeTimer = 0
window.onresize = ->
    clearTimeout resizeTimer
    resizeTimer = setTimeout ->
        cssAnimation?.parentNode.removeChild cssAnimation
        setupAnimation()    
    , 1000
    
