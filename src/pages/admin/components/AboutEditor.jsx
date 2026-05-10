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
    <div className="space-y-10">
      <div className="md:pl-24 flex gap-4">
        <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-2 flex-shrink-0"></div>
        <div>
          <h2 className="text-3xl font-heading text-red-500 mb-1">About Page Manager</h2>
          <p className="text-text-muted font-mono text-xs uppercase tracking-[0.2em]">Configure your core professional identity and metrics.</p>
        </div>
      </div>

      <div className="glass p-10 border border-red-500/20 relative space-y-12">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-40" />

        {/* Headline & Bio */}
        <section className="space-y-8">
          <div className="flex gap-4">
            <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
            <div className="flex-1">
              <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-3">Main Headline</label>
              <input
                type="text" name="aboutHeadline" value={profile.aboutHeadline || ''} onChange={handleChange}
                placeholder="e.g., Engineering the Signal Behind the World"
                className="w-full bg-bg-surface/30 border border-line px-5 py-4 text-base focus:border-red-500/50 outline-none transition-colors font-heading tracking-wide"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
            <div className="flex-1">
              <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-3">Biography</label>
              <textarea
                name="bio" value={profile.bio || ''} onChange={handleChange} rows={10}
                className="w-full bg-bg-surface/30 border border-line px-5 py-4 text-base leading-relaxed focus:border-red-500/50 outline-none resize-y transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Statistics Grid */}
        <section>
          <div className="flex justify-between items-end mb-8 pb-4 border-b border-line/50">
            <div className="flex gap-4">
              <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
              <div>
                <h3 className="text-sm font-mono text-red-500/90 uppercase tracking-widest mb-1">
                  Experience Statistics
                </h3>
                <p className="text-[10px] text-muted uppercase font-mono tracking-tighter">Display your key metrics as prominent data points.</p>
              </div>
            </div>
            <button onClick={addStat} className="text-xs font-mono text-red-500 border border-red-500/40 px-5 py-2 hover:bg-red-500/10 transition-colors flex items-center gap-2">
              <Plus size={14} /> ADD METRIC
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(profile.stats || []).map((stat, idx) => (
              <div key={idx} className="flex gap-4 group bg-bg-surface/20 p-6 border border-line hover:border-red-500/20 transition-all">
                <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-4 flex-shrink-0">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-[9px] font-mono text-muted uppercase mb-1">Value</label>
                    <input
                      type="text" value={stat.value} onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                      placeholder="e.g. 11+"
                      className="w-full bg-transparent border-b border-line text-red-500 font-heading text-3xl focus:outline-none focus:border-red-500 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono text-muted uppercase mb-1">Description Label</label>
                    <input
                      type="text" value={stat.label} onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      placeholder="e.g. Years Experience"
                      className="w-full bg-transparent border-none text-xs font-mono text-text-primary uppercase focus:outline-none tracking-widest"
                    />
                  </div>
                </div>
                <button onClick={() => removeStat(idx)} className="opacity-0 group-hover:opacity-100 text-red-500/30 hover:text-red-500 transition-all self-start pt-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
