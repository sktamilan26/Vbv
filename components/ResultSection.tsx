
import React from 'react';
import { CalculationResult, UserInput } from '../types';

interface ResultSectionProps {
  result: CalculationResult;
  userInput: UserInput;
  onReset: () => void;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result, userInput, onReset }) => {
  const { sensitivity, gfx, warnings, tier } = result;

  const SensitivityItem = ({ label, value }: { label: string, value: number }) => (
    <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
      <div className="flex justify-between items-center mb-2">
        <span className="text-zinc-400 text-sm font-medium">{label}</span>
        <span className="text-orange-500 font-bold">{value}</span>
      </div>
      <div className="w-full bg-zinc-900 rounded-full h-2">
        <div 
          className="bg-fire-gradient h-2 rounded-full transition-all duration-1000" 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  const GfxItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between border-b border-zinc-800 py-3">
      <span className="text-zinc-400">{label}</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Performance Badge */}
      <div className="flex flex-col items-center justify-center space-y-2 py-4">
        <div className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border-2 ${
          tier === 'High' ? 'border-green-500 text-green-500' : 
          tier === 'Mid' ? 'border-yellow-500 text-yellow-500' : 'border-red-500 text-red-500'
        }`}>
          {tier} Performance Device detected
        </div>
        <h3 className="text-zinc-500 text-sm font-medium">{userInput.brand} {userInput.model} ({userInput.ram})</h3>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl space-y-2">
          {warnings.map((w, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-orange-400 text-sm">
              <span className="text-lg">⚠️</span>
              <span>{w}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sensitivity Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
            <h2 className="text-xl font-orbitron text-white">SENSITIVITY VALUES</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <SensitivityItem label="General" value={sensitivity.general} />
            <SensitivityItem label="Red Dot" value={sensitivity.redDot} />
            <SensitivityItem label="2x Scope" value={sensitivity.scope2x} />
            <SensitivityItem label="4x Scope" value={sensitivity.scope4x} />
            <SensitivityItem label="Sniper Scope" value={sensitivity.sniperScope} />
            <SensitivityItem label="Free Look" value={sensitivity.freeLook} />
          </div>
        </div>

        {/* GFX Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1 h-6 bg-red-500 rounded-full"></div>
            <h2 className="text-xl font-orbitron text-white">GFX CONFIGURATION</h2>
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <GfxItem label="Resolution" value={gfx.resolution} />
            <GfxItem label="Graphics" value={gfx.graphics} />
            <GfxItem label="FPS Limit" value={gfx.fps} />
            <GfxItem label="Shadows" value={gfx.shadow} />
            <GfxItem label="Color Style" value={gfx.style} />
            
            <div className="mt-8 p-4 bg-zinc-800/30 rounded-lg text-xs text-zinc-500 leading-relaxed italic">
              Note: These settings are recommended for {userInput.playStyle} style on {userInput.network}. Apply them in the game settings menu for best performance.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
          onClick={onReset}
          className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all"
        >
          RE-CALCULATE
        </button>
        <button 
          onClick={() => window.print()}
          className="flex-1 py-4 bg-fire-gradient text-white font-bold rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>SHARE SETTINGS</span>
        </button>
      </div>
    </div>
  );
};

export default ResultSection;
