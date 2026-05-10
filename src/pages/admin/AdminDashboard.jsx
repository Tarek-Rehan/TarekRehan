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
          className="w-full max-w-md bg-bg-surface border border-border-base p-6 md:p-8 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50" />
          <div className="flex justify-center mb-4 md:mb-6 text-red-500">
            <ShieldCheck className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h1 className="text-2xl md:text-3xl text-center mb-2 text-text-primary" style={{ fontFamily: 'var(--font-h)', fontWeight: 'bold' }}>SYSTEM LOGIN</h1>
          <p className="text-center mb-6 md:mb-8" style={{ fontFamily: 'var(--font-m)', fontSize: '10px', mdFontSize: '11px', letterSpacing: '0.2em', color: 'var(--amber)', textTransform: 'uppercase' }}>
            Authorization Required
          </p>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-[9px] font-mono text-text-muted uppercase tracking-widest mb-2">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 md:py-3 focus:outline-none font-mono transition-all text-sm"
                style={{ background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)' }}
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-[10px] font-mono uppercase text-center">{error}</p>}
            <button type="submit" className="w-full bg-red-500 text-black font-bold py-3 hover:bg-red-400 transition-colors uppercase tracking-widest text-[10px] md:text-xs">
              Verify Identity
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/TarekRehan/" className="text-xs text-cyan-500 hover:underline">← Back to site</a>
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
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-bg-base font-sans">

      {/* ── MOBILE HEADER (Visible on mobile only) ────────────────── */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-line bg-bg-surface z-50">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TabIcon size={16} color="var(--amber)" />
          <span style={{ fontFamily: 'var(--font-m)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text)' }}>
            {activeTabData?.label}
          </span>
        </div>
        <div className="font-heading font-bold text-xs tracking-widest">
          CMS<span className="text-red-500">.</span>V1
        </div>
      </div>

      {/* ── SIDEBAR / NAV BAR ────────────────────────────────────── */}
      <aside className="w-full md:w-[56px] h-[56px] md:h-full bg-bg-surface border-t md:border-t-0 md:border-r border-line flex flex-row md:flex-col items-center justify-around md:justify-start md:pt-6 md:pb-4 gap-1 md:gap-2 z-50 order-last md:order-first overflow-x-auto md:overflow-x-hidden no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
              className={`w-12 h-10 md:w-10 md:h-10 flex items-center justify-center transition-all rounded-md flex-shrink-0 ${
                isActive ? 'bg-red-500/10 border border-red-500 text-red-500' : 'text-muted hover:text-text-primary'
              }`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </aside>

      {/* ── MAIN CONTENT AREA ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Desktop Header Bar (Hidden on mobile) */}
        <header className="hidden md:flex h-14 border-b border-line bg-bg-surface items-center justify-between px-7 shrink-0">
          <div className="flex items-center gap-3">
            <TabIcon size={16} color="var(--amber)" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-text-primary">
              {activeTabData?.label}
            </span>
          </div>

          <div className="flex items-center gap-5 relative z-50">
            <div className="text-right">
              <span className="font-heading text-sm font-bold tracking-tight">
                PORTFOLIO<span className="text-red-500">.</span>CMS
              </span>
              <div className="font-mono text-[9px] text-blue-400 uppercase tracking-widest">System Online</div>
            </div>

            <div className="w-px h-7 bg-line" />

            <div className="flex items-center gap-1">
              <button onClick={toggleTheme} title="Toggle theme" className="p-2 text-muted hover:text-red-500 transition-colors">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button onClick={exportData} title="Backup" className="p-2 text-muted hover:text-red-500 transition-colors">
                <Download size={16} />
              </button>
              <button onClick={usePortfolioData().syncWithFile} title="Sync with defaultData.json" className="p-2 text-blue-400 hover:text-blue-500 transition-colors">
                <Settings size={16} />
              </button>
              <div className="relative p-2 text-muted hover:text-red-500 transition-colors">
                <Share2 size={16} />
                <input type="file" accept=".json" onChange={handleImport} className="absolute inset-0 opacity-0 cursor-pointer" title="Import JSON" />
              </div>
              <button 
                onClick={resetData} 
                title="Wipe & Reset" className="p-2 text-red-500/60 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
              <a href="/TarekRehan/" target="_blank" rel="noreferrer" title="Live Site" className="p-2 text-muted hover:text-red-500">
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="w-px h-7 bg-line" />

            <button
              onClick={handleLogout}
              className="font-mono text-[10px] uppercase border border-line px-4 py-1.5 rounded hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-2"
            >
              <LogOut size={12} /> Disconnect
            </button>
          </div>
        </header>

        {/* Dynamic Mobile Action Bar (Mobile only) */}
        <div className="md:hidden flex items-center justify-between px-4 py-2 bg-bg-surface/50 border-b border-line backdrop-blur-sm">
           <div className="flex items-center gap-1">
             <button onClick={toggleTheme} className="p-2 text-muted"><Sun size={14} /></button>
             <button onClick={exportData} className="p-2 text-muted"><Download size={14} /></button>
             <button onClick={usePortfolioData().syncWithFile} className="p-2 text-blue-400"><Settings size={14} /></button>
             <div className="relative p-2 text-muted">
               <Share2 size={14} />
               <input type="file" accept=".json" onChange={handleImport} className="absolute inset-0 opacity-0 cursor-pointer" />
             </div>
             <button onClick={resetData} className="p-2 text-red-500/60"><Trash2 size={14} /></button>
           </div>
           <button onClick={handleLogout} className="text-[9px] uppercase font-mono text-red-500 font-bold border border-red-500/30 px-3 py-1">Logout</button>
        </div>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 md:p-12">
          <div className="max-w-[1000px] mx-auto pb-24">
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
