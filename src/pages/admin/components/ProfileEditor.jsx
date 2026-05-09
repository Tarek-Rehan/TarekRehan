import { usePortfolioData } from '../../../context/DataContext';
import { Plus, Trash2 } from 'lucide-react';
import { compressImage } from '../../../utils/imageUtils';


export default function ProfileEditor() {
  const { data, updateSection } = usePortfolioData();
  const { profile, cv } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('profile', { ...profile, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const compressed = await compressImage(reader.result, 800, 800, 0.8);
          updateSection('profile', { ...profile, photo: compressed });
        } catch (err) {
          console.error('Compression failed:', err);
          updateSection('profile', { ...profile, photo: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateSection('cv', { filename: file.name, data: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Phrases logic
  const handlePhraseChange = (index, value) => {
    const newPhrases = [...(profile.heroPhrases || [])];
    newPhrases[index] = value;
    updateSection('profile', { ...profile, heroPhrases: newPhrases });
  };

  const addPhrase = () => {
    updateSection('profile', { 
      ...profile, 
      heroPhrases: [...(profile.heroPhrases || []), ''] 
    });
  };

  const removePhrase = (index) => {
    const newPhrases = (profile.heroPhrases || []).filter((_, i) => i !== index);
    updateSection('profile', { ...profile, heroPhrases: newPhrases });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading text-red-500 mb-2">Profile & Hero Manager</h2>
        <p className="text-text-muted font-mono text-sm uppercase tracking-wider">Manage your identity, resume, and auto-typing hero phrases.</p>
      </div>

      <div className="glass p-8 border border-red-500/20 relative space-y-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />
        
        {/* Identity Section */}
        <section>
          <h3 className="text-sm font-mono text-red-500/90 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-8 h-px bg-red-500/30" /> Core Identity
          </h3>
          
          <div className="mb-8">
            <div className="flex items-center gap-8">
              <div className="w-28 h-28 bg-bg-surface border border-red-500/30 overflow-hidden flex-shrink-0 group relative">
                {profile.photo ? (
                  <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-red-500/20 font-mono text-[10px]">NO_IMAGE</div>
                )}
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-mono text-white">
                  CHANGE
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-muted uppercase mb-1">Full Name</label>
                    <input type="text" name="name" value={profile.name || ''} onChange={handleChange} className="w-full bg-bg-surface/50 border-b border-line px-0 py-1 text-sm focus:border-red-500 transition-colors outline-none" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-muted uppercase mb-1">Job Title</label>
                    <input type="text" name="title" value={profile.title || ''} onChange={handleChange} className="w-full bg-bg-surface/50 border-b border-line px-0 py-1 text-sm focus:border-red-500 transition-colors outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-muted uppercase mb-1">Tagline (Hero)</label>
                  <input type="text" name="tagline" value={profile.tagline || ''} onChange={handleChange} className="w-full bg-bg-surface/50 border-b border-line px-0 py-1 text-sm focus:border-red-500 transition-colors outline-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Auto-Typing Phrases Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-mono text-red-500/90 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-px bg-red-500/30" /> Hero Typing Phrases
            </h3>
            <button onClick={addPhrase} className="text-[10px] font-mono text-red-500 border border-red-500/30 px-3 py-1 hover:bg-red-500/10 transition-colors flex items-center gap-1">
              <Plus size={12} /> ADD SENTENCE
            </button>
          </div>
          
          <div className="space-y-3">
            {(profile.heroPhrases || []).length > 0 ? (
              (profile.heroPhrases || []).map((phrase, idx) => (
                <div key={idx} className="flex gap-3 group">
                  <div className="font-mono text-[10px] text-red-500/40 w-4 pt-3">{idx + 1}</div>
                  <input 
                    type="text" 
                    value={phrase} 
                    onChange={(e) => handlePhraseChange(idx, e.target.value)}
                    placeholder="Enter a professional phrase..."
                    className="flex-1 bg-bg-surface/30 border border-line px-4 py-2 text-sm focus:border-red-500/50 outline-none transition-colors"
                  />
                  <button onClick={() => removePhrase(idx)} className="opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all px-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs font-mono text-muted text-center py-4 italic opacity-50">No phrases added. Add one to see it in action.</p>
            )}
          </div>
        </section>

        {/* CV Management */}
        <section className="pt-6 border-t border-line">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-mono text-text-primary uppercase tracking-wider mb-1">Resume / CV File</h4>
              <p className="text-[10px] text-text-muted font-mono">File: {cv.filename || 'No file uploaded'}</p>
            </div>
            <label className="btn-primary inline-block cursor-pointer" style={{ padding: '8px 16px', fontSize: '10px' }}>
              {cv.data ? 'REPLACE CV' : 'UPLOAD CV'}
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} className="hidden" />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
