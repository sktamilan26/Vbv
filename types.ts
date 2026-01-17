
export type DeviceBrand = 
  | 'Samsung' | 'Redmi / Xiaomi' | 'Realme' | 'Vivo' | 'Oppo' 
  | 'iQOO' | 'Poco' | 'OnePlus' | 'Motorola' | 'Infinix' 
  | 'Tecno' | 'Lava' | 'Asus' | 'Micromax' | 'Other';

export type RamOption = 
  | '2 GB' | '3 GB' | '4 GB' | '6 GB' | '8 GB' | '8 GB+';

export type DpiOption = 
  | 'Low DPI (≤ 360)' | 'Medium DPI (361 – 420)' | 'High DPI (421+)';

export type PlayStyle = 
  | 'Rush' | 'Normal' | 'Sniper' | 'Room Match';

export type NetworkType = 
  | 'WiFi' | 'Mobile Data';

export type AppView = 'landing' | 'home' | 'account' | 'payment';

export interface UserInput {
  brand: DeviceBrand | '';
  model: string;
  ram: RamOption | '';
  dpi: DpiOption | '';
  playStyle: PlayStyle | '';
  network: NetworkType | '';
}

export interface GfxSettings {
  resolution: string;
  graphics: string;
  fps: string;
  shadow: string;
  style: string;
}

export interface SensitivitySettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniperScope: number;
  freeLook: number;
}

export interface CalculationResult {
  performanceScore: number;
  tier: 'Low' | 'Mid' | 'High';
  sensitivity: SensitivitySettings;
  gfx: GfxSettings;
  warnings: string[];
}
