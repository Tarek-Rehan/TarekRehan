import { useState } from 'react';
import { usePortfolioData } from '../../../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';

export default function SocialEditor() {
  const { data, updateSection } = usePortfolioData();
  const social = data.social || {};
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (key, value) => {
    updateSection('social', { ...social, [key]: value });
  };

  const handleRemove = (key) => {
    const newSocial = { ...social };
    delete newSocial[key];
    updateSection('social', newSocial);
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const key = newTitle.trim().toLowerCase().replace(/\s+/g, '_');
    if (social[key] !== undefined) return;
    
    updateSection('social', { ...social, [key]: '' });
    setNewTitle('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading text-red-500 mb-2">Social Links</h2>
        <p className="text-text-muted font-mono text-sm uppercase tracking-wider">Manage your social media presence and contact links.</p>
      </div>

      <div className="glass p-6 rounded-2xl space-y-6 max-w-2xl border border-red-500/20">
        
        {Object.entries(social).map(([key, value]) => {
          if (key === 'email') return null; // Email managed in profile
          return (
            <div key={key} className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)} URL
                </label>
                <input 
                  type="url" 
                  value={value || ''} 
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-bg-surface border border-border-base rounded-none px-4 py-3 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                  placeholder={`https://${key}.com/...`}
                />
              </div>
              <button 
                onClick={() => handleRemove(key)}
                className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                title="Remove Link"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          );
        })}

        <div className="pt-6 mt-6 border-t border-red-500/20 flex items-end gap-4">
          <div className="flex-1">
            <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2">Add Custom Link</label>
            <input 
              type="text" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-bg-surface border border-border-base rounded-none px-4 py-3 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
              placeholder="e.g. Twitter, Medium"
            />
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-bg-base font-mono text-xs tracking-widest uppercase transition-colors"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

      </div>
    </div>
  );
}
