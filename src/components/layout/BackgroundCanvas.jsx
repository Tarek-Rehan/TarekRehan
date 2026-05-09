import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let W, H, frame = 0;
    let animationFrameId;
    let mx = 0, my = 0;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    function resize() {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
      buildStars();
      buildHex();
    }
    window.addEventListener('resize', resize);

    /* ── STARS ─────────────────────────────── */
    let stars = [];
    function buildStars() {
      stars = Array.from({length: 220}, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.018,
      }));
    }

    /* ── HEX GRID ──────────────────────────── */
    let hexPts = [];
    function buildHex() {
      hexPts = [];
      const S = 52, W2 = S * Math.sqrt(3), H2 = S * 1.5;
      for (let row = -1; row < H / H2 + 2; row++) {
        for (let col = -1; col < W / W2 + 2; col++) {
          const ox = (row % 2) * (W2 / 2);
          const cx = col * W2 + ox, cy = row * H2;
          hexPts.push({cx, cy, s: S});
        }
      }
    }

    function drawHex() {
      ctx.strokeStyle = 'rgba(255,62,62,0.028)';
      ctx.lineWidth = .6;
      hexPts.forEach(({cx, cy, s}) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = Math.PI / 180 * (60 * i - 30);
          const px = cx + s * Math.cos(a), py = cy + s * Math.sin(a);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      });
    }

    /* ── RADAR STATIONS ────────────────────── */
    const TOWER_DEF = [
      {fx:.10, fy:.20}, {fx:.82, fy:.12}, {fx:.55, fy:.72},
      {fx:.28, fy:.85}, {fx:.90, fy:.68}, {fx:.48, fy:.35},
    ];
    let towers = [];
    function buildTowers() {
      towers = TOWER_DEF.map(t => ({
        x: t.fx * W, y: t.fy * H,
        angle: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.006,
        sweepLen: Math.PI * 0.55,
        radius: 120 + Math.random() * 80,
        color: Math.random() < 0.35 ? '0,184,255' : '255,62,62',
        rings: [{r:0, a:1}],
        ringTimer: 0,
      }));
    }

    function drawTowers() {
      towers.forEach(t => {
        t.angle += t.speed;
        t.ringTimer++;
        if (t.ringTimer > 90) { t.rings.push({r:0,a:.8}); t.ringTimer=0; }

        /* Radar sweep fill */
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, t.radius, t.angle - t.sweepLen, t.angle);
        ctx.closePath();
        const grd = ctx.createRadialGradient(0,0,0,0,0,t.radius);
        grd.addColorStop(0, `rgba(${t.color},0.10)`);
        grd.addColorStop(1, `rgba(${t.color},0.01)`);
        ctx.fillStyle = grd;
        ctx.fill();

        /* Sweep leading edge */
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(Math.cos(t.angle)*t.radius, Math.sin(t.angle)*t.radius);
        ctx.strokeStyle = `rgba(${t.color},0.55)`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 8; ctx.shadowColor = `rgba(${t.color},0.5)`;
        ctx.stroke(); ctx.shadowBlur = 0;
        ctx.restore();

        /* Expanding rings */
        t.rings.forEach(rg => { rg.r += 0.9; rg.a -= 0.008; });
        t.rings = t.rings.filter(rg => rg.a > 0);
        t.rings.forEach(rg => {
          ctx.beginPath();
          ctx.arc(t.x, t.y, rg.r, 0, Math.PI*2);
          ctx.strokeStyle = `rgba(${t.color},${rg.a * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        /* Tower dot */
        ctx.beginPath();
        ctx.arc(t.x, t.y, 3, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${t.color},0.9)`;
        ctx.shadowBlur = 10; ctx.shadowColor = `rgba(${t.color},0.8)`;
        ctx.fill(); ctx.shadowBlur = 0;

        /* Tower crosshair */
        ctx.strokeStyle = `rgba(${t.color},0.3)`;
        ctx.lineWidth = .5;
        [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy]) => {
          ctx.beginPath();
          ctx.moveTo(t.x+dx*6,t.y+dy*6);
          ctx.lineTo(t.x+dx*14,t.y+dy*14);
          ctx.stroke();
        });
      });
    }

    /* ── SATELLITE ARCS ────────────────────── */
    const SATS = [
      {t:0,speed:.0018,h:.18,color:'0,184,255'},
      {t:.4,speed:.0011,h:.08,color:'255,62,62'},
      {t:.7,speed:.0025,h:.28,color:'0,184,255'},
    ];

    function drawSatellites() {
      SATS.forEach(s => {
        s.t = (s.t + s.speed) % 1;
        const x = s.t * W;
        /* parabolic arc */
        const peakY = H * s.h;
        const baseY = -40;
        const frac  = 4 * s.t * (1 - s.t);
        const y     = baseY + frac * (peakY - baseY);

        /* trail */
        const TRAIL = 80;
        for (let i = 0; i < TRAIL; i++) {
          const tp = s.t - (i / TRAIL) * 0.12;
          if (tp < 0) continue;
          const xt = tp * W;
          const ft = 4 * tp * (1 - tp);
          const yt = baseY + ft * (peakY - baseY);
          const a  = (1 - i / TRAIL) * 0.35;
          ctx.beginPath();
          ctx.arc(xt, yt, .8, 0, Math.PI*2);
          ctx.fillStyle = `rgba(${s.color},${a})`;
          ctx.fill();
        }

        /* satellite body */
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${s.color},1)`;
        ctx.shadowBlur = 12; ctx.shadowColor = `rgba(${s.color},.8)`;
        ctx.fill(); ctx.shadowBlur = 0;

        /* signal beam to nearest tower */
        let nearest = null, nd = Infinity;
        towers.forEach(t => {
          const d = Math.hypot(t.x - x, t.y - y);
          if (d < nd) { nd = d; nearest = t; }
        });
        if (nearest && nd < 420) {
          const lineAlpha = (1 - nd/420) * 0.22;
          ctx.beginPath();
          ctx.moveTo(x, y); ctx.lineTo(nearest.x, nearest.y);
          ctx.strokeStyle = `rgba(${s.color},${lineAlpha})`;
          ctx.setLineDash([4, 8]); ctx.lineWidth = .8;
          ctx.stroke(); ctx.setLineDash([]);
        }
      });
    }

    /* ── NODES ─────────────────────────────── */
    const N = 80;
    const nodes = Array.from({length: N}, () => ({
      x: 0, y: 0, vx:0, vy:0, r:0, phase:0, lit: 0,
    }));
    function buildNodes() {
      nodes.forEach(n => {
        n.x = Math.random() * W; n.y = Math.random() * H;
        n.vx = (Math.random()-.5)*.38; n.vy = (Math.random()-.5)*.38;
        n.r  = 1.4 + Math.random() * 2.2;
        n.phase = Math.random() * Math.PI * 2;
        n.lit = 0;
      });
    }

    /* ── SIGNAL PULSES (data packets on edges) */
    const pulses = [];
    let pulseSpawn = 0;

    function spawnPulse() {
      const MAXD = 145;
      let tries = 0;
      while (tries++ < 20) {
        const i = Math.floor(Math.random() * N);
        const j = Math.floor(Math.random() * N);
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx*dx+dy*dy);
        if (d > MAXD) continue;
        pulses.push({ ni:i, nj:j, t:0, speed:.008+Math.random()*.012,
                      col: Math.random()<.3 ? '0,184,255' : '255,62,62' });
        break;
      }
    }

    function drawEdgesAndPulses() {
      const MAXD = 145;
      /* edges */
      for (let i=0;i<N;i++) {
        for (let j=i+1;j<N;j++) {
          const a=nodes[i], b=nodes[j];
          const dx=a.x-b.x, dy=a.y-b.y, d2=dx*dx+dy*dy;
          if (d2 > MAXD*MAXD) continue;
          const t = 1 - Math.sqrt(d2)/MAXD;
          const bright = Math.max(a.lit, b.lit);
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle = `rgba(255,62,62,${t*(0.12+bright*0.18)})`;
          ctx.lineWidth = .55 + bright*.5;
          ctx.stroke();
        }
      }
      /* pulses */
      for (let i = pulses.length-1; i>=0; i--) {
        const p = pulses[i];
        p.t += p.speed;
        if (p.t >= 1) { pulses.splice(i,1); continue; }
        const a = nodes[p.ni], b = nodes[p.nj];
        const dx=a.x-b.x,dy=a.y-b.y;
        if (dx*dx+dy*dy > MAXD*MAXD*1.3) { pulses.splice(i,1); continue; }
        const px = a.x + (b.x-a.x)*p.t;
        const py = a.y + (b.y-a.y)*p.t;

        for (let k=0;k<6;k++) {
          const kt = Math.max(0, p.t - k*.015);
          const kx = a.x+(b.x-a.x)*kt, ky = a.y+(b.y-a.y)*kt;
          ctx.beginPath(); ctx.arc(kx,ky,2.5-k*.35,0,Math.PI*2);
          ctx.fillStyle = `rgba(${p.col},${(1-k/6)*.55})`;
          ctx.fill();
        }
        ctx.beginPath(); ctx.arc(px,py,2.8,0,Math.PI*2);
        ctx.fillStyle = `rgba(${p.col},1)`;
        ctx.shadowBlur = 10; ctx.shadowColor = `rgba(${p.col},.9)`;
        ctx.fill(); ctx.shadowBlur = 0;

        nodes[p.nj].lit = Math.min(1, nodes[p.nj].lit + .04);
      }
    }

    function drawNodes() {
      nodes.forEach(n => {
        n.lit = Math.max(0, n.lit - .015);
        const col = n.lit > .1 ? '0,184,255' : '255,62,62';
        const glow = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*5);
        glow.addColorStop(0,`rgba(${col},${0.18 + n.lit*.25})`);
        glow.addColorStop(1,`rgba(${col},0)`);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r*5,0,Math.PI*2);
        ctx.fillStyle = glow; ctx.fill();

        const pulse = Math.sin(n.phase) * .6;
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r+pulse,0,Math.PI*2);
        ctx.fillStyle = `rgba(${col},${0.7+n.lit*.3})`;
        ctx.shadowBlur = 5+n.lit*8; ctx.shadowColor = `rgba(${col},.8)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });
    }

    /* ── CURSOR DISTORTION FIELD ─────────────── */
    function applyCursor() {
      const REPEL = 90, PULL = 200;
      nodes.forEach(n => {
        n.phase += .016;
        const dx=n.x-mx, dy=n.y-my, d=Math.sqrt(dx*dx+dy*dy);
        if (d > 0 && d < REPEL) {
          const f = .18*(1-d/REPEL);
          n.vx += (dx/d)*f; n.vy += (dy/d)*f;
        } else if (d > 0 && d < PULL) {
          const f = .006*(1-d/PULL);
          n.vx -= (dx/d)*f; n.vy -= (dy/d)*f;
        }
        n.vx *= .976; n.vy *= .976;
        n.x += n.vx; n.y += n.vy;
        if (n.x<0||n.x>W) n.vx*=-1;
        if (n.y<0||n.y>H) n.vy*=-1;
      });

      if (mx > 0) {
        const rg = ctx.createRadialGradient(mx,my,0,mx,my,REPEL*1.4);
        rg.addColorStop(0,'rgba(255,62,62,0.06)');
        rg.addColorStop(1,'rgba(255,62,62,0)');
        ctx.beginPath(); ctx.arc(mx,my,REPEL*1.4,0,Math.PI*2);
        ctx.fillStyle = rg; ctx.fill();
      }
    }

    /* Removed click rings per request */

    /* ── HORIZON GLOW ──────────────────────── */
    function drawHorizon() {
      const grad = ctx.createLinearGradient(0, H*.6, 0, H);
      grad.addColorStop(0,'rgba(255,40,0,0)');
      grad.addColorStop(1,'rgba(255,20,0,0.055)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, H*.6, W, H*.4);
    }

    function tick() {
      animationFrameId = requestAnimationFrame(tick);
      frame++;
      ctx.clearRect(0,0,W,H);

      stars.forEach(s => {
        s.phase += s.speed;
        const a = 0.15 + Math.sin(s.phase) * 0.12;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(200,220,255,${a})`; ctx.fill();
      });

      drawHex();
      drawHorizon();
      drawSatellites();
      drawTowers();
      applyCursor();
      drawEdgesAndPulses();
      drawNodes();
      drawNodes();

      pulseSpawn++;
      if (pulseSpawn > 18) { spawnPulse(); pulseSpawn=0; }
    }

    resize();
    buildTowers();
    buildNodes();
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="bgc" ref={canvasRef}></canvas>;
}
