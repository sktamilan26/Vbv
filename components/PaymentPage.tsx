
import React, { useState } from 'react';

interface PaymentPageProps {
  onBack: () => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onBack }) => {
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([0, 1, 3]); // Default some selected

  const features = [
    { id: 0, title: "Direct Aim Lock", icon: "🎯" },
    { id: 1, title: "99% Headshot Rate", icon: "🔥" },
    { id: 2, title: "No-Recoil Script", icon: "⚡" },
    { id: 3, title: "Antiban 100% Safe", icon: "🛡️" },
    { id: 4, title: "Lifetime Support", icon: "💎" }
  ];

  const toggleFeature = (id: number) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handlePay = () => {
    window.open('https://www.instagram.com/sk_8820_dm', '_blank');
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 max-w-2xl mx-auto py-10">
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-[2.5rem] p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex justify-between items-center mb-10">
          <button onClick={onBack} className="text-zinc-500 hover:text-white flex items-center space-x-2 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-black uppercase tracking-widest">Back</span>
          </button>
          <div className="px-4 py-1.5 bg-zinc-800/80 rounded-full text-[10px] text-cyan-400 font-black uppercase tracking-widest border border-cyan-500/20">Premium Setup</div>
        </div>

        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
            <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">Select Desired Features</span>
          </div>
          <h2 className="text-4xl font-orbitron font-black text-white mb-4 tracking-tighter uppercase italic">
            VIP <span className="text-cyan-400">PAID</span> VERSION
          </h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Choose your configuration and proceed to activation</p>
        </div>

        <div className="space-y-4 mb-12">
          {features.map((item) => {
            const isSelected = selectedFeatures.includes(item.id);
            return (
              <button 
                key={item.id} 
                onClick={() => toggleFeature(item.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 transform active:scale-[0.99] ${
                  isSelected 
                  ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                  : 'bg-zinc-950/50 border-zinc-800/50 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center space-x-5">
                  <span className={`text-2xl transition-transform duration-300 ${isSelected ? 'scale-125' : 'scale-100 opacity-50'}`}>
                    {item.icon}
                  </span>
                  <span className={`text-sm font-black uppercase tracking-widest transition-colors ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
                    {item.title}
                  </span>
                </div>
                
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isSelected 
                  ? 'bg-cyan-500 border-cyan-500 text-black' 
                  : 'border-zinc-800 text-transparent'
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-5">
          <button 
            onClick={handlePay}
            disabled={selectedFeatures.length === 0}
            className={`w-full font-black py-6 rounded-2xl text-lg uppercase tracking-[0.3em] transition-all transform flex items-center justify-center space-x-3 shadow-2xl ${
              selectedFeatures.length > 0 
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(6,182,212,0.4)]' 
              : 'bg-zinc-800 text-zinc-600 cursor-not-allowed opacity-50'
            }`}
          >
            <span>{selectedFeatures.length > 0 ? 'PAY NOW' : 'SELECT FEATURES'}</span>
            {selectedFeatures.length > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          </button>
          
          <div className="p-4 bg-zinc-950/80 rounded-xl border border-zinc-800/50">
            <p className="text-[10px] text-zinc-500 text-center font-bold uppercase tracking-[0.15em] leading-relaxed">
              Redirecting to <span className="text-cyan-400">@sk_8820_dm</span> for secure activation.
              <br />
              <span className="text-zinc-700">Selected Features: {selectedFeatures.length} / {features.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
