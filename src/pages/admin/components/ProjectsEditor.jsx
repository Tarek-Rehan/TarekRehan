import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { usePortfolioData } from '../../../context/DataContext';
import { compressImage } from '../../../utils/imageUtils';


export default function ProjectsEditor() {
  const { data, updateSection } = usePortfolioData();
  const projects = Array.isArray(data.projects) ? data.projects : [];

  // Local state to track raw input for tags to prevent cursor jumping
  const [tagInputs, setTagInputs] = useState({});

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: 'New Project',
      description: 'Project description...',
      images: [],
      tags: [],
      links: { github: '', demo: '' }
    };
    updateSection('projects', [...projects, newProj]);
  };

  const handleUpdate = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateSection('projects', newProjects);
  };

  const handleRemove = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    updateSection('projects', newProjects);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const compressed = await compressImage(reader.result, 1200, 1200, 0.7);
          const newProjects = [...projects];
          newProjects[index].images = [compressed];
          updateSection('projects', newProjects);
        } catch (err) {
          console.error('Compression failed:', err);
          const newProjects = [...projects];
          newProjects[index].images = [reader.result];
          updateSection('projects', newProjects);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagsChange = (index, value, projId) => {
    // Update local string state immediately
    setTagInputs(prev => ({ ...prev, [projId]: value }));

    // Update parent state as array
    const tagsArray = value.split(',').map(t => t.trim());
    handleUpdate(index, 'tags', tagsArray);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="pl-0 md:pl-24 flex gap-4">
          <div className="font-mono text-[10px] text-red-500/40 w-0 md:w-6 text-right pt-2 flex-shrink-0"></div>
          <div>
            <h2 className="text-2xl font-heading text-red-500 mb-2">Projects Manager</h2>
            <p className="text-text-muted font-mono text-sm uppercase tracking-wider">Manage your portfolio showcase.</p>
          </div>
        </div>
        <button
          onClick={handleAddProject}
          className="btn-primary flex items-center justify-center gap-2"
          style={{ padding: '10px 20px', fontSize: '10px' }}
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="space-y-8">
        {projects.map((proj, idx) => {
          const projId = proj.id || idx;
          const displayTags = tagInputs[projId] !== undefined ? tagInputs[projId] : (proj.tags || []).join(', ');

          return (
            <div key={projId} className="flex flex-col md:flex-row gap-4 group">
              <div className="hidden md:block font-mono text-[10px] text-red-500/40 w-6 text-right pt-8 flex-shrink-0">
                {(idx + 1).toString().padStart(2, '0')}
              </div>
              <div className="flex-1 glass p-4 md:p-6 border border-red-500/20 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-red-500/20">
                  <h3 className="font-heading text-base md:text-lg text-blue-400 break-all">PROJECT_ID: {projId}</h3>
                  <button
                    onClick={() => handleRemove(idx)}
                    className="p-2 text-red-400 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-red-500/50"
                    title="Delete Project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image Column */}
                  <div className="col-span-1">
                    <div className="flex gap-0 md:gap-4">
                      <div className="font-mono text-[10px] text-red-500/40 w-0 md:w-6 text-right pt-1 flex-shrink-0"></div>
                      <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Project Image</label>
                    </div>
                    <div className="w-full aspect-video bg-bg-surface border border-red-500/30 overflow-hidden relative group mb-3">
                      {proj.images && proj.images.length > 0 ? (
                        <img src={proj.images[0]} alt="Project Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-red-500/30">
                          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                          <span className="font-mono text-[10px]">NO_SIGNAL</span>
                        </div>
                      )}

                      <label className="absolute inset-0 bg-bg-base/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="btn-ghost" style={{ padding: '6px 12px', fontSize: '10px' }}>UPLOAD IMG</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(idx, e)} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <div>
                      <div className="flex gap-4">
                        <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                        <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Project Title</label>
                      </div>
                      <input
                        type="text" value={proj.title || ''} onChange={(e) => handleUpdate(idx, 'title', e.target.value)}
                        className="w-full bg-bg-surface border-b border-border-base px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                      />
                    </div>

                    <div>
                      <div className="flex gap-4">
                        <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                        <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Description</label>
                      </div>
                      <textarea
                        value={proj.description || ''} onChange={(e) => handleUpdate(idx, 'description', e.target.value)} rows={4}
                        className="w-full bg-bg-surface border border-border-base px-4 py-3 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm resize-none"
                      />
                    </div>

                    <div>
                      <div className="flex gap-4">
                        <div className="font-mono text-[10px] text-red-500/40 w-6 text-right pt-1 flex-shrink-0"></div>
                        <label className="block font-mono text-xs text-red-500/70 uppercase tracking-widest mb-2 flex-1">Technologies (Comma separated)</label>
                      </div>
                      <input
                        type="text"
                        value={displayTags}
                        onChange={(e) => handleTagsChange(idx, e.target.value, projId)}
                        placeholder="e.g. React, Node, Tailwind"
                        className="w-full bg-bg-surface border-b border-border-base px-4 py-2 text-text-primary focus:outline-none focus:border-red-500 font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {projects.length === 0 && (
          <div className="text-center py-12 glass border border-red-500/20 border-dashed">
            <p className="text-red-500/60 font-mono uppercase tracking-widest text-sm">NO PROJECTS DETECTED.</p>
          </div>
        )}
      </div>
    </div>
  );
}
