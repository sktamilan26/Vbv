
import React from 'react';
import { UserInput, DeviceBrand, RamOption, DpiOption, PlayStyle, NetworkType } from '../types';
import { BRAND_MODELS } from '../constants';

interface InputSectionProps {
  input: UserInput;
  onChange: (field: keyof UserInput, value: string) => void;
  onGenerate: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ input, onChange, onGenerate }) => {
  const brands = Object.keys(BRAND_MODELS) as DeviceBrand[];
  const rams: RamOption[] = ['2 GB', '3 GB', '4 GB', '6 GB', '8 GB', '8 GB+'];
  const dpis: DpiOption[] = ['Low DPI (≤ 360)', 'Medium DPI (361 – 420)', 'High DPI (421+)'];
  const styles: PlayStyle[] = ['Rush', 'Normal', 'Sniper', 'Room Match'];
  const networks: NetworkType[] = ['WiFi', 'Mobile Data'];

  const isFormValid = input.brand && input.model && input.ram && input.dpi && input.playStyle && input.network;

  return (
    <div className="space-y-6 bg-zinc-900/50 p-6 sm:p-8 rounded-3xl border border-zinc-800 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-bottom-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Brand */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Mobile Brand</label>
          <select 
            value={input.brand}
            onChange={(e) => onChange('brand', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">Select Brand</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Model */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Mobile Model</label>
          <select 
            disabled={!input.brand}
            value={input.model}
            onChange={(e) => onChange('model', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none disabled:opacity-30 cursor-pointer"
          >
            <option value="">Select Model</option>
            {input.brand && BRAND_MODELS[input.brand as DeviceBrand].map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        {/* RAM */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Device RAM</label>
          <select 
            value={input.ram}
            onChange={(e) => onChange('ram', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">Select RAM</option>
            {rams.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* DPI */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">DPI Setting</label>
          <select 
            value={input.dpi}
            onChange={(e) => onChange('dpi', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">Select DPI</option>
            {dpis.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Play Style */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Play Style</label>
          <select 
            value={input.playStyle}
            onChange={(e) => onChange('playStyle', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">Select Style</option>
            {styles.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Network */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] ml-1">Network Type</label>
          <select 
            value={input.network}
            onChange={(e) => onChange('network', e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">Select Network</option>
            {networks.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={!isFormValid}
        className={`w-full py-5 mt-6 font-bold rounded-2xl text-lg transition-all transform active:scale-[0.98] flex items-center justify-center space-x-3 shadow-2xl ${
          isFormValid 
          ? 'bg-fire-gradient text-white hover:brightness-110' 
          : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
        }`}
      >
        <span className="font-orbitron tracking-widest uppercase">Generate Settings</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>
    </div>
  );
};

export default InputSection;
