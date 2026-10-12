import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code, Lightbulb, Bookmark, Target, Layers, Terminal, Database, Sliders, Activity } from 'lucide-react';
import { SKILLS } from '../data';
import { useLanguage } from '../i18n/LanguageContext';

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function OverviewTab() {
  const { t } = useLanguage();
  const [activeUnit, setActiveUnit] = useState<string | null>(null);

  const strengthsData = [
    { id: 's1', iconName: 'Codexml' },
    { id: 's2', iconName: 'Lightbulb' },
    { id: 's3', iconName: 'Bookmark' },
    { id: 's4', iconName: 'Target' },
  ];

  const getStrengthIcon = (iconName: string) => {
    switch (iconName) {
      case 'Codexml':   return <Code className="w-5 h-5 text-amber-400" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-orange-400" />;
      case 'Bookmark':  return <Bookmark className="w-5 h-5 text-emerald-400" />;
      case 'Target':    return <Target className="w-5 h-5 text-cyan-400" />;
      default:          return <Code className="w-5 h-5 text-amber-400" />;
    }
  };

  const categoryConfig = [
    { id: 'core',      icon: Terminal, code: 'LANG'  },
    { id: 'framework', icon: Layers,   code: 'FRAME' },
    { id: 'db',        icon: Database, code: 'DATA'  },
    { id: 'tool',      icon: Sliders,  code: 'TOOL'  },
  ];

  return (
    <motion.div
      className="flex flex-col gap-6 w-full select-none"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Unit Overview Header Console Plate */}
      <motion.div variants={fadeUp} className="chassis-box p-6 sm:p-7 flex flex-col gap-5 relative overflow-hidden">
        {/* Scanner line effect on the header panel */}
        <div className="scanner-line scanner-line-delay-1" />

        {/* Subtle Tech Calibration Markings */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-zinc-500 font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 led-green led-pulse" />
            <span className="text-zinc-300 font-bold tracking-wider">{t.overview.headerLabel}</span>
          </div>
          <span className="text-zinc-600">{t.overview.serial}</span>
        </div>

        {/* Console Display Screen */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-black/50 border border-white/10 w-max font-mono text-[10px] text-amber-400">
            <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>{t.overview.operationalLabel}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-display">
            {t.overview.headline}
          </h2>

          <p className="text-sm leading-relaxed text-zinc-400 max-w-2xl font-sans">
            {t.personal.bio}
          </p>
        </div>

        {/* Hardware Pinout Modalities Strip */}
        <div className="chassis-inset p-3 flex flex-wrap items-center gap-2 font-mono text-[10px]">
          <span className="text-zinc-600 mr-1 uppercase">{t.overview.modulesLabel}</span>
          {t.overview.modules.map((mod, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 font-medium"
            >
              {mod}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Core Competence Coprocessors (Strengths) */}
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-500 rounded-sm" />
            <span className="font-bold text-white uppercase tracking-wider">{t.overview.strengthsHeader}</span>
          </div>
          <span className="text-[10px] text-zinc-600">{t.overview.strengthsCount}</span>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-3.5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {strengthsData.map((strength, index) => {
            const strengthT = t.strengths[strength.id as keyof typeof t.strengths];
            return (
              <motion.div
                key={strength.id}
                variants={fadeUp}
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
                      {t.overview.unitLabel}{index + 1}
                    </span>
                  </div>
                  <span className={`w-2 h-2 rounded-full transition-all ${
                    activeUnit === strength.id
                      ? 'bg-amber-400 led-amber led-pulse-fast'
                      : 'bg-zinc-700'
                  }`} />
                </div>

                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors font-display">
                    {strengthT.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {strengthT.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Silicon & Framework Instruction Matrix (Skills) */}
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-cyan-500 rounded-sm" />
            <span className="font-bold text-white uppercase tracking-wider">{t.overview.skillsHeader}</span>
          </div>
          <span className="text-[10px] text-zinc-600">{t.overview.skillsCount}</span>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-3.5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categoryConfig.map((cat) => {
            const CatIcon = cat.icon;
            const categorySkills = SKILLS.filter(s => s.category === cat.id);
            const label = t.overview.categoryLabels[cat.id as keyof typeof t.overview.categoryLabels];

            return (
              <motion.div key={cat.id} variants={fadeUp} className="chassis-box p-4 flex flex-col gap-3">
                {/* Bay Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 font-mono text-[10px]">
                  <div className="flex items-center gap-2 text-zinc-300 font-bold">
                    <CatIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{label}</span>
                  </div>
                  <span className="text-zinc-600">{categorySkills.length} {t.overview.skillsItemCount}</span>
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
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
