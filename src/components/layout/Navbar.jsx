import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { usePortfolioData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data } = usePortfolioData();
  const nameParts = data.profile.name.split(' ');
  const firstName = nameParts[0]?.toUpperCase() || 'ALEX';
  const lastName = nameParts.slice(1).join('').toUpperCase() || 'MERCER';

  const [isOpen, setIsOpen] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLogoClick = (e) => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);

    // Secret Handshake: Alt + Click triggers access check
    if (e.altKey) {
      const pin = prompt("ACCESS_REQUIRED: ENTER_KEY");
      if (pin === "2026") { // Set your own PIN here
        localStorage.setItem('TR_ADMIN_AUTH', 'true');
        window.location.href = "/TarekRehan/admin";
      } else {
        localStorage.removeItem('TR_ADMIN_AUTH');
      }
    }
  };

  return (
    <nav>
      <NavLink 
        className={`nav-logo ${isGlitching ? 'glitch-logo' : ''}`} 
        to="/" 
        onClick={handleLogoClick}
      >
        {firstName}<span>.</span>{lastName}
      </NavLink>
      
      {/* Desktop Links */}
      <ul className="nav-links">
        <li><NavLink to="/about" aria-label="Go to About page">About</NavLink></li>
        <li><NavLink to="/skills" aria-label="Go to Skills page">Skills</NavLink></li>
        <li><NavLink to="/projects" aria-label="Go to Projects page">Projects</NavLink></li>
        <li><NavLink to="/experience" aria-label="Go to Experience page">Experience</NavLink></li>
        <li><NavLink to="/contact" aria-label="Go to Contact page">Contact</NavLink></li>
      </ul>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button
          onClick={toggleTheme}
          style={{ background: 'transparent', border: 'none', color: 'var(--amber)', cursor: 'pointer' }}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <ul className="mobile-nav-links" style={{
          position: 'absolute', top: '70px', right: '24px', background: 'var(--nav-bg)',
          padding: '24px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '20px',
          zIndex: 1000, minWidth: '200px', backdropFilter: 'blur(10px)'
        }}>
          <li><NavLink to="/about" onClick={()=>setIsOpen(false)} aria-label="Go to About page">About</NavLink></li>
          <li><NavLink to="/skills" onClick={()=>setIsOpen(false)} aria-label="Go to Skills page">Skills</NavLink></li>
          <li><NavLink to="/projects" onClick={()=>setIsOpen(false)} aria-label="Go to Projects page">Projects</NavLink></li>
          <li><NavLink to="/experience" onClick={()=>setIsOpen(false)} aria-label="Go to Experience page">Experience</NavLink></li>
          <li><NavLink to="/contact" onClick={()=>setIsOpen(false)} aria-label="Go to Contact page">Contact</NavLink></li>
        </ul>
      )}
    </nav>
  );
}
