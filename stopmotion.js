/* Stop-motion hero: swaps three cutout photos in #pose, like the reference edit.
   Long hold on the crossed-arms pose, then fast hard cuts, then loops. */
(function () {
  var img = document.getElementById('pose');
  if (!img) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var base = (img.getAttribute('src') || '').replace(/[^\/]*$/, '');   // e.g. "img/"
  var P = {
    A: base + 'pose-cross.png',        // arms crossed
    B: base + 'pose-standing.png',     // standing front
    C: base + 'eljohn-front.png'       // close front
  };

  // [pose, milliseconds]  (edit these numbers to change the timing)
  var SEQ = [
    ['A', 4400], ['B', 350], ['C', 350], ['B', 300], ['C', 300],
    ['A', 250],  ['B', 250], ['C', 300], ['A', 200], ['B', 200]
  ];
  var TICK = 130;           // a new "photo" every ~130 ms = the stop-motion jitter
  var JIT = 1.5;            // jitter size in px

  var i = 0, t = 0, timer = null, first = true;

  function jitter() {
    var x = (Math.random() * 2 - 1) * JIT, y = (Math.random() * 2 - 1) * JIT;
    img.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
  }

  function tick() {
    var s = SEQ[i];
    if (t === 0) img.src = P[s[0]];
    jitter();
    var wait = Math.min(TICK, s[1] - t);
    t += wait;
    if (t >= s[1]) { i = (i + 1) % SEQ.length; t = 0; }
    timer = setTimeout(tick, wait);
  }

  function start() { if (!timer) tick(); }
  function stop()  { clearTimeout(timer); timer = null; }

  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });

  // preload all poses so cuts never flicker, then begin
  var left = 0;
  Object.keys(P).forEach(function (k) {
    left++;
    var im = new Image();
    im.onload = im.onerror = function () { if (--left === 0) setTimeout(start, 600); };
    im.src = P[k];
  });
})();
