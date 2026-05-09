import { usePortfolioData } from '../context/DataContext';
import { useEffect } from 'react';

export default function About() {
  const { data } = usePortfolioData();
  const { profile } = data;

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
    <section id="about">
      <div className="sec-wrap">
        <div className="sec-label"><span className="num">01 /</span> About</div>
        <div className="grid reveal">
          <div className="about-card">
            <div className="about-text">
              <h2>{profile.aboutHeadline || 'Engineering the Signal Behind the World'}</h2>
              <p>{profile.bio}</p>
            </div>
          </div>
          <div className="stat-grid">
            {(profile.stats || []).map((s, i) => (
              <div className="stat-box" key={i}>
                <div className="stat-num">{s.value}</div>
                <div className="stat-desc">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
