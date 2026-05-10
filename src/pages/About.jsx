import { usePortfolioData } from '../context/DataContext';
import { motion } from 'framer-motion';

export default function About() {
  const { data } = usePortfolioData();
  const { profile } = data;

  return (
    <section id="about">
      <div className="sec-wrap">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sec-label"
        >
          <span className="num">01 /</span> About
        </motion.div>

        <div className="flex flex-col gap-8">
          {/* Top Bio Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="about-card relative group w-full"
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber opacity-20 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber opacity-20 group-hover:opacity-100 transition-opacity" />
            
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6 opacity-40 font-mono text-[8px] tracking-[0.4em]">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                SYSTEM_BIO_DATA_STREAM // v2.1.0
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight tracking-tight uppercase">
                {profile.aboutHeadline || 'Engineering the Signal'}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed font-sans whitespace-pre-wrap">
                {profile.bio}
              </p>
            </div>
          </motion.div>
          
          {/* Scrollable Stats Area */}
          <div className="stats-container-wrapper">
            <div className="font-mono text-[9px] mb-4 opacity-30 tracking-widest uppercase flex items-center gap-2">
              <div className="w-8 h-px bg-current" />
              User_Generated_Metrics
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="about-stats-scroll"
            >
              <div className="stat-grid">
                {(profile.stats || []).map((s, i) => (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="stat-box relative group" 
                    key={i}
                  >
                    <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-amber opacity-10 group-hover:opacity-60 transition-opacity" />
                    <div className="stat-num">{s.value}</div>
                    <div className="stat-desc">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
