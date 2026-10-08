import React from 'react';
import { motion } from 'motion/react';
import { TabType } from '../types';
import { Cpu, Box, FileText, Radio } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const channels = [
    { id: 'overview' as TabType, code: '01', label: 'OVERVIEW', sub: 'Ringkasan Sistem', icon: Cpu },
    { id: 'projects' as TabType, code: '02', label: 'MODULES', sub: 'Koleksi Karya', icon: Box },
    { id: 'resume' as TabType, code: '03', label: 'DOSSIER', sub: 'Kualifikasi & Edu', icon: FileText },
    { id: 'contact' as TabType, code: '04', label: 'COMMS', sub: 'Saluran Kontak', icon: Radio },
  ];

  return (
    <nav
      aria-label="Konsol Pemilih Saluran Portofolio"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-[420px] lg:fixed lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-6 lg:left-auto lg:translate-x-0 lg:w-auto"
    >
      {/* Machined Channel Rack Enclosure */}
      <div className="chassis-box p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.9)] border border-white/[0.12]">
        <div className="chassis-inset p-1.5 flex flex-row lg:flex-col items-center gap-1.5">
          {channels.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeTab === ch.id;

            return (
              <motion.button
                key={ch.id}
                onClick={() => setActiveTab(ch.id)}
                whileTap={{ scale: 0.94 }}
                className={`group relative flex flex-col items-center justify-center p-2.5 sm:px-3 sm:py-2.5 rounded-lg border transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#1e222d] border-amber-500/50 text-white shadow-[0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)]'
                    : 'bg-[#101217] border-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-[#161820]'
                }`}
              >
                {/* Hardware Status LED Pip */}
                <div className="flex items-center gap-1 mb-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      isActive ? 'bg-amber-400 led-amber' : 'bg-zinc-700'
                    }`}
                  />
                  <span className="font-mono text-[9px] font-bold tracking-widest text-zinc-500 group-hover:text-zinc-400">
                    CH_{ch.code}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                  <span className="hidden sm:inline-block font-mono text-[10px] font-bold tracking-wider">
                    {ch.label}
                  </span>
                </div>

                {/* Desktop Micro Tooltip */}
                <div className="hidden lg:block absolute right-24 bg-[#0a0b0e] border border-white/10 text-white rounded-lg py-1.5 px-3 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-150 text-left shadow-2xl">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 led-amber" />
                    <span className="font-mono text-[10px] font-bold tracking-wider text-amber-400 uppercase">
                      CHANNEL {ch.code}
                    </span>
                  </div>
                  <span className="block text-xs font-semibold text-zinc-200 mt-0.5">{ch.sub}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
