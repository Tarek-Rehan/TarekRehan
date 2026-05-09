import { useEffect } from 'react';
import { usePortfolioData } from '../context/DataContext';
import SkillAnim from '../components/animations/SkillAnim';

export default function Skills() {
  const { data } = usePortfolioData();
  const skills = data.skills || [];

  useEffect(() => {
    // Scroll reveal observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if(en.isIntersecting){
          en.target.classList.add('in');
          en.target.querySelectorAll('.skill-item').forEach(item => {
            const pct = item.dataset.pct || '0';
            const fill = item.querySelector('.skill-fill');
            if (fill) fill.style.width = pct + '%';
          });
        }
      });
    }, { threshold: .15 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="skills">
      <div className="sec-wrap">
        <div className="sec-label"><span className="num">02 /</span> Capabilities</div>
        <div className="skills-grid reveal">
          
          {skills.map((group, idx) => (
            <div className="skill-group" key={idx}>
              <h3>{group.category}</h3>
              {group.items.map((item, i) => (
                <div className="skill-item" data-pct={item.level} key={i}>
                  <div className="skill-head">
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-pct">{item.level}%</span>
                  </div>
                  <div className="skill-bar"><div className="skill-fill"></div></div>
                </div>
              ))}
              
              {group.animType && group.animType !== 'none' && (
                <SkillAnim type={group.animType} />
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
