import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../context/DataContext';
import Typewriter from '../components/animations/Typewriter';

export default function Home() {
  const { data } = usePortfolioData();
  const { profile } = data;
  
  const nameParts = profile.name.split(' ');
  const firstName = nameParts[0] || 'Alex';
  const lastName = nameParts.slice(1).join(' ') || 'Mercer';

  const phrases = profile.heroPhrases || [
    profile.title || 'Communication Engineering Graduate',
    'RF & Microwave Systems Engineer',
    'Signal Processing Specialist',
    'Network Infrastructure Architect',
    'Telecommunications Innovator'
  ];

  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let t = 0;
    let animationFrameId;

    function resize() {
      if (c.parentElement) {
        // Leave enough room for the labels (approx 220px total)
        c.width = Math.max(100, Math.min(600, window.innerWidth - 240));
        c.height = 52;
      }
    }
    window.addEventListener('resize', resize);
    resize();

    function tick() {
      animationFrameId = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, c.width, c.height);

      /* grid */
      ctx.strokeStyle = 'rgba(255,62,62,0.06)';
      ctx.lineWidth = .5;
      for(let x=0; x<c.width; x+=40) {
        ctx.beginPath();
        ctx.moveTo(x,0);
        ctx.lineTo(x,c.height);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, c.height/2);
      ctx.lineTo(c.width, c.height/2);
      ctx.stroke();

      /* waveform — composite signal */
      ctx.beginPath();
      const H = c.height, W = c.width;
      for(let x=0; x<W; x++) {
        const p = x/W;
        const s = Math.sin((p+t)*Math.PI*12)*14
                + Math.sin((p+t)*Math.PI*5.3+1)*6
                + Math.sin((p+t)*Math.PI*28)*3;
        const y = H/2 - s;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255,62,62,0.85)';
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 6; 
      ctx.shadowColor = 'rgba(255,62,62,.5)';
      ctx.stroke(); 
      ctx.shadowBlur = 0;
      t += .0045;
    }
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="hero">
      <div className="hero-container">
        
        {/* Left Side: Text */}
        <div className="hero-content">
          <div className="hero-tag">{profile.tagline || 'Signal Carrier · RF Systems · Digital Comms'}</div>
          <h1 className="hero-name">
            {firstName}<br/>
            <em>{lastName}</em>
          </h1>
          <div className="hero-title">
            <Typewriter phrases={phrases} />
          </div>
          <p className="hero-desc">{profile.bio}</p>
          
          <div className="hero-btns">
            <Link className="btn-primary" to="/projects">View Projects</Link>
            <Link className="btn-ghost" to="/contact">Open Channel</Link>
          </div>
        </div>

        {/* Right Side: Image */}
        {profile.photo && (
          <div className="hero-image-wrap">
            <div className="image-accent-ring" />
            <img 
              src={profile.photo} 
              alt="Profile" 
              className="hero-image"
            />
          </div>
        )}
      </div>

      <div id="oscillo">
        <span className="osc-label hidden md:block">SIG &nbsp;LIVE</span>
        <canvas id="osc-canvas" ref={canvasRef}></canvas>
        <span className="osc-label">CH-1 &nbsp;· &nbsp;±3.2 dBm</span>
      </div>
    </section>
  );
}
