(function() {
  var $, $$, circle, createCanvas, cssInfo, offsetTop, poa, pokeHoles, rules, stamp;

  $ = function(sel) {
    return Array.prototype.slice.call(document.querySelectorAll(sel));
  };

  $$ = function(sel) {
    return document.querySelector(sel);
  };

  poa = document.getElementById('poa');

  window.addEventListener('scroll', function(e) {
    var position;
    position = document.body.scrollTop;
    if (position < 600) {
      poa.style.backgroundPositionY = (-position / 2.2).toFixed(1) + 'px';
    }
  });

  $('.speaker-image').forEach(function(svg) {
    var active, href, pattern;
    return;
    pattern = svg.getElementsByTagName('image')[0];
    href = pattern.getAttribute('xlink:href');
    active = href.replace('.jpg', '-active.jpg');
    svg.addEventListener('mouseover', function() {
      return pattern.setAttribute('xlink:href', active);
    });
    return svg.addEventListener('mouseout', function() {
      return pattern.setAttribute('xlink:href', href);
    });
  });

  /*
  Faz buracos nas fotos dos palestrantes. PNG é para os fracos,
  e assim as imagens ficam muito mais leves
  */

  createCanvas = function(w, h) {
    var canvas;
    canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return canvas;
  };

  circle = function(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    return ctx.closePath();
  };

  stamp = function(image, x, y) {
    var canvas, ctx;
    canvas = createCanvas(120, 120);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = ctx.createPattern(image, 'no-repeat');
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(100,100,100,0.2)';
    circle(ctx, 60, 60, 60);
    ctx.translate(x, y);
    ctx.fill();
    ctx.stroke();
    return canvas;
  };

  pokeHoles = function(image) {
    var canvas;
    canvas = stamp(image, 0, 0);
    image.parentNode.appendChild(canvas);
    canvas = stamp(image, 0, -120);
    canvas.className = 'active';
    image.parentNode.appendChild(canvas);
    return image.parentNode.removeChild(image);
  };

  $('.speakers .photo img').forEach(function(image) {
    var img;
    img = new Image;
    img.onload = function() {
      return pokeHoles(image);
    };
    return img.src = image.src;
  });

  /*
  Expandir mais info sobre palestrante
  */

  cssInfo = document.createElement('style');

  cssInfo.type = 'text/css';

  $$('head').appendChild(cssInfo);

  rules = "";

  $('.speakers p').forEach(function(p, i) {
    var height, more;
    more = document.createElement('button');
    more.className = 'more';
    more.innerHTML = '+';
    p.parentNode.insertBefore(more, p);
    more.parentNode.addEventListener('click', function(e) {
      e.preventDefault();
      if (p.className.indexOf('open') < 0) {
        return p.className = 'open';
      } else {
        return p.className = '';
      }
    });
    height = parseInt(getComputedStyle(p).height, 10);
    rules += "#info-" + i + ".open { height:" + height + "px; }";
    return p.id = "info-" + i;
  });

  if (cssInfo.styleSheet) {
    cssInfo.styleSheet.cssText = rules;
  } else {
    cssInfo.appendChild(document.createTextNode(rules));
  }

  offsetTop = function(el) {
    var top;
    if (!el.offsetParent) return;
    top = 0;
    while (true) {
      top += el.offsetTop;
      if (!(el = el.offsetParent)) break;
    }
    return top;
  };

  /*
  Scrolling effect for navigation
  */

  if (screen.width > 600) {
    $('#nav a').forEach(function(a) {
      return a.addEventListener('click', function(e) {
        var direction, end, move, pos, range, start, target;
        target = e.target.hash;
        if (!target) return;
        end = offsetTop($$(target));
        pos = 0;
        start = document.body.scrollTop;
        range = end - start;
        direction = end > start ? 1 : -1;
        move = function() {
          pos += direction * 5;
          document.body.scrollTop = start + range * Math.sin(Math.PI / 2 * pos / 100);
          if (!(pos > 99)) return webkitRequestAnimationFrame(move);
        };
        return webkitRequestAnimationFrame(move);
      });
    });
  }

}).call(this);
