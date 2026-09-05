(() => {
  const canvas = document.createElement('canvas');
  canvas.id = 'snow';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let flakes = [];
  let w = 0, h = 0, dpr = 1;
  const count = () => Math.min(150, Math.max(70, Math.floor((w * h) / 12000)));
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({length: count()}, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.2 + .7, speed: Math.random() * 1.15 + .35,
      drift: (Math.random() - .5) * .45, phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * .55 + .25
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      f.y += f.speed; f.x += f.drift + Math.sin(f.phase + f.y * .008) * .22;
      if (f.y > h + 8) { f.y = -8; f.x = Math.random() * w; }
      if (f.x < -8) f.x = w + 8; if (f.x > w + 8) f.x = -8;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${f.opacity})`; ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize(); window.addEventListener('resize', resize, {passive:true}); draw();
})();
