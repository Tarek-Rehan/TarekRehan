import { Plus, Trash2 } from 'lucide-react';
import { usePortfolioData } from '../../../context/DataContext';

export default function ExperienceEditor() {
  const { data, updateSection } = usePortfolioData();
  const experience = Array.isArray(data.experience) ? data.experience : [];

  const handleAdd = () => {
    updateSection('experience', [...experience, {
      id: `exp-${Date.now()}`,
      title: 'New Position',
      organization: 'Company Name',
      location: 'Remote',
      startDate: '2024',
      endDate: 'Present',
      description: 'Description of role...'
    }]);
  };

  const handleUpdate = (index, field, value) => {
    const e = [...experience];
    e[index] = { ...e[index], [field]: value };
    updateSection('experience', e);
  };

  const handleRemove = (index) => {
    const e = [...experience];
    e.splice(index, 1);
    updateSection('experience', e);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="md:pl-24 flex gap-4">
          <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-2 flex-shrink-0"></div>
          <div>
            <h2 className="text-2xl font-heading text-red-500 mb-2">Experience Manager</h2>
            <p className="text-text-muted font-mono text-sm uppercase tracking-wider">Manage your career history timeline.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn-primary flex items-center justify-center gap-2"
          style={{ padding: '10px 20px', fontSize: '10px' }}
        >
          <Plus className="w-4 h-4" /> Add Entry
        </button>
      </div>

      <div className="space-y-8">
        {experience.map((item, idx) => (
          <div key={item.id || idx} className="flex gap-4 group">
            <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-8 flex-shrink-0">
              {(idx + 1).toString().padStart(2, '0')}
            </div>
            <div className="flex-1 glass p-6 border border-red-500/20 relative">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />

              <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-500/20">
                <h3 className="font-heading text-lg text-blue-400">LOG_ENTRY: {item.id || idx}</h3>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-red-500/50"
                  title="Delete Entry"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex gap-4">
                    <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                    <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Role / Title</label>
                  </div>
                  <input
                    type="text" value={item.title || ''}
                    onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                    className="w-full border-b px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                    style={{ background: 'var(--bg2)', borderColor: 'var(--line)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                    <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Organization</label>
                  </div>
                  <input
                    type="text" value={item.organization || ''}
                    onChange={(e) => handleUpdate(idx, 'organization', e.target.value)}
                    className="w-full border-b px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                    style={{ background: 'var(--bg2)', borderColor: 'var(--line)', color: 'var(--text)' }}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="flex gap-4">
                    <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                    <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Location</label>
                  </div>
                  <input
                    type="text" value={item.location || ''}
                    onChange={(e) => handleUpdate(idx, 'location', e.target.value)}
                    className="w-full border-b px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                    style={{ background: 'var(--bg2)', borderColor: 'var(--line)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                    <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Start Date</label>
                  </div>
                  <input
                    type="text" value={item.startDate || ''}
                    onChange={(e) => handleUpdate(idx, 'startDate', e.target.value)}
                    className="w-full border-b px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                    style={{ background: 'var(--bg2)', borderColor: 'var(--line)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                    <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">End Date</label>
                  </div>
                  <input
                    type="text" value={item.endDate || ''}
                    onChange={(e) => handleUpdate(idx, 'endDate', e.target.value)}
                    className="w-full border-b px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                    style={{ background: 'var(--bg2)', borderColor: 'var(--line)', color: 'var(--text)' }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex gap-4">
                <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                <div className="flex-1">
                  <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2">Description</label>
                  <textarea
                    value={item.description || ''} rows={3}
                    onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
                    className="w-full border px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm resize-y"
                    style={{ background: 'var(--bg2)', borderColor: 'var(--line)', color: 'var(--text)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {experience.length === 0 && (
          <div className="text-center py-12 glass border border-red-500/20 border-dashed">
            <p className="text-red-500/60 font-mono uppercase tracking-widest text-sm">NO EXPERIENCE LOGS DETECTED.</p>
          </div>
        )}
      </div>
    </div>
  );
}
