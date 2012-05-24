$ = (sel) -> Array::slice.call document.querySelectorAll sel

parts = $('.porto')

window.requestAnimationFrame ?=
    window.mozRequestAnimationFrame or
    window.webkitRequestAnimationFrame or
    window.msRequestAnimationFrame

p1 = p2 = p3 = p4 = 0

imageSizes = [
    [800, 369]
    [1960, 369]
    [1960, 42]
    [1960, 64]
    [1960, 102]
]

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
        rules = document.createTextNode """
        @-webkit-keyframes slice#{i} {
            0%   {
                -webkit-transform:translateX(0);
                   -moz-transform:translateX(0);
                        transform:translateX(0);
            }
            100% {
                -webkit-transform:translateX(-#{imageWidth}px);
                   -moz-transform:translateX(-#{imageWidth}px);
                        transform:translateX(-#{imageWidth}px);
            }
        }
        """
        cssAnimation.appendChild rules
        p.style.width = "#{width+imageWidth}px"
        p.style.webkitAnimationName = "slice#{i}"

lastResize = 0
window.onresize = ->
    return if +new Date - lastResize < 600
    cssAnimation.parentNode.removeChild cssAnimation
    setupAnimation()

do ->
    return
    parts[0].style.backgroundPositionX = "#{p1 -= .5}px"
    parts[1].style.backgroundPositionX = "#{p2 -= 1}px"
    parts[2].style.backgroundPositionX = "#{p3 -= 2}px"
    parts[3].style.backgroundPositionX = "#{p4 -= 4}px"
    requestAnimationFrame arguments.callee

