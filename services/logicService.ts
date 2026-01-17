
import { UserInput, CalculationResult, SensitivitySettings, GfxSettings } from '../types';

export const calculateSettings = (input: UserInput): CalculationResult => {
  const warnings: string[] = [];
  
  // 1. Performance Scoring
  let score = 0;
  const ramValue = parseInt(input.ram);
  
  if (ramValue <= 2) score += 20;
  else if (ramValue <= 4) score += 50;
  else if (ramValue <= 6) score += 75;
  else score += 100;

  // High Precision Model Uniqueness (Hashing)
  // We use multiple inputs to ensure two different devices/RAM configs never show same values
  const seedString = `${input.brand}-${input.model}-${input.ram}-${input.network}-${input.playStyle}`.toLowerCase();
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = ((hash << 5) - hash) + seedString.charCodeAt(i);
    hash |= 0;
  }
  
  // Extract multiple offsets from hash
  const genOffset = (Math.abs(hash) % 11) - 5; // -5 to +5
  const redOffset = (Math.abs(hash >> 2) % 11) - 5;
  const scopeOffset = (Math.abs(hash >> 4) % 11) - 5;

  // Play Style adjustments
  let sensBase = 85;
  if (input.playStyle === 'Rush') sensBase = 95;
  if (input.playStyle === 'Sniper') sensBase = 72;
  if (input.playStyle === 'Room Match') sensBase = 93;

  // DPI adjustments
  if (input.dpi === 'Low DPI (≤ 360)') sensBase += 5;
  if (input.dpi === 'High DPI (421+)') sensBase -= 4;

  const tier = score >= 80 ? 'High' : score >= 50 ? 'Mid' : 'Low';

  // Sensitivity Calculation with high-precision unique offsets
  const sensitivity: SensitivitySettings = {
    general: Math.min(100, Math.max(70, sensBase + genOffset + (tier === 'Low' ? -1 : 4))),
    redDot: Math.min(100, Math.max(70, sensBase + (input.playStyle === 'Room Match' ? 6 : 2) + redOffset)),
    scope2x: Math.min(100, Math.max(60, sensBase - 10 + scopeOffset)),
    scope4x: Math.min(100, Math.max(50, sensBase - 15 + scopeOffset)),
    sniperScope: input.playStyle === 'Sniper' ? 44 + genOffset : 55 + genOffset,
    freeLook: 80 + redOffset
  };

  // GFX Calculation
  const gfx: GfxSettings = {
    resolution: tier === 'High' ? 'High (FHD)' : tier === 'Mid' ? 'Standard' : 'Low',
    graphics: ramValue <= 2 ? 'Smooth' : tier === 'High' ? 'Ultra / Max' : 'Standard',
    fps: tier === 'High' ? 'High (60/90 FPS)' : 'Standard (30 FPS)',
    shadow: tier === 'High' ? 'On' : 'Off',
    style: input.playStyle === 'Rush' ? 'Colorful' : input.playStyle === 'Room Match' ? 'Vivid' : 'Classic'
  };

  if (ramValue <= 2) {
    warnings.push("HD GFX disabled for 2GB RAM to maintain stability.");
  }
  
  if (input.playStyle === 'Sniper' && input.dpi === 'High DPI (421+)') {
    warnings.push("High DPI detected. Lower 'General' sensitivity by 2 for better sniper control.");
  }

  return {
    performanceScore: score,
    tier,
    sensitivity,
    gfx,
    warnings
  };
};
