import React, { memo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

function CosmicBackgroundComponent() {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Animated Precision Engineering Matrix Grid */}
      <div className="absolute inset-0 tech-grid-animated opacity-50" />

      {/* Coordinate Crosshairs at Key Intersections */}
      <div className="absolute inset-0">
        <span className="absolute top-12 left-12 font-mono text-[9px] text-zinc-700/80 tracking-wider">
          {t.background.coords}
        </span>
        <span className="absolute top-12 right-12 font-mono text-[9px] text-zinc-700/80 tracking-wider hidden md:block">
          {t.background.calibration}
        </span>
        <span className="absolute bottom-12 left-12 font-mono text-[9px] text-zinc-700/80 tracking-wider hidden md:block">
          {t.background.clock}
        </span>
        <span className="absolute bottom-12 right-12 font-mono text-[9px] text-zinc-700/80 tracking-wider">
          {t.background.brand}
        </span>
      </div>

      {/* Subtle Analog Signal Vignette */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0b0c10]/70 to-[#0b0c10]" />
    </div>
  );
}

export default memo(CosmicBackgroundComponent);
