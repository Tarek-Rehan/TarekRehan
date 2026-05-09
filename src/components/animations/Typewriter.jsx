import { useState, useEffect } from 'react';

export default function Typewriter({ phrases, speed = 80, delay = 2000 }) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let ticker = setTimeout(() => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, phrases, speed, delay]);

  return (
    <span className="typewriter">
      {text}
      <span className="cursor" style={{ borderRight: '2px solid var(--amber)', animation: 'blink 1s step-end infinite', paddingRight: '4px' }}></span>
      <style>{`
        @keyframes blink {
          0%, 100% { border-color: transparent; }
          50% { border-color: var(--amber); }
        }
      `}</style>
    </span>
  );
}
