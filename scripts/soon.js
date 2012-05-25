(function() {
  var $, cssAnimation, cssPrefix, imageSizes, lastResize, parts, prefix, setupAnimation;

  $ = function(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  parts = $('.porto');

  imageSizes = [[800, 369], [1960, 369], [1960, 42], [1960, 64], [1960, 102]];

  prefix = (function() {
    var div, p, _i, _len, _ref;
    div = document.createElement('div');
    _ref = ['Webkit', 'Moz', 'O', 'ms'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      if (div.style[p + 'Transform'] != null) return p;
    }
  })();

  cssPrefix = !prefix ? '' : "-" + (prefix.toLowerCase()) + "-";

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
      rules = "@" + cssPrefix + "keyframes slice" + i + " {\n    0%   { " + cssPrefix + "transform:translateX(0); }\n    100% { " + cssPrefix + "transform:translateX(-" + imageWidth + "px); }\n}\n.p" + i + " {\n    width: " + (width + imageWidth) + "px;\n    " + cssPrefix + "animation-name: slice" + i + ";\n}";
      if (cssAnimation.styleSheet) {
        cssAnimation.styleSheet.cssText = rules;
      } else {
        cssAnimation.appendChild(document.createTextNode(rules));
      }
    });
  })();

  lastResize = 0;

  window.onresize = function() {
    var now;
    now = +new Date();
    console.log(now, lastResize, now - lastResize);
    if ((now - lastResize) < 2000) return;
    lastResize = now;
    cssAnimation.parentNode.removeChild(cssAnimation);
    return setupAnimation();
  };

}).call(this);
