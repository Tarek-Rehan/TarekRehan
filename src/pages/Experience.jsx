import { useEffect } from 'react';
import { usePortfolioData } from '../context/DataContext';

export default function Experience() {
  const { data } = usePortfolioData();
  const experience = data.experience || [];

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
    <section id="exp">
      <div className="sec-wrap">
        <div className="sec-label"><span className="num">04 /</span> Experience</div>
        <div className="timeline reveal">
          
          {experience.map((item, idx) => (
            <div className="tl-item" key={item.id || idx}>
              <div className="tl-marker"><div className="tl-node"></div></div>
              <div className="tl-date">{item.startDate} — {item.endDate}</div>
              <div className="tl-role">{item.title}</div>
              <div className="tl-company">{item.organization} · {item.location || 'Remote'}</div>
              <p className="tl-desc">{item.description}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
