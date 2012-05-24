(function() {
  var $, cssAnimation, imageSizes, lastResize, p1, p2, p3, p4, parts, setupAnimation;

  $ = function(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  parts = $('.porto');

  if (window.requestAnimationFrame == null) {
    window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  }

  p1 = p2 = p3 = p4 = 0;

  imageSizes = [[800, 369], [1960, 369], [1960, 42], [1960, 64], [1960, 102]];

  cssAnimation = null;

  (setupAnimation = function() {
    cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    $('head')[0].appendChild(cssAnimation);
    return parts.forEach(function(p, i) {
      var height, imageWidth, rules, styles, width;
      styles = getComputedStyle(p);
      width = parseInt(styles.getPropertyValue('width'), 10);
      height = parseInt(styles.getPropertyValue('height'), 10);
      imageWidth = Math.floor((height / imageSizes[i][1]) * imageSizes[i][0]);
      rules = document.createTextNode("@-webkit-keyframes slice" + i + " {\n    0%   {\n        -webkit-transform:translateX(0);\n           -moz-transform:translateX(0);\n                transform:translateX(0);\n    }\n    100% {\n        -webkit-transform:translateX(-" + imageWidth + "px);\n           -moz-transform:translateX(-" + imageWidth + "px);\n                transform:translateX(-" + imageWidth + "px);\n    }\n}");
      cssAnimation.appendChild(rules);
      p.style.width = "" + (width + imageWidth) + "px";
      return p.style.webkitAnimationName = "slice" + i;
    });
  })();

  lastResize = 0;

  window.onresize = function() {
    if (+(new Date) - lastResize < 600) return;
    cssAnimation.parentNode.removeChild(cssAnimation);
    return setupAnimation();
  };

  (function() {
    return;
    parts[0].style.backgroundPositionX = "" + (p1 -= .5) + "px";
    parts[1].style.backgroundPositionX = "" + (p2 -= 1) + "px";
    parts[2].style.backgroundPositionX = "" + (p3 -= 2) + "px";
    parts[3].style.backgroundPositionX = "" + (p4 -= 4) + "px";
    return requestAnimationFrame(arguments.callee);
  })();

}).call(this);
