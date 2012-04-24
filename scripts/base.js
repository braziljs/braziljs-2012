(function() {
  var poa;

  poa = document.getElementById('poa');

  window.addEventListener('scroll', function(e) {
    var position;
    position = document.body.scrollTop;
    if (position < 600) {
      poa.style.backgroundPositionY = (-position / 2.2).toFixed(1) + 'px';
    }
  });

}).call(this);
