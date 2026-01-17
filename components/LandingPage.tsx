
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onPaidClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onPaidClick }) => {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto py-10">
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center">
        {/* Visual decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/10 rounded-full blur-[80px] -z-10"></div>
        
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-7xl font-orbitron font-black text-white leading-tight tracking-tighter uppercase italic">
              FREE FIRE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">HEADSHOT 85%</span>
            </h2>
            <div className="h-1 w-24 bg-fire-gradient mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
            <button 
              onClick={onPaidClick}
              className="group relative bg-zinc-950 border border-cyan-500/30 hover:border-cyan-500 hover:bg-zinc-900 text-cyan-400 font-black py-5 px-8 rounded-2xl text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center space-x-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
              <span>PAID DOWNLOAD</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>

            <button 
              onClick={onStart}
              className="group relative bg-fire-gradient text-white font-black py-5 px-8 rounded-2xl text-sm uppercase tracking-[0.3em] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(249,115,22,0.3)] flex items-center justify-center space-x-3"
            >
              <span>NORMAL SENSITIVITY VALUES</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          <div className="pt-8 flex items-center justify-center space-x-4 opacity-30">
            <div className="h-px w-12 bg-zinc-700"></div>
            <span className="text-[10px] font-black tracking-widest uppercase">Select your path</span>
            <div className="h-px w-12 bg-zinc-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
