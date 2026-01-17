
import React, { useState, useEffect } from 'react';
import { UserInput, CalculationResult, AppView } from './types';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import AccountSection from './components/AccountSection';
import LandingPage from './components/LandingPage';
import PaymentPage from './components/PaymentPage';
import Login from './components/Login';
import { calculateSettings } from './services/logicService';
import { auth, onAuthStateChanged, signOut } from './firebaseConfig';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState<AppView>('landing');
  const [userInput, setUserInput] = useState<UserInput>({
    brand: '',
    model: '',
    ram: '',
    dpi: '',
    playStyle: '',
    network: ''
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        setView('landing'); 
      }
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (field: keyof UserInput, value: string) => {
    setUserInput(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'brand') updated.model = '';
      return updated;
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const results = calculateSettings(userInput);
      setResult(results);
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
  };

  const handleViewChange = (newView: AppView) => {
    setView(newView);
    setResult(null); 
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070707]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-zinc-900 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-orbitron text-[10px] tracking-[0.4em] uppercase">Initializing secure link</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-orange-500/30 flex flex-col">
      {/* Account Icon Overlay - Always visible when logged in */}
      {user && (
        <div className="fixed top-6 right-4 sm:right-10 z-[100]">
          <button 
            onClick={() => setView(view === 'account' ? 'landing' : 'account')}
            className="flex items-center space-x-3 bg-zinc-900/80 hover:bg-zinc-800 p-1.5 pr-4 rounded-full border border-zinc-800 backdrop-blur-xl transition-all group shadow-2xl"
          >
            <div className="w-10 h-10 rounded-full bg-fire-gradient flex items-center justify-center text-white text-sm font-black border-2 border-zinc-950 shadow-inner group-hover:scale-105 transition-transform">
              {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden md:flex flex-col items-start text-left">
              <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest leading-none mb-0.5">OPERATOR</span>
              <span className="text-xs font-bold text-white truncate max-w-[140px]">{user.displayName || 'Unnamed'}</span>
            </div>
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-16 flex flex-col items-center text-center relative overflow-hidden w-full">
        <div className="relative z-10 w-full animate-in fade-in slide-in-from-top-6 duration-700">
          <div className="inline-block p-1 rounded-2xl bg-zinc-800/50 mb-6">
            <div className="px-5 py-1.5 bg-fire-gradient rounded-xl text-[10px] font-black tracking-[0.4em] text-white uppercase shadow-lg">
              TAMILGAMING8220
            </div>
          </div>
          <h1 className="text-5xl sm:text-8xl font-orbitron font-black text-white mb-6 tracking-tighter">
            FIREHEAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-red-600">PRO</span>
          </h1>
          <p className="text-zinc-600 max-w-xl mx-auto text-[11px] sm:text-xs leading-relaxed px-6 uppercase tracking-[0.3em] font-black opacity-60">
            Advanced Hardware Calibration for Competitive Performance
          </p>
        </div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-orange-600/5 blur-[150px] pointer-events-none -z-10"></div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-24 w-full flex-grow">
        {!user ? (
          <Login />
        ) : (
          <>
            {view === 'account' ? (
              <AccountSection user={user} onBack={() => setView('landing')} />
            ) : view === 'landing' ? (
              <LandingPage onStart={() => setView('home')} onPaidClick={() => setView('payment')} />
            ) : view === 'payment' ? (
              <PaymentPage onBack={() => setView('landing')} />
            ) : (
              <>
                {!result && !isGenerating && (
                  <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <InputSection 
                      input={userInput} 
                      onChange={handleInputChange} 
                      onGenerate={handleGenerate} 
                    />
                    
                    {/* Feature Matrix */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { id: '01', title: 'Hardware Sync', desc: 'Deep-level hardware profiling for unique calibration.', color: 'border-orange-500/20' },
                        { id: '02', title: 'Aim Lock', desc: 'Precision-mapped sensitivity for headshot consistency.', color: 'border-red-500/20' },
                        { id: '03', title: 'Zero Lag', desc: 'Hardware-safe GFX profiles for high-performance FPS.', color: 'border-purple-500/20' }
                      ].map(feature => (
                        <div key={feature.id} className={`group p-8 rounded-[2rem] bg-zinc-900/30 border ${feature.color} backdrop-blur-sm hover:bg-zinc-900/60 transition-all hover:-translate-y-2 cursor-default`}>
                          <div className="text-3xl font-orbitron font-black text-white/5 group-hover:text-orange-500/20 transition-colors mb-4">{feature.id}</div>
                          <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3">{feature.title}</h4>
                          <p className="text-zinc-600 text-[11px] leading-relaxed font-bold uppercase tracking-wider">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex flex-col items-center justify-center py-28 space-y-10">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 border-[8px] border-zinc-900/50 rounded-full"></div>
                      <div className="absolute inset-0 border-[8px] border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute inset-5 border-[4px] border-red-500/30 rounded-full border-b-transparent animate-spin-slow"></div>
                    </div>
                    <div className="text-center space-y-2">
                      <h2 className="text-3xl font-orbitron font-black text-white tracking-[0.4em] animate-pulse uppercase italic">CALIBRATING</h2>
                      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">Hashing unique matrices for {userInput.model}</p>
                    </div>
                  </div>
                )}

                {result && !isGenerating && (
                  <ResultSection 
                    result={result} 
                    userInput={userInput} 
                    onReset={handleReset} 
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-16 border-t border-zinc-900 px-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-10">
          <a 
            href="https://www.youtube.com/@TAMILGAMING8220" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center space-x-4 bg-zinc-950 px-10 py-5 rounded-2xl hover:bg-zinc-900 transition-all border border-zinc-800 hover:border-red-500/50 shadow-2xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Subscribe to TAMILGAMING8220</span>
          </a>
          
          <div className="text-center space-y-4">
            <p className="text-[11px] text-zinc-700 font-black uppercase tracking-[0.5em]">
              FireHead GFX &copy; 2025 | AES-256 Encrypted Protocol
            </p>
            <p className="text-[9px] text-zinc-800 max-w-lg mx-auto leading-relaxed uppercase tracking-widest font-bold">
              Disclaimer: This utility provides hardware-based recommendations only. We operate within legal bounds and do not interfere with game source code.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
