import { useState } from 'react';
import { usePortfolioData } from '../../../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';

export default function SocialEditor() {
  const { data, updateSection } = usePortfolioData();
  const social = data.social || {};
  const [newTitle, setNewTitle] = useState('');

  const handleChange = (key, value) => {
    const updatedSocial = { ...social, [key]: value };
    updateSection('social', updatedSocial);
  };

  const handleRemove = (key) => {
    const newSocial = { ...social };
    delete newSocial[key];
    updateSection('social', newSocial);
  };

  const handleAdd = () => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;
    const key = trimmedTitle.toLowerCase().replace(/\s+/g, '_');
    
    // Allow adding if key doesn't exist OR is empty in the current state
    const newSocial = { ...social, [key]: '' };
    updateSection('social', newSocial);
    setNewTitle('');
  };

  return (
    <div className="space-y-10">
      <div className="pl-0 md:pl-24 flex gap-4">
        <div className="font-mono text-[10px] text-red-500/40 w-0 md:w-6 text-right pt-2 flex-shrink-0"></div>
        <div>
          <h2 className="text-2xl font-heading text-red-500 mb-2">Social Links</h2>
          <p className="text-text-muted font-mono text-sm uppercase tracking-wider">Manage your social media presence and contact links.</p>
        </div>
      </div>

      <div className="glass p-5 md:p-8 border border-red-500/20 relative space-y-8">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />
        
        {Object.entries(social).map(([key, value]) => {
          if (key === 'email') return null; // Email managed in profile
          return (
            <div key={key} className="flex gap-2 md:gap-4 group">
              <div className="font-mono text-[10px] text-red-500/40 w-0 md:w-6 text-right pt-8 flex-shrink-0"></div>
              <div className="flex-1">
                <label className="block font-mono text-xs text-white uppercase tracking-widest mb-2 flex-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)} URL
                </label>
                <input 
                  type="url" 
                  value={value || ''} 
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-bg-surface border border-white/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-red-500 font-mono text-sm"
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

        <div className="pt-6 mt-6 border-t border-red-500/20 flex flex-col md:flex-row items-stretch md:items-end gap-4">
          <div className="flex-1">
            <label className="block font-mono text-xs text-white uppercase tracking-widest mb-2">Add Custom Link</label>
            <input 
              type="text" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-bg-surface border border-white/20 rounded-none px-4 py-3 text-white focus:outline-none focus:border-red-500 font-mono text-sm"
              placeholder="e.g. Twitter, Medium"
            />
          </div>
          <button 
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 px-6 py-4 md:py-3 bg-red-500 hover:bg-red-600 text-bg-base font-mono text-xs tracking-widest uppercase transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Link
          </button>
        </div>

      </div>
    </div>
  );
}
