(function() {
  var $, $$, baseSpeed, cssAnimation, cssPrefix, imageSizes, imageSpeed, parts, prefix, resizeTimer, setupAnimation;

  $ = function(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  $$ = function(sel) {
    return document.querySelector(sel);
  };

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

  parts = [$$('.p0'), $$('.p1'), $$('.p2'), $$('.p3'), $$('.p4')];

  imageSizes = [[800, 369], [1960, 369], [1960, 42], [1960, 64], [1960, 102]];

  imageSpeed = [1, 1.2, 2, 5, 8];

  baseSpeed = 180;

  cssAnimation = null;

  (setupAnimation = function() {
    var rules;
    if (!prefix) return;
    cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    $('head')[0].appendChild(cssAnimation);
    rules = '';
    parts.forEach(function(p, i) {
      var height, imageWidth, styles, width;
      styles = getComputedStyle(p);
      width = parseInt(styles.getPropertyValue('width'), 10);
      height = parseInt(styles.getPropertyValue('height'), 10);
      imageWidth = Math.floor((height / imageSizes[i][1]) * imageSizes[i][0]);
      return rules += "@" + cssPrefix + "keyframes slice" + i + " {\n    0%   { " + cssPrefix + "transform:translateX(0); }\n    100% { " + cssPrefix + "transform:translateX(-" + imageWidth + "px); }\n}\n.p" + i + " {\n    width: " + (width + imageWidth) + "px;\n    " + cssPrefix + "animation: slice" + i + " " + (Math.floor(baseSpeed / imageSpeed[i])) + "s linear 0 infinite normal;\n}";
    });
    console.log(rules);
    if (cssAnimation.styleSheet) {
      cssAnimation.styleSheet.cssText = rules;
    } else {
      cssAnimation.appendChild(document.createTextNode(rules));
    }
  })();

  resizeTimer = 0;

  window.onresize = function() {
    clearTimeout(resizeTimer);
    return resizeTimer = setTimeout(function() {
      if (cssAnimation != null) cssAnimation.parentNode.removeChild(cssAnimation);
      return setupAnimation();
    }, 1000);
  };

}).call(this);
