import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        const diff = Math.random() * 5;
        return Math.min(prev + diff, 100);
      });
    }, 100);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(var(--amber) 1px, transparent 1px), linear-gradient(90deg, var(--amber) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          {/* Moving Scanline */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div 
              animate={{ top: ['-10%', '110%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-red-500/20 shadow-[0_0_20px_#ff3e3e] opacity-50"
            />
          </div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '0.15em' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="premium-glitch" data-text="TAREK REHAN">
                TAREK REHAN
              </h1>
              
              <div className="mt-16 flex flex-col items-center">
                <div className="w-80 h-[1px] bg-white/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="absolute top-0 left-0 h-full bg-red-500 shadow-[0_0_25px_#ff3e3e]"
                  />
                </div>
                <div className="mt-8 font-mono text-[8px] text-white/20 uppercase tracking-[0.8em] flex items-center gap-4">
                  <span className="text-red-500/60">ESTABLISHING_STABLE_LINK</span>
                  <span className="font-bold text-red-500/80">{Math.round(progress)}%</span>
                </div>
              </div>
            </motion.div>
          </div>

          <style>{`
            .premium-glitch {
              font-family: 'Orbitron', sans-serif;
              font-size: clamp(2rem, 8vw, 6rem);
              font-weight: 900;
              color: white;
              position: relative;
              text-transform: uppercase;
              line-height: 1;
              animation: glitch-jitter 0.2s infinite;
            }

            .premium-glitch::before,
            .premium-glitch::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #000000;
            }

            .premium-glitch::before {
              left: 2px;
              text-shadow: -2px 0 #ff3e3e;
              clip: rect(44px, 450px, 56px, 0);
              animation: glitch-anim-1 2s infinite linear alternate-reverse;
            }

            .premium-glitch::after {
              left: -2px;
              text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
              clip: rect(44px, 450px, 56px, 0);
              animation: glitch-anim-2 3s infinite linear alternate-reverse;
            }

            @keyframes glitch-jitter {
              0% { transform: translate(0); }
              20% { transform: translate(-2px, 1px); }
              40% { transform: translate(-2px, -1px); }
              60% { transform: translate(2px, 1px); }
              80% { transform: translate(2px, -1px); }
              100% { transform: translate(0); }
            }

            @keyframes glitch-anim-1 {
              0% { clip: rect(30px, 9999px, 10px, 0); }
              5% { clip: rect(70px, 9999px, 80px, 0); }
              10% { clip: rect(20px, 9999px, 50px, 0); }
              15% { clip: rect(90px, 9999px, 100px, 0); }
              20% { clip: rect(40px, 9999px, 20px, 0); }
              25% { clip: rect(10px, 9999px, 60px, 0); }
              30% { clip: rect(80px, 9999px, 40px, 0); }
              35% { clip: rect(50px, 9999px, 90px, 0); }
              40% { clip: rect(10px, 9999px, 30px, 0); }
              45% { clip: rect(60px, 9999px, 70px, 0); }
              50% { clip: rect(20px, 9999px, 10px, 0); }
              55% { clip: rect(80px, 9999px, 90px, 0); }
              60% { clip: rect(40px, 9999px, 50px, 0); }
              65% { clip: rect(10px, 9999px, 20px, 0); }
              70% { clip: rect(90px, 9999px, 100px, 0); }
              75% { clip: rect(30px, 9999px, 40px, 0); }
              80% { clip: rect(70px, 9999px, 80px, 0); }
              85% { clip: rect(10px, 9999px, 60px, 0); }
              90% { clip: rect(50px, 9999px, 30px, 0); }
              95% { clip: rect(80px, 9999px, 10px, 0); }
              100% { clip: rect(20px, 9999px, 40px, 0); }
            }

            @keyframes glitch-anim-2 {
              0% { clip: rect(10px, 9999px, 20px, 0); }
              5% { clip: rect(80px, 9999px, 90px, 0); }
              10% { clip: rect(30px, 9999px, 10px, 0); }
              15% { clip: rect(60px, 9999px, 70px, 0); }
              20% { clip: rect(40px, 9999px, 50px, 0); }
              25% { clip: rect(90px, 9999px, 100px, 0); }
              30% { clip: rect(20px, 9999px, 30px, 0); }
              35% { clip: rect(70px, 9999px, 80px, 0); }
              40% { clip: rect(10px, 9999px, 40px, 0); }
              45% { clip: rect(50px, 9999px, 60px, 0); }
              50% { clip: rect(80px, 9999px, 90px, 0); }
              55% { clip: rect(20px, 9999px, 10px, 0); }
              60% { clip: rect(40px, 9999px, 30px, 0); }
              65% { clip: rect(90px, 9999px, 100px, 0); }
              70% { clip: rect(10px, 9999px, 50px, 0); }
              75% { clip: rect(60px, 9999px, 70px, 0); }
              80% { clip: rect(30px, 9999px, 40px, 0); }
              85% { clip: rect(80px, 9999px, 90px, 0); }
              90% { clip: rect(20px, 9999px, 10px, 0); }
              95% { clip: rect(50px, 9999px, 60px, 0); }
              100% { clip: rect(10px, 9999px, 30px, 0); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
