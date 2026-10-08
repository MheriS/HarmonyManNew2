import React, { memo } from 'react';

function CosmicBackgroundComponent() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Precision Engineering Matrix Grid */}
      <div className="absolute inset-0 tech-grid opacity-60" />

      {/* Coordinate Crosshairs at Key Intersections */}
      <div className="absolute inset-0">
        <span className="absolute top-12 left-12 font-mono text-[9px] text-zinc-700 tracking-wider">
          + LAT: -07.1523° // LON: 112.7521°
        </span>
        <span className="absolute top-12 right-12 font-mono text-[9px] text-zinc-700 tracking-wider hidden md:block">
          SYS_CALIBRATION // STABLE
        </span>
        <span className="absolute bottom-12 left-12 font-mono text-[9px] text-zinc-700 tracking-wider hidden md:block">
          CLK: 3.20 GHz // SAMPLING: 96kHz
        </span>
        <span className="absolute bottom-12 right-12 font-mono text-[9px] text-zinc-700 tracking-wider">
          + TE-INSTRUMENTATION CHASSIS
        </span>
      </div>

      {/* Subtle Analog Signal Vignette */}
      <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0b0c10]/70 to-[#0b0c10]" />
    </div>
  );
}

export default memo(CosmicBackgroundComponent);
