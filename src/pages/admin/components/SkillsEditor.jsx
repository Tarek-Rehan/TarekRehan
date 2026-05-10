import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { usePortfolioData } from '../../../context/DataContext';

export default function SkillsEditor() {
  const { data, updateSection } = usePortfolioData();
  const skills = Array.isArray(data.skills) ? data.skills : [];

  const handleAddCategory = () => {
    updateSection('skills', [...skills, { category: 'NEW CATEGORY', animType: 'none', items: [] }]);
  };

  const handleUpdateCategory = (index, value) => {
    const s = [...skills];
    s[index] = { ...s[index], category: value };
    updateSection('skills', s);
  };

  const handleAnimType = (index, value) => {
    const s = [...skills];
    s[index] = { ...s[index], animType: value };
    updateSection('skills', s);
  };

  const handleRemoveCategory = (index) => {
    const s = [...skills];
    s.splice(index, 1);
    updateSection('skills', s);
  };

  const handleAddItem = (catIdx) => {
    const s = [...skills];
    s[catIdx].items.push({ name: 'New Skill', level: 50 });
    updateSection('skills', s);
  };

  const handleUpdateItem = (catIdx, itemIdx, field, value) => {
    const s = [...skills];
    s[catIdx].items[itemIdx][field] = value;
    updateSection('skills', s);
  };

  const handleRemoveItem = (catIdx, itemIdx) => {
    const s = [...skills];
    s[catIdx].items.splice(itemIdx, 1);
    updateSection('skills', s);
  };

  const animOptions = [
    ['none', 'No Animation'], ['spectrum', '1 – Spectrum Bars'], ['sine-wave', '2 – Sine Wave'],
    ['radar', '3 – Radar Sweep'], ['binary', '4 – Binary Matrix'], ['constellation', '5 – QAM Constellation'],
    ['pulse', '6 – Radar Pulse'], ['packets', '7 – Data Packets'], ['fiber', '8 – Fiber Optic'],
    ['antenna', '9 – Antenna Arrays'], ['eye-diagram', '10 – Eye Diagram'], ['mesh', '11 – Network Mesh'],
    ['cellular', '12 – Cellular Grid'], ['fm', '13 – Frequency Mod'], ['am', '14 – Amplitude Mod'],
    ['morse', '15 – Morse Code'], ['satellite', '16 – Satellite Orbit'], ['rfid', '17 – RFID Waves'],
    ['phase', '18 – Phase Shift'], ['laser', '19 – Laser Beam'], ['smith-chart', '20 – Smith Chart'],
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="md:pl-24 flex gap-4">
          <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-2 flex-shrink-0"></div>
          <div>
            <h2 className="text-2xl font-heading text-red-500 mb-2">Skills Manager</h2>
            <p className="text-text-muted font-mono text-sm uppercase tracking-wider">Group your technical skills into categories.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="btn-primary flex items-center justify-center gap-2"
          style={{ padding: '10px 20px', fontSize: '10px' }}
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="space-y-8">
        {skills.map((category, catIdx) => (
          <div key={catIdx} className="glass p-6 border border-red-500/20 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />

            {/* Category header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-red-500/20">
              <input
                type="text"
                value={category.category || ''}
                onChange={(e) => handleUpdateCategory(catIdx, e.target.value)}
                className="text-xl font-heading bg-transparent border-b border-transparent focus:border-red-500 focus:outline-none text-blue-400 px-1 py-1 w-full max-w-xs transition-colors"
                placeholder="Category Name"
              />
              <div className="flex items-center gap-3">
                <select
                  value={category.animType || 'none'}
                  onChange={(e) => handleAnimType(catIdx, e.target.value)}
                  className="border px-3 py-1 font-mono text-xs focus:outline-none focus:border-red-500"
                  style={{ background: 'var(--bg2)', color: 'var(--text)', borderColor: 'var(--line)' }}
                >
                  {animOptions.map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(catIdx)}
                  className="p-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-red-500/50"
                  title="Remove Category"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Skill items */}
            <div className="space-y-3">
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-center gap-4 bg-bg-surface p-3 border border-border-base group hover:border-red-500/30 transition-colors">
                  <GripVertical className="w-5 h-5 text-red-500/30 cursor-move shrink-0" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleUpdateItem(catIdx, itemIdx, 'name', e.target.value)}
                      placeholder="Skill Name"
                      className="bg-transparent border-b px-2 py-1.5 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                      style={{ borderColor: 'var(--line)' }}
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="range" min="0" max="100" value={item.level}
                        onChange={(e) => handleUpdateItem(catIdx, itemIdx, 'level', parseInt(e.target.value))}
                        className="flex-1 accent-red-500"
                      />
                      <span className="text-sm font-mono text-red-500 w-12 text-right">{item.level}%</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => handleRemoveItem(catIdx, itemIdx)} className="p-2 text-text-muted hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleAddItem(catIdx)}
              className="mt-6 flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-xs uppercase tracking-widest transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="text-center py-12 glass border border-red-500/20 border-dashed">
            <p className="text-red-500/60 font-mono uppercase tracking-widest text-sm">NO CATEGORIES DETECTED.</p>
          </div>
        )}
      </div>
    </div>
  );
}
