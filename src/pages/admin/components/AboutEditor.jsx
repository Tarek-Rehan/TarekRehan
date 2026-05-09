import { usePortfolioData } from '../../../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';

export default function AboutEditor() {
  const { data, updateSection } = usePortfolioData();
  const { profile } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('profile', { ...profile, [name]: value });
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...(profile.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    updateSection('profile', { ...profile, stats: newStats });
  };

  const addStat = () => {
    updateSection('profile', { 
      ...profile, 
      stats: [...(profile.stats || []), { label: '', value: '' }] 
    });
  };

  const removeStat = (index) => {
    const newStats = (profile.stats || []).filter((_, i) => i !== index);
    updateSection('profile', { ...profile, stats: newStats });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading text-red-500 mb-2">About Page Manager</h2>
        <p className="text-text-muted font-mono text-sm uppercase tracking-wider">Edit your About section headline, bio, and statistics.</p>
      </div>

      <div className="glass p-8 border border-red-500/20 relative space-y-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />
        
        {/* Headline & Bio */}
        <section className="space-y-6">
          <div>
            <label className="block font-mono text-[10px] text-red-500/70 uppercase tracking-widest mb-2">Main Headline</label>
            <input 
              type="text" name="aboutHeadline" value={profile.aboutHeadline || ''} onChange={handleChange}
              placeholder="e.g., Engineering the Signal Behind the World"
              className="w-full bg-bg-surface/30 border border-line px-4 py-2.5 text-sm focus:border-red-500/50 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] text-red-500/70 uppercase tracking-widest mb-2">Biography</label>
            <textarea 
              name="bio" value={profile.bio || ''} onChange={handleChange} rows={6}
              className="w-full bg-bg-surface/30 border border-line px-4 py-2.5 text-sm focus:border-red-500/50 outline-none resize-y transition-colors"
            />
          </div>
        </section>

        {/* Statistics Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-mono text-red-500/90 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-red-500/30" /> Experience Statistics
            </h3>
            <button onClick={addStat} className="text-[10px] font-mono text-red-500 border border-red-500/30 px-3 py-1 hover:bg-red-500/10 transition-colors flex items-center gap-1">
              <Plus size={12} /> ADD STAT
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(profile.stats || []).map((stat, idx) => (
              <div key={idx} className="flex gap-2 group bg-bg-surface/20 p-4 border border-line">
                <div className="flex-1 space-y-3">
                  <input 
                    type="text" value={stat.value} onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 11+)"
                    className="w-full bg-transparent border-b border-line text-red-500 font-heading text-xl focus:outline-none focus:border-red-500"
                  />
                  <input 
                    type="text" value={stat.label} onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    placeholder="Label (e.g. Years Experience)"
                    className="w-full bg-transparent border-none text-[10px] font-mono text-muted uppercase focus:outline-none"
                  />
                </div>
                <button onClick={() => removeStat(idx)} className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all self-start pt-1">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
