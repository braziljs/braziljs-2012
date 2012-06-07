$ = (sel) -> Array::slice.call document.querySelectorAll sel
$$ = (sel) -> document.querySelector sel

window.requestAnimationFrame ?= 
    window.webkitRequestAnimationFrame or
    window.mozRequestAnimationFrame or
    window.msRequestAnimationFrame or
    window.oRequestAnimationFrame or
    (fn, el) -> setTimeout fn, 1000/60

poa = document.getElementById 'poa'

window.addEventListener 'scroll', (e) ->
    position = document.body.scrollTop
    poa.style.backgroundPositionY = (-position/2.2).toFixed(1) + 'px' if position < 600
    return

$('.speaker-image').forEach (svg) ->
    return

    pattern = svg.getElementsByTagName('image')[0]
    href = pattern.getAttribute('xlink:href')
    active = href.replace '.jpg', '-active.jpg'

    svg.addEventListener 'mouseover', ->
        pattern.setAttribute 'xlink:href', active

    svg.addEventListener 'mouseout', ->
        pattern.setAttribute 'xlink:href', href

###
Faz buracos nas fotos dos palestrantes. PNG é para os fracos,
e assim as imagens ficam muito mais leves
###
createCanvas = (w, h) ->
    canvas = document.createElement 'canvas'
    canvas.width = w
    canvas.height = h
    return canvas

circle = (ctx, x, y, r) ->
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI*2, true)
    ctx.closePath()

stamp = (image, x, y) ->
    canvas = createCanvas 120, 120
    ctx = canvas.getContext '2d'
    ctx.fillStyle = ctx.createPattern image, 'no-repeat'
    ctx.lineWidth = 0.5
    ctx.strokeStyle = 'rgba(100,100,100,0.2)'
    circle ctx, 60, 60, 60
    ctx.translate x, y
    ctx.fill()
    ctx.stroke()
    return canvas
    

pokeHoles = (image) ->
    # normal
    canvas = stamp image, 0, 0
    image.parentNode.appendChild canvas
    # hover
    canvas = stamp image, 0, -120
    canvas.className = 'active'
    image.parentNode.appendChild canvas
    # remover imagem original
    image.parentNode.removeChild image

$('.speakers .photo img').forEach (image) ->
    img = new Image
    img.onload = -> pokeHoles image
    img.src = image.src

###
Expandir mais info sobre palestrante
###

cssInfo = document.createElement 'style'
cssInfo.type = 'text/css'
$$('head').appendChild cssInfo

rules = ""

$('.speakers p').forEach (p, i) ->

    more = document.createElement 'button'
    more.className = 'more'
    more.innerHTML = '+'
    p.parentNode.insertBefore more, p

    more.parentNode.addEventListener 'click', (e) ->
        e.preventDefault()
        if p.className.indexOf('open') < 0
            p.className = 'open'
        else
            p.className = ''

    # medir altura do texto e criar regra para transition
    height = parseInt(getComputedStyle(p).height, 10)
    rules += "#info-#{i}.open { height:#{height}px; }"
    p.id = "info-#{i}"

if cssInfo.styleSheet
    cssInfo.styleSheet.cssText = rules
else
    cssInfo.appendChild document.createTextNode rules

offsetTop = (el) ->
    return unless el.offsetParent
    top = el.offsetTop
    top += el.offsetTop while el = el.offsetParent
    return top

###
Scrolling effect for navigation
###
if screen.width > 600
    $('#nav a').forEach (a) ->
        a.addEventListener 'click', (e) ->
            target = e.target.hash
            return unless target
            end = offsetTop $$(target)
            pos = 0
            start = document.body.scrollTop
            range = end - start
            direction = if end > start then 1 else -1
            move = ->
                pos += direction * 5
                document.body.scrollTop = start + range * Math.sin(Math.PI/2 * pos/100)
                requestAnimationFrame(move) unless pos > 99
            requestAnimationFrame move

