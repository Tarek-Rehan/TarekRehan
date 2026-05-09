import { useEffect, useRef } from 'react';

export default function SkillAnim({ type }) {
  // Use simple DOM/SVG animations for different types
  
  if (type === '1' || type === 'spectrum') {
    return (
      <div className="flex items-end gap-1 h-16 mt-6 opacity-80">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex-1 bg-red-500/40 border-t border-red-500 origin-bottom" 
               style={{ animation: `pulse-height ${0.5 + Math.random()}s ease-in-out infinite alternate`, height: `${20 + Math.random()*80}%` }} />
        ))}
      </div>
    );
  }

  if (type === '2' || type === 'sine-wave') {
    return (
      <div className="h-16 mt-6 relative overflow-hidden opacity-80 flex items-center">
        <svg viewBox="0 0 200 40" className="w-full h-full stroke-blue-500 fill-none" style={{ strokeWidth: 1 }}>
          <path d="M0,20 Q10,0 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20" 
                style={{ animation: 'slide-left 2s linear infinite' }} />
        </svg>
      </div>
    );
  }

  if (type === '3' || type === 'radar') {
    return (
      <div className="h-20 mt-6 flex justify-center opacity-80">
        <div className="w-20 h-20 rounded-full border border-green-500/30 relative overflow-hidden">
          <div className="absolute inset-0 border border-green-500/10 rounded-full scale-50" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-green-500/20" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-green-500/20" />
          <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-gradient-to-tr from-green-500/40 to-transparent origin-bottom-left"
               style={{ animation: 'spin 2s linear infinite' }} />
        </div>
      </div>
    );
  }

  if (type === '4' || type === 'binary') {
    return (
      <div className="h-16 mt-6 overflow-hidden flex flex-wrap gap-2 opacity-60 font-mono text-xs text-red-500">
        {[...Array(40)].map((_, i) => (
          <span key={i} style={{ animation: `fade-blink ${Math.random()*2+1}s infinite` }}>
            {Math.random() > 0.5 ? '1' : '0'}
          </span>
        ))}
      </div>
    );
  }

  if (type === '5' || type === 'constellation') {
    return (
      <div className="h-20 mt-6 flex justify-center opacity-80">
        <div className="w-20 h-20 border border-blue-500/20 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-blue-500/20" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-blue-500/20" />
          {[20, 80].map(x => [20, 80].map(y => (
            <div key={`${x}${y}`} className="absolute w-2 h-2 bg-blue-500 rounded-full -ml-1 -mt-1" 
                 style={{ left: `${x}%`, top: `${y}%`, animation: `pulse-glow ${Math.random()*2+1}s infinite alternate` }} />
          )))}
        </div>
      </div>
    );
  }

  if (type === '6' || type === 'pulse') {
    return (
      <div className="h-20 mt-6 flex justify-center items-center opacity-80">
        <div className="relative w-4 h-4 bg-red-500 rounded-full">
          {[1,2,3].map(i => (
            <div key={i} className="absolute inset-0 rounded-full border border-red-500" 
                 style={{ animation: `ping 2s cubic-bezier(0, 0, 0.2, 1) infinite`, animationDelay: `${i*0.6}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === '7' || type === 'packets') {
    return (
      <div className="h-16 mt-6 flex items-center relative opacity-80">
        <div className="w-full h-px bg-cyan-500/30" />
        {[1,2,3].map(i => (
          <div key={i} className="absolute w-4 h-2 bg-cyan-500" 
               style={{ top: 'calc(50% - 4px)', animation: `slide-right 3s linear infinite`, animationDelay: `${i*1}s` }} />
        ))}
      </div>
    );
  }

  if (type === '8' || type === 'fiber') {
    return (
      <div className="h-16 mt-6 flex flex-col justify-center gap-2 opacity-80">
        {[1,2,3].map(i => (
          <div key={i} className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" 
               style={{ animation: `pulse-glow ${1+i*0.5}s infinite alternate`, backgroundSize: '200% 100%' }} />
        ))}
      </div>
    );
  }

  if (type === '9' || type === 'antenna') {
    return (
      <div className="h-20 mt-6 flex justify-center items-end opacity-80 relative">
        <div className="w-1 h-12 bg-red-500/50" />
        <div className="w-4 h-1 bg-red-500/50 absolute bottom-12" />
        {[1,2,3].map(i => (
          <div key={i} className="absolute bottom-12 w-12 h-12 border-t-2 border-red-500 rounded-full transparent" 
               style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', animation: 'ping 1.5s infinite', animationDelay: `${i*0.5}s` }} />
        ))}
      </div>
    );
  }

  if (type === '10' || type === 'eye-diagram') {
    return (
      <div className="h-20 mt-6 relative overflow-hidden opacity-80 flex items-center justify-center">
        <svg viewBox="0 0 100 40" className="w-full h-full stroke-blue-500 fill-none" style={{ strokeWidth: 0.5 }}>
          <path d="M0,20 Q25,0 50,20 T100,20" style={{ animation: 'fade-blink 1s infinite' }}/>
          <path d="M0,20 Q25,40 50,20 T100,20" style={{ animation: 'fade-blink 1.2s infinite' }}/>
        </svg>
      </div>
    );
  }

  if (type === '11' || type === 'mesh') {
    return (
      <div className="h-20 mt-6 relative opacity-80">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full" />
        <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-green-500 rounded-full" />
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-green-500 rounded-full" />
        <svg className="absolute inset-0 w-full h-full stroke-green-500/30" style={{ strokeWidth: 1 }}>
          <line x1="25%" y1="25%" x2="33%" y2="75%" style={{ animation: 'fade-blink 2s infinite' }} />
          <line x1="33%" y1="75%" x2="75%" y2="50%" style={{ animation: 'fade-blink 1.5s infinite' }} />
          <line x1="75%" y1="50%" x2="25%" y2="25%" style={{ animation: 'fade-blink 2.5s infinite' }} />
        </svg>
      </div>
    );
  }

  if (type === '12' || type === 'cellular') {
    return (
      <div className="h-20 mt-6 flex justify-center items-center gap-1 opacity-80">
        {[1,2,3].map(i => (
          <div key={i} className="w-8 h-8 border border-red-500/40" 
               style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', animation: `fade-blink ${i}s infinite` }} />
        ))}
      </div>
    );
  }

  if (type === '13' || type === 'fm') {
    return (
      <div className="h-16 mt-6 relative overflow-hidden opacity-80 flex items-center">
        <div className="w-full h-full flex items-center gap-1">
          {[...Array(30)].map((_, i) => {
            const isDense = i > 10 && i < 20;
            return <div key={i} className="h-full w-px bg-blue-500/50" style={{ margin: isDense ? '0 1px' : '0 4px', animation: 'slide-left 2s linear infinite' }} />
          })}
        </div>
      </div>
    );
  }

  if (type === '14' || type === 'am') {
    return (
      <div className="h-16 mt-6 relative overflow-hidden opacity-80 flex items-center">
        <div className="w-full h-full flex items-center gap-1">
          {[...Array(30)].map((_, i) => {
            const h = Math.sin(i * 0.4) * 50 + 50;
            return <div key={i} className="w-px bg-red-500/50" style={{ height: `${h}%`, animation: 'slide-left 2s linear infinite' }} />
          })}
        </div>
      </div>
    );
  }

  if (type === '15' || type === 'morse') {
    return (
      <div className="h-16 mt-6 flex items-center justify-center gap-2 opacity-80">
        {['w-2', 'w-6', 'w-2', 'w-6'].map((w, i) => (
          <div key={i} className={`${w} h-2 bg-green-500`} style={{ animation: `fade-blink 1.5s infinite`, animationDelay: `${i*0.3}s` }} />
        ))}
      </div>
    );
  }

  if (type === '16' || type === 'satellite') {
    return (
      <div className="h-20 mt-6 relative opacity-80 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border border-dashed border-cyan-500/50" style={{ animation: 'spin 4s linear infinite' }}>
          <div className="w-2 h-2 bg-cyan-500 rounded-full -mt-1 -ml-1" />
        </div>
        <div className="absolute w-4 h-4 bg-cyan-500/20 rounded-full" />
      </div>
    );
  }

  if (type === '17' || type === 'rfid') {
    return (
      <div className="h-20 mt-6 relative opacity-80 flex justify-center items-center overflow-hidden">
        <div className="w-6 h-8 border-2 border-red-500/50 rounded-md" />
        {[1,2,3].map(i => (
          <div key={i} className="absolute border-r-2 border-red-500 rounded-full" 
               style={{ width: `${i*20}px`, height: `${i*20}px`, left: '50%', animation: 'fade-blink 2s infinite', animationDelay: `${i*0.2}s` }} />
        ))}
      </div>
    );
  }

  if (type === '18' || type === 'phase') {
    return (
      <div className="h-20 mt-6 relative overflow-hidden opacity-80 flex flex-col justify-center">
        <svg viewBox="0 0 100 20" className="w-full stroke-blue-500 fill-none mb-1" style={{ strokeWidth: 1 }}>
          <path d="M0,10 Q12.5,0 25,10 T50,10 T75,10 T100,10" style={{ animation: 'slide-left 2s linear infinite' }} />
        </svg>
        <svg viewBox="0 0 100 20" className="w-full stroke-red-500 fill-none" style={{ strokeWidth: 1 }}>
          <path d="M0,10 Q12.5,20 25,10 T50,10 T75,10 T100,10" style={{ animation: 'slide-left 2s linear infinite' }} />
        </svg>
      </div>
    );
  }

  if (type === '19' || type === 'laser') {
    return (
      <div className="h-16 mt-6 flex items-center relative opacity-80">
        <div className="w-full h-1 bg-red-500 shadow-[0_0_10px_red]" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]" 
               style={{ top: 'calc(50% - 2px)', animation: `slide-right ${1+Math.random()}s linear infinite` }} />
        ))}
      </div>
    );
  }

  if (type === '20' || type === 'smith-chart') {
    return (
      <div className="h-20 mt-6 flex justify-center opacity-80 relative">
        <div className="w-20 h-20 rounded-full border border-green-500/30 overflow-hidden relative">
          <div className="absolute top-1/2 w-full h-px bg-green-500/20" />
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full border border-green-500/20 translate-x-10" />
          <div className="absolute top-0 right-0 w-10 h-10 rounded-full border border-green-500/20 translate-x-5 translate-y-5" />
          <div className="absolute w-2 h-2 bg-green-500 rounded-full" style={{ left: '40%', top: '30%', animation: 'fade-blink 1s infinite' }} />
        </div>
      </div>
    );
  }

  // Default fallback (spectrum)
  return (
    <div className="flex items-end gap-1 h-16 mt-6 opacity-80">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="flex-1 bg-red-500/40 border-t border-red-500 origin-bottom" 
             style={{ animation: `pulse-height ${0.5 + Math.random()}s ease-in-out infinite alternate`, height: `${20 + Math.random()*80}%` }} />
      ))}
    </div>
  );
}
