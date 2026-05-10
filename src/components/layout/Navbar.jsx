import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleLogoClick = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  return (
    <>
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
      </nav>

      {/* Mobile Menu Overlay - Outside nav to prevent any clipping */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', 
              height: '75vh', // Takes 75% of screen as requested
              background: 'rgba(10, 10, 10, 0.8)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              zIndex: 10000, display: 'flex', flexDirection: 'column',
              padding: '24px', borderBottom: '1px solid var(--amber)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
            }}
          >
            {/* Header Area inside overlay */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingTop: '8px' }}>
              <button 
                onClick={toggleTheme}
                style={{ 
                  padding: '10px 16px', border: '1px solid rgba(255,62,62,0.3)', 
                  background: 'rgba(255,62,62,0.1)', color: 'var(--amber)', 
                  fontFamily: 'var(--font-m)', fontSize: '10px', letterSpacing: '0.2em',
                  display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '4px'
                }}
              >
                {isDark ? <Sun size={14} /> : <Moon size={14} />}
                {isDark ? 'LIT' : 'VOID'}
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent', border: '1px solid var(--amber)',
                  color: 'var(--amber)', width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', borderRadius: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Links List */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '9px', color: 'var(--amber)', letterSpacing: '0.5em', marginBottom: '24px', opacity: 0.6, textAlign: 'center' }}>[ NAVIGATION_CORE ]</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
                {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <NavLink 
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                      onClick={() => setIsOpen(false)}
                      style={({ isActive }) => ({
                        fontFamily: 'var(--font-h)',
                        fontSize: '1.8rem',
                        fontWeight: '900',
                        textDecoration: 'none',
                        color: isActive ? 'var(--amber)' : 'var(--text)',
                        textTransform: 'uppercase',
                        display: 'block',
                        letterSpacing: '0.02em',
                      })}
                    >
                      {item}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center', opacity: 0.3, fontFamily: 'var(--font-m)', fontSize: '8px', letterSpacing: '0.2em' }}>
              SECURE_CONNECTION_ESTABLISHED // CMS_V1.0
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
