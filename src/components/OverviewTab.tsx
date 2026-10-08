import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Lightbulb, Bookmark, Target, Layers, Terminal, Database, Sliders, Cpu, Activity, Zap } from 'lucide-react';
import { PERSONAL_INFO, STRENGTHS, SKILLS } from '../data';

export default function OverviewTab() {
  const [activeUnit, setActiveUnit] = useState<string | null>(null);

  const getStrengthIcon = (iconName: string) => {
    switch (iconName) {
      case 'Codexml':
        return <Code className="w-5 h-5 text-amber-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-orange-400" />;
      case 'Bookmark':
        return <Bookmark className="w-5 h-5 text-emerald-400" />;
      case 'Target':
        return <Target className="w-5 h-5 text-cyan-400" />;
      default:
        return <Code className="w-5 h-5 text-amber-400" />;
    }
  };

  const categories = [
    { id: 'core', label: 'BAY 01 // BAHASA PEMROGRAMAN & CORE', icon: Terminal, code: 'LANG' },
    { id: 'framework', label: 'BAY 02 // FRAMEWORK & WEB RUNTIMES', icon: Layers, code: 'FRAME' },
    { id: 'db', label: 'BAY 03 // BASIS DATA & RELATIONAL STORAGE', icon: Database, code: 'DATA' },
    { id: 'tool', label: 'BAY 04 // INSTRUMEN PENGEMBANGAN & CLOUD', icon: Sliders, code: 'TOOL' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Unit Overview Header Console Plate */}
      <div className="chassis-box p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden">
        {/* Subtle Tech Calibration Markings */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-zinc-500 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 led-green" />
            <span className="text-zinc-300 font-bold tracking-wider">UNIT CONSOLE // CORE ARCHITECTURE</span>
          </div>
          <span className="text-zinc-600">SERIAL: MHS-2026-ENG</span>
        </div>

        {/* Console Display Screen */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/50 border border-white/10 w-max font-mono text-[10px] text-amber-400">
            <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>OPERATIONAL // SPESIALIS REKAYASA AI & WEB</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
            Sistem Cerdas, Arsitektur Bersih, dan Komputasi Efisien.
          </h2>

          <p className="text-sm leading-relaxed text-zinc-400 max-w-2xl font-sans">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Hardware Pinout Modalities Strip */}
        <div className="chassis-inset p-3 flex flex-wrap items-center gap-2 font-mono text-[10px]">
          <span className="text-zinc-600 mr-1 uppercase">MODUL TERPASANG:</span>
          {['VISION: CNN MANUAL', 'NLP: LSTM + FASTTEXT', 'FULLSTACK: REACT + LARAVEL/FLASK', 'STORAGE: POSTGRES & SQLITE'].map((mod, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 font-medium"
            >
              {mod}
            </span>
          ))}
        </div>
      </div>

      {/* Core Competence Coprocessors (Strengths) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-500 rounded-sm" />
            <span className="font-bold text-white uppercase tracking-wider">PILAR KOMPETENSI REKAYASA</span>
          </div>
          <span className="text-[10px] text-zinc-600">4 COPROCESSOR UNITS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {STRENGTHS.map((strength, index) => (
            <motion.div
              key={strength.id}
              whileHover={{ y: -2 }}
              className="chassis-box p-4 flex flex-col justify-between gap-3 group cursor-default"
              onMouseEnter={() => setActiveUnit(strength.id)}
              onMouseLeave={() => setActiveUnit(null)}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-black/60 border border-white/10">
                    {getStrengthIcon(strength.iconName)}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-zinc-400 tracking-wider">
                    UNIT_0{index + 1}
                  </span>
                </div>
                <span className={`w-2 h-2 rounded-full transition-all ${
                  activeUnit === strength.id ? 'bg-amber-400 led-amber' : 'bg-zinc-700'
                }`} />
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                  {strength.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {strength.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Silicon & Framework Instruction Matrix (Skills) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-cyan-500 rounded-sm" />
            <span className="font-bold text-white uppercase tracking-wider">MATRIKS TEKNOLOGI & PERANGKAT</span>
          </div>
          <span className="text-[10px] text-zinc-600">21 VERIFIED TOOLS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const categorySkills = SKILLS.filter(s => s.category === cat.id);

            return (
              <div key={cat.id} className="chassis-box p-4 flex flex-col gap-3">
                {/* Bay Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 font-mono text-[10px]">
                  <div className="flex items-center gap-2 text-zinc-300 font-bold">
                    <CatIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{cat.label}</span>
                  </div>
                  <span className="text-zinc-600">{categorySkills.length} ITEMS</span>
                </div>

                {/* SMD Chip Badges */}
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((sk) => (
                    <motion.div
                      key={sk.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-2.5 py-1 rounded bg-[#101217] border border-white/10 hover:border-amber-500/40 text-zinc-300 hover:text-white font-mono text-[11px] flex items-center gap-1.5 cursor-default transition-colors shadow-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-cyan-400/80" />
                      <span>{sk.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
