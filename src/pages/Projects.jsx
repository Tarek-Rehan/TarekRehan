import { useEffect, useState } from 'react';
import { usePortfolioData } from '../context/DataContext';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Projects() {
  const { data } = usePortfolioData();
  const projects = data.projects || [];

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if(en.isIntersecting){
          en.target.classList.add('in');
        }
      });
    }, { threshold: .15 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);


  return (
    <section id="projects">
      <div className="sec-wrap">
        <div className="sec-label"><span className="num">03 /</span> Projects</div>
        <div className="proj-grid reveal">
          
          {projects.map((proj, idx) => (
            <div className="proj-card" key={proj.id || idx}>
              <div className="proj-freq">TX · 28.4 GHz · Active</div>
              {proj.images && proj.images[0] && (
                <div 
                  className="group relative cursor-zoom-in overflow-hidden mb-6"
                  onClick={() => setSelectedImage(proj.images[0])}
                >
                  <img 
                    src={proj.images[0]} 
                    alt={proj.title} 
                    loading="lazy"
                    className="w-full h-[180px] object-cover border border-red-500/20 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8" />
                  </div>
                </div>
              )}
              <div className="proj-name">{proj.title}</div>
              <p className="proj-desc">{proj.description}</p>
              <div className="proj-tags">
                {proj.tags?.map((tag, i) => (
                  <span className="tag" key={i}>{tag}</span>
                ))}
              </div>
            </div>
          ))}

          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 bg-bg-base/95 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              >
                <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                  <X size={32} />
                </button>
                <motion.img 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedImage} 
                  alt="Full view"
                  className="max-w-full max-h-full shadow-2xl border border-red-500/10"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
