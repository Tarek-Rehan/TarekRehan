import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, User, Code, Briefcase, Share2, 
  LogOut, ExternalLink, ShieldCheck, Download, Sun, Moon, Trash2, Info
} from 'lucide-react';


import { usePortfolioData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';

import ProfileEditor from './components/ProfileEditor';
import AboutEditor from './components/AboutEditor';
import SkillsEditor from './components/SkillsEditor';

import ProjectsEditor from './components/ProjectsEditor';
import ExperienceEditor from './components/ExperienceEditor';
import SocialEditor from './components/SocialEditor';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  const { exportData, importData, resetData } = usePortfolioData();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
    } else {
      setError('Invalid access code.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file)
        .then(() => alert('Database restored successfully.'))
        .catch(() => alert('Invalid JSON file.'));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-bg-surface border border-border-base p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <div className="flex justify-center mb-6 text-red-500">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <h1 className="text-3xl text-center mb-2 text-text-primary" style={{ fontFamily: 'var(--font-h)', fontWeight: 'bold' }}>SYSTEM LOGIN</h1>
          <p className="text-center mb-8" style={{ fontFamily: 'var(--font-m)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--amber)', textTransform: 'uppercase' }}>
            Authorization Required
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase tracking-widest mb-2">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 focus:outline-none font-mono transition-all"
                style={{ background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)' }}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-mono uppercase text-center">{error}</p>}
            <button type="submit" className="w-full bg-red-500 text-black font-bold py-3 hover:bg-red-400 transition-colors uppercase tracking-widest text-xs">
              Verify Identity
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/TarekRehan/" className="text-sm text-cyan-500 hover:underline">← Back to site</a>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile',    label: 'Profile & Hero',      icon: User },
    { id: 'about',      label: 'About Manager',       icon: Info },
    { id: 'skills',     label: 'Skills Manager',      icon: Code },
    { id: 'projects',   label: 'Projects Manager',    icon: Briefcase },
    { id: 'experience', label: 'Experience Manager',  icon: Settings },
    { id: 'social',     label: 'Social Links',        icon: Share2 },
  ];

  const activeTabData = tabs.find(t => t.id === activeTab);
  const TabIcon = activeTabData?.icon || User;

  return (
    <div className="h-screen w-full flex flex-row overflow-hidden" style={{ background: 'var(--bg)', fontFamily: 'var(--font-b)' }}>

      {/* ── LEFT SIDEBAR: Navigation only ─────────────────────────── */}
      <aside style={{ width: '56px', background: 'var(--bg2)', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '24px', paddingBottom: '16px', gap: '4px', zIndex: 20 }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
              style={{
                width: '40px', height: '40px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isActive ? 'var(--dim)' : 'transparent',
                border: isActive ? '1px solid var(--amber)' : '1px solid transparent',
                color: isActive ? 'var(--amber)' : 'var(--muted)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                borderRadius: '4px',
                marginBottom: '4px',
              }}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </aside>

      {/* ── RIGHT PANEL: Header bar + Content ─────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top header bar */}
        <header style={{
          height: '56px', flexShrink: 0,
          borderBottom: '1px solid var(--line)',
          background: 'var(--bg2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px',
        }}>
          {/* Left: current module name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TabIcon size={16} color="var(--amber)" />
            <span style={{ fontFamily: 'var(--font-m)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text)' }}>
              {activeTabData?.label}
            </span>
          </div>

          {/* Right: branding + actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 50 }}>
            {/* Branding */}
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--font-h)', fontSize: '13px', fontWeight: 'bold', color: 'var(--text)', letterSpacing: '0.1em' }}>
                PORTFOLIO<span style={{ color: 'var(--amber)' }}>.</span>CMS
              </span>
              <div style={{ fontFamily: 'var(--font-m)', fontSize: '9px', color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                System Online
              </div>
            </div>

            <div style={{ width: '1px', height: '28px', background: 'var(--line)' }} />

            {/* Theme toggle */}
            <button 
              type="button" 
              onClick={toggleTheme} 
              title="Toggle theme" 
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Backup */}
            <button 
              type="button" 
              onClick={exportData} 
              title="Backup data as JSON" 
              style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
            >
              <Download size={16} />
            </button>

            {/* Restore */}
            <div title="Restore from JSON" style={{ position: 'relative', color: 'var(--muted)', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}>
              <Settings size={16} />
              <input 
                type="file" 
                accept=".json" 
                onChange={handleImport} 
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} 
              />
            </div>

            {/* Wipe Data */}
            <button 
              type="button" 
              onClick={() => {
                if (window.confirm('ARE YOU SURE? This will permanently delete all your custom data and restore the default demo data.')) {
                  resetData();
                  alert('Database wiped and reset to default.');
                }
              }} 
              title="Wipe all data (Reset to default)" 
              style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '8px', opacity: 0.7, display: 'flex', alignItems: 'center', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
            >
              <Trash2 size={16} />
            </button>


            {/* Preview site */}
            <a 
              href="/TarekRehan/" 
              target="_blank" 
              rel="noreferrer" 
              title="Preview live site" 
              style={{ color: 'var(--muted)', padding: '8px', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <ExternalLink size={16} />
            </a>

            <div style={{ width: '1px', height: '28px', background: 'var(--line)' }} />

            {/* Disconnect */}
            <button
              type="button"
              onClick={handleLogout}
              style={{
                fontFamily: 'var(--font-m)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em',
                background: 'transparent', border: '1px solid var(--line)', color: 'var(--muted)',
                padding: '6px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                transition: 'all 0.2s', borderRadius: '4px'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              <LogOut size={12} /> Disconnect
            </button>
          </div>
        </header>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '40px 48px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '80px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
              >
                {activeTab === 'profile'    && <ProfileEditor />}
                {activeTab === 'about'      && <AboutEditor />}
                {activeTab === 'skills'     && <SkillsEditor />}
                {activeTab === 'projects'   && <ProjectsEditor />}
                {activeTab === 'experience' && <ExperienceEditor />}
                {activeTab === 'social'     && <SocialEditor />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
