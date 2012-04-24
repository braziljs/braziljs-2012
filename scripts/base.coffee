poa = document.getElementById 'poa'

window.addEventListener 'scroll', (e) ->
	position = document.body.scrollTop
	poa.style.backgroundPositionY = (-position/2.2).toFixed(1) + 'px' if position < 600
	return