import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES, certifications, PUBLICATIONS, education } from '../data';
import { GraduationCap, Briefcase, Award, BookOpen, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
};

export default function ResumeTab() {
  const { t } = useLanguage();
  const workTimeline = EXPERIENCES.filter(exp => exp.type === 'work');

  return (
    <motion.div
      className="flex flex-col gap-6 w-full select-none"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Header Plate */}
      <motion.div variants={fadeUp} className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-amber-500 rounded-sm" />
          <span className="font-bold text-white uppercase tracking-wider">{t.resume.header}</span>
        </div>
        <span className="text-[10px] text-zinc-600 font-mono">{t.resume.status}</span>
      </motion.div>

      {/* Dual Bus Timelines (Education & Career) */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* Track 01: Academic Qualification */}
        <div className="chassis-box p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 font-mono text-[10px]">
            <div className="flex items-center gap-2 text-zinc-200 font-bold">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>{t.resume.educationTrack}</span>
            </div>
            <span className="text-zinc-600">{t.resume.educationLevel}</span>
          </div>

          <div className="flex flex-col gap-5 pl-2 border-l border-white/10 relative">
            {education.map((item, idx) => (
              <div key={idx} className="relative pl-5 flex flex-col gap-1.5">
                {/* Node pin */}
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-amber-400 led-amber led-pulse-slow led-pulse-delay-1" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-amber-400 font-bold">
                    {t.resume.period} {item.period}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                    {t.resume.gpaLabel} {item.gpa}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white font-display">
                  {item.degree}
                </h4>

                <div className="text-xs text-zinc-400 font-mono">
                  {item.school} <span className="text-zinc-600">[{item.location}]</span>
                </div>

                <ul className="flex flex-col gap-1 pt-1">
                  {item.achievements.map((pt, i) => (
                    <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5 font-sans leading-relaxed">
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400/60 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Track 02: Industrial Engineering Experience */}
        <div className="chassis-box p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 font-mono text-[10px]">
            <div className="flex items-center gap-2 text-zinc-200 font-bold">
              <Briefcase className="w-4 h-4 text-orange-400" />
              <span>{t.resume.workTrack}</span>
            </div>
            <span className="text-zinc-600">{t.resume.workLevel}</span>
          </div>

          <div className="flex flex-col gap-5 pl-2 border-l border-white/10 relative">
            {workTimeline.map((item) => (
              <div key={item.id} className="relative pl-5 flex flex-col gap-1.5">
                {/* Node pin */}
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-orange-400 led-orange led-pulse-slow led-pulse-delay-2" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-orange-400 font-bold">
                    {t.resume.period} {item.period}
                  </span>
                  {item.badge && (
                    <span className="font-mono text-[9px] text-zinc-300 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-white font-display">
                  {item.role}
                </h4>

                <div className="text-xs text-zinc-400 font-mono">
                  {item.company}
                </div>

                <ul className="flex flex-col gap-1 pt-1">
                  {item.description.map((pt, i) => (
                    <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5 font-sans leading-relaxed">
                      <ChevronRight className="w-3.5 h-3.5 text-orange-400/60 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Certifications and Research Publications Registry */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {/* Certifications */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white uppercase tracking-wider">{t.resume.certHeader}</span>
            </div>
          </div>

          <motion.div
            className="flex flex-col gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {certifications.map((cert, index) => (
              <motion.div key={index} variants={fadeUp} className="chassis-box p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col gap-0.5">
                    <h5 className="text-sm font-bold text-white font-display">
                      {cert.name}
                    </h5>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {t.resume.issuer} {cert.issuer} // {t.resume.level} {cert.level}
                    </span>
                  </div>
                </div>

                {/* Validity specs */}
                <div className="chassis-inset p-2 grid grid-cols-2 gap-2 font-mono text-[9px] text-zinc-400">
                  <div>{t.resume.release} {cert.date}</div>
                  <div>{t.resume.validUntil} {cert.validUntil}</div>
                </div>

                {/* Skills tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cert.skills.map((sk, si) => (
                      <span key={si} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-amber-400/90">
                        {sk}
                      </span>
                    ))}
                  </div>
                )}

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-2 mt-1 font-mono text-[10px]">
                    <span className="text-zinc-500">ID: {cert.credentialId}</span>
                    {cert.verifyUrl && cert.verifyUrl !== '-' && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:text-white flex items-center gap-1 font-bold"
                      >
                        <span>{t.resume.verify}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Publications */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase tracking-wider">{t.resume.pubHeader}</span>
            </div>
          </div>

          <motion.div
            className="flex flex-col gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {PUBLICATIONS.map((pub) => (
              <motion.div key={pub.id} variants={fadeUp} className="chassis-box p-4 flex flex-col gap-2.5">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col gap-0.5">
                    <h5 className="text-sm font-bold text-white font-display">
                      {pub.title}
                    </h5>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {t.resume.author} {pub.author}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-1.5 py-0.5 rounded shrink-0">
                    {pub.year}
                  </span>
                </div>

                <div className="chassis-inset p-2 font-mono text-[9px] text-zinc-400">
                  {t.resume.published} {pub.journal}
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.06] pt-2 font-mono text-[10px]">
                  {pub.doi && <span className="text-zinc-500">DOI: {pub.doi}</span>}
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-white flex items-center gap-1 font-bold ml-auto"
                    >
                      <span>{t.resume.openJournal}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
