import { useEffect, useRef, useState } from 'react';
import { usePortfolioData } from '../context/DataContext';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Linkedin, Github, MessageSquare, Mail, Download } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

export default function Contact() {
  const { data } = usePortfolioData();
  const social = data.social || {};
  const formRef = useRef();

  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
        }
      });
    }, { threshold: .15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [randomGif, setRandomGif] = useState({ name: '', path: '' });

  useEffect(() => {
    const gifs = [
      "IF YOU HAVE A GLITCH IN YOUR ANTENNA I CAN FIX IT NOW!.gif",
      "LEARNING IS A LONG ROAD!.gif",
      "LIFE IS GOOD!.gif",
      "PLEASE DON'T BE A HACKER!.gif"
    ];
    const picked = gifs[Math.floor(Math.random() * gifs.length)];
    setRandomGif({
      name: picked.replace('.gif', ''),
      path: `./${picked}`
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!isVerified) return;
    setStatus('sending');

    emailjs.sendForm('service_ieu97zi', 'template_7j064os', formRef.current, '-87vzblhTYfYwjK9P')
      .then((result) => {
        setStatus('success');
        formRef.current.reset();
        setIsVerified(false);
        setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
        console.error(error.text);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <section id="contact">
      <div className="sec-wrap">
        <div className="sec-label"><span className="num">05 /</span> Contact</div>

        <div className="grid md:grid-cols-2 gap-12 reveal">

          {/* Left Side: Info & Links */}
          <div className="space-y-8">
            <div>
              <div className="contact-head">Let's Build the<br /><span>Next Link</span></div>
              <p className="contact-sub mt-4 max-w-md">
                For opportunities, collaborations, or inquiries, feel free to reach out.
              </p>
            </div>

            <div className="contact-grid">
              {data.profile.email && (
                <a className="contact-link" href={`mailto:${data.profile.email}`}>
                  <span className="ico"><Mail size={16} /></span> {data.profile.email}
                </a>
              )}

              {Object.entries(social).map(([key, value]) => {
                if (!value) return null;
                let ico = <MessageSquare size={16} />;
                if (key.toLowerCase() === 'linkedin') ico = <Linkedin size={16} />;
                if (key.toLowerCase() === 'github') ico = <Github size={16} />;
                if (key.toLowerCase() === 'whatsapp') ico = <MessageSquare size={16} />;

                return (
                  <a key={key} className="contact-link" href={value} target="_blank" rel="noopener noreferrer">
                    <span className="ico">{ico}</span> {key.charAt(0).toUpperCase() + key.slice(1)}
                  </a>
                );
              })}

              {data.cv?.data && (
                <a className="contact-link" href={data.cv.data} download={data.cv.filename || 'resume.pdf'}>
                  <span className="ico"><Download size={16} /></span> Download CV
                </a>
              )}
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="glass p-8 border border-red-500/20 relative group">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />

            <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-red-500/70 uppercase tracking-widest mb-2">Your Name</label>
                  <input
                    type="text" name="user_name" required
                    className="w-full bg-bg-surface/30 border border-line px-4 py-3 text-sm focus:border-red-500/50 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-red-500/70 uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email" name="user_email" required
                    className="w-full bg-bg-surface/30 border border-line px-4 py-3 text-sm focus:border-red-500/50 outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[10px] text-red-500/70 uppercase tracking-widest mb-2">Subject</label>
                <input
                  type="text" name="subject" required
                  className="w-full bg-bg-surface/30 border border-line px-4 py-3 text-sm focus:border-red-500/50 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-red-500/70 uppercase tracking-widest mb-2">Message</label>
                <textarea
                  name="message" required rows={5}
                  className="w-full bg-bg-surface/30 border border-line px-4 py-3 text-sm focus:border-red-500/50 outline-none resize-none transition-colors"
                ></textarea>
              </div>

              {/* CLOUDFLARE TURNSTILE */}
              <div className="flex justify-center">
                <Turnstile 
                  siteKey="1x00000000000000000000AA" // DEFAULT TESTING KEY
                  onSuccess={() => setIsVerified(true)}
                  onExpire={() => setIsVerified(false)}
                  theme="dark"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || !isVerified}
                className="w-full bg-red-500 text-black font-bold py-4 hover:bg-red-400 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'TRANSMITTING...' : (
                  <>
                    {isVerified ? 'ESTABLISH LINK' : 'VERIFY HANDSHAKE'} <Send size={14} />
                  </>
                )}
              </button>

              {/* DYNAMIC GIF SECTION */}
              {randomGif.path && (
                <div className="mt-8 pt-6 border-t border-red-500/10 text-center">
                  <div className="w-full aspect-video bg-black/40 overflow-hidden border border-red-500/20 mb-4">
                    <img
                      src={randomGif.path}
                      alt="Handshake Status"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="glitch-wrapper">
                    <div className="glitch-text font-heading text-red-500 font-bold text-xs uppercase tracking-[0.2em]" data-text={randomGif.name}>
                      {randomGif.name}
                    </div>
                  </div>
                </div>
              )}

              {/* Status Notifications */}
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-500 font-mono text-[10px] uppercase tracking-widest justify-center mt-4">
                  <CheckCircle size={14} /> Message Transmitted Successfully
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 font-mono text-[10px] uppercase tracking-widest justify-center mt-4">
                  <AlertCircle size={14} /> Transmission Failed. Try again.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

      <style>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }
        .glitch-text {
          position: relative;
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0.8;
        }
        .glitch-text::before {
          color: #ff3e3e;
          z-index: -1;
          animation: glitch-anim 3s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          color: #0084ff;
          z-index: -2;
          animation: glitch-anim2 2s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% { clip: rect(10px, 9999px, 20px, 0); transform: translate(-2px, -1px); }
          25% { clip: rect(30px, 9999px, 40px, 0); transform: translate(2px, 1px); }
          50% { clip: rect(15px, 9999px, 25px, 0); transform: translate(-1px, 2px); }
          75% { clip: rect(40px, 9999px, 50px, 0); transform: translate(1px, -2px); }
          100% { clip: rect(25px, 9999px, 35px, 0); transform: translate(-2px, -1px); }
        }
        @keyframes glitch-anim2 {
          0% { clip: rect(15px, 9999px, 25px, 0); transform: translate(1px, 2px); }
          25% { clip: rect(5px, 9999px, 15px, 0); transform: translate(-1px, -1px); }
          50% { clip: rect(35px, 9999px, 45px, 0); transform: translate(2px, 1px); }
          75% { clip: rect(10px, 9999px, 20px, 0); transform: translate(-2px, 2px); }
          100% { clip: rect(40px, 9999px, 50px, 0); transform: translate(-1px, 2px); }
        }
      `}</style>
    </section>
  );
}

