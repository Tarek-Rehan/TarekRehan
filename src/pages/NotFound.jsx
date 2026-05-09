import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function NotFound() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notfound-container">
      <div className={`glitch-wrapper ${isGlitching ? 'active-glitch' : ''}`}>
        <div className="glitch-text" data-text="404">404</div>
        <h1 className="notfound-title">SYSTEM_FAILURE: ROUTE_NOT_FOUND</h1>
        <p className="notfound-desc">
          The requested data packet has been intercepted or does not exist. 
          The link you followed may be broken, or the page may have been removed.
        </p>
        
        <div className="notfound-actions">
          <Link to="/" className="btn-primary">
            <Home size={18} style={{ marginRight: '8px' }} />
            RETURN_TO_BASE
          </Link>
          <button onClick={() => window.location.reload()} className="btn-ghost">
            <RefreshCw size={18} style={{ marginRight: '8px' }} />
            RESCAN_SECTOR
          </button>
        </div>
      </div>

      <div className="error-code-bg">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="error-line">
            ERROR_0x{Math.random().toString(16).substr(2, 8).toUpperCase()}
          </div>
        ))}
      </div>

      <style>{`
        .notfound-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          color: var(--text);
          padding: 24px;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        .glitch-wrapper {
          position: relative;
          z-index: 2;
          max-width: 600px;
        }

        .glitch-text {
          font-family: var(--font-h);
          font-size: clamp(6rem, 15vw, 12rem);
          font-weight: 900;
          color: var(--amber);
          line-height: 1;
          margin-bottom: 24px;
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 62, 62, 0.75),
                      -0.025em -0.05em 0 rgba(0, 184, 255, 0.75),
                      0.025em 0.05em 0 rgba(0, 255, 157, 0.75);
        }

        .active-glitch .glitch-text {
          animation: glitch-404 500ms infinite;
        }

        @keyframes glitch-404 {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 62, 62, 0.75), -0.05em -0.025em 0 rgba(0, 184, 255, 0.75), -0.025em 0.05em 0 rgba(0, 255, 157, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 62, 62, 0.75), -0.05em -0.025em 0 rgba(0, 184, 255, 0.75), -0.025em 0.05em 0 rgba(0, 255, 157, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 62, 62, 0.75), 0.025em 0.025em 0 rgba(0, 184, 255, 0.75), -0.05em -0.05em 0 rgba(0, 255, 157, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 62, 62, 0.75), 0.025em 0.025em 0 rgba(0, 184, 255, 0.75), -0.05em -0.05em 0 rgba(0, 255, 157, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 62, 62, 0.75), 0.05em 0 0 rgba(0, 184, 255, 0.75), 0 -0.05em 0 rgba(0, 255, 157, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 62, 62, 0.75), 0.05em 0 0 rgba(0, 184, 255, 0.75), 0 -0.05em 0 rgba(0, 255, 157, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 62, 62, 0.75), -0.025em -0.025em 0 rgba(0, 184, 255, 0.75), -0.025em -0.05em 0 rgba(0, 255, 157, 0.75);
          }
        }

        .notfound-title {
          font-family: var(--font-h);
          font-size: 1.5rem;
          letter-spacing: 0.2em;
          color: var(--blue);
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .notfound-desc {
          font-family: var(--font-m);
          font-size: 14px;
          line-height: 1.8;
          color: var(--muted);
          margin-bottom: 40px;
        }

        .notfound-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .error-code-bg {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          opacity: 0.03;
          pointer-events: none;
          user-select: none;
          font-family: var(--font-m);
          font-size: 10px;
          z-index: 1;
        }

        .error-line {
          white-space: nowrap;
        }

        @media (max-width: 600px) {
          .notfound-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
