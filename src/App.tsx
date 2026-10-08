import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from './types';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import OverviewTab from './components/OverviewTab';
import ProjectsTab from './components/ProjectsTab';
import ResumeTab from './components/ResumeTab';
import ContactTab from './components/ContactTab';
import CosmicBackground from './components/CosmicBackground';
import { MessageSquare, Mail, X, Send, Check, MessageCircle, AlertCircle, Radio } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const tabContentRef = useRef<HTMLDivElement>(null);

  // Floating Transceiver States
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [floatingForm, setFloatingForm] = useState({ name: '', email: '', message: '' });
  const [isFloatingSubmitting, setIsFloatingSubmitting] = useState(false);
  const [floatingSuccess, setFloatingSuccess] = useState(false);
  const [floatingError, setFloatingError] = useState('');
  const [hasWeb3Key, setHasWeb3Key] = useState<boolean>(false);

  useEffect(() => {
    if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) {
      setHasWeb3Key(true);
      return;
    }
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.hasWeb3Key === 'boolean') {
          setHasWeb3Key(data.hasWeb3Key);
        }
      })
      .catch(() => { });
  }, []);

  // Scroll to tab content area on mobile whenever activeTab changes
  useEffect(() => {
    if (tabContentRef.current) {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      if (isMobile) {
        const yOffset = tabContentRef.current.getBoundingClientRect().top + window.scrollY - 72; // 72px offset for sticky header
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
      }
    }
  }, [activeTab]);

  const handleFloatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!floatingForm.name.trim() || !floatingForm.email.trim() || !floatingForm.message.trim()) {
      setFloatingError('Mohon isi semua kolom bertanda *');
      return;
    }

    setFloatingError('');
    setIsFloatingSubmitting(true);

    const clientKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    const savedMessages = JSON.parse(localStorage.getItem('heri_quick_messages') || '[]');
    savedMessages.push({
      ...floatingForm,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('heri_quick_messages', JSON.stringify(savedMessages));

    const finalizeSuccess = () => {
      setIsFloatingSubmitting(false);
      setFloatingSuccess(true);
      setFloatingForm({ name: '', email: '', message: '' });
      setTimeout(() => {
        setFloatingSuccess(false);
        setIsFloatingOpen(false);
      }, 3500);
    };

    if (clientKey) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: clientKey,
          name: floatingForm.name,
          email: floatingForm.email,
          subject: 'Pesan Transceiver Cepat',
          message: floatingForm.message,
          from_name: 'MHS Pocket Transceiver'
        })
      }).then(r => r.json()).then(res => {
        if (res.success) finalizeSuccess();
        else { setFloatingError(res.message); setIsFloatingSubmitting(false); }
      }).catch(() => {
        setFloatingError('Gagal mengirim transmisi.');
        setIsFloatingSubmitting(false);
      });
    } else if (hasWeb3Key) {
      fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: floatingForm.name,
          email: floatingForm.email,
          subject: 'Pesan Transceiver Cepat',
          message: floatingForm.message
        })
      }).then(r => r.json()).then(res => {
        if (res.success) finalizeSuccess();
        else { setFloatingError(res.message); setIsFloatingSubmitting(false); }
      }).catch(() => {
        setFloatingError('Server error.');
        setIsFloatingSubmitting(false);
      });
    } else {
      setTimeout(finalizeSuccess, 1200);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'resume':
        return <ResumeTab />;
      case 'contact':
        return <ContactTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] relative text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-white pb-28 lg:pb-16 overflow-x-hidden">
      {/* Precision Engineering Telemetry Background */}
      <CosmicBackground />

      {/* Top Rack Mount Header */}
      <header className="sticky top-0 z-40 bg-[#0e1015]/95 backdrop-blur-md border-b border-white/[0.1] w-full shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Hardware Identity Stamp */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="hardware-key w-9 h-9 rounded bg-[#1e222d] border border-white/20 flex items-center justify-center cursor-pointer text-amber-400 font-mono font-bold text-sm"
              title="Unit Home"
            >
              H
            </button>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                MHS.INSTRUMENT // ARCHITECTURE v2.6
              </span>
              <span className="font-mono text-[9px] text-zinc-500">
                AI SYSTEMS & FULL-STACK ENGINE
              </span>
            </div>
          </div>

          {/* Telemetry Status & Fast Channel Ports */}
          <div className="flex items-center gap-3">
            {/* LED Status Readout */}
            <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#07080a] border border-white/[0.08] font-mono text-[10px] text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 led-green" />
              <span>SYS_ONLINE: SIAP DEPLOY</span>
            </div>

            {/* Quick Channel Keys */}
            <div className="flex items-center gap-1.5 p-1 rounded bg-[#090a0d] border border-white/[0.08]">
              <a
                href="https://wa.me/6282131505173"
                target="_blank"
                rel="noopener noreferrer"
                className="hardware-key p-1.5 rounded bg-[#141822] hover:bg-emerald-950 text-emerald-400 border border-white/10 transition-colors"
                title="Direct WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:heribangkal21@gmail.com"
                className="hardware-key p-1.5 rounded bg-[#141822] hover:bg-amber-950 text-amber-400 border border-white/10 transition-colors"
                title="Direct Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Rack Console Layout */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-col lg:flex-row gap-6 items-start self-center flex-1 justify-center relative z-10">
        {/* Unit Spec Sidebar */}
        <Sidebar />

        {/* Dynamic Channel Bay Panel */}
        <div ref={tabContentRef} className="flex-1 w-full min-w-0 max-w-4xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Channel Switcher Rack Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pocket Transceiver / Quick Ping Floating Widget */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
        <AnimatePresence>
          {isFloatingOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-[290px] sm:w-[330px] chassis-box p-4 border-amber-500/40 shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 text-zinc-300 font-bold">
                    <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                    <span>TRANSCEIVER // PESAN CEPAT</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFloatingOpen(false)}
                    className="p-1 rounded bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>

                {floatingSuccess ? (
                  <div className="chassis-inset p-4 flex flex-col items-center justify-center text-center gap-2 font-mono text-xs text-emerald-400">
                    <Check className="w-6 h-6 text-emerald-400" />
                    <span className="font-bold">[TRANSMISI DITERIMA]</span>
                    <p className="text-[10px] text-zinc-400 font-sans">
                      Terima kasih. Pesan instan telah masuk ke sistem.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFloatingSubmit} className="flex flex-col gap-2.5 font-mono text-xs">
                    {floatingError && (
                      <div className="p-1.5 rounded bg-rose-950/40 border border-rose-900 text-rose-300 text-[10px]">
                        {floatingError}
                      </div>
                    )}

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[8px] text-zinc-500 uppercase">NAMA *</label>
                      <input
                        type="text"
                        placeholder="Nama Anda"
                        required
                        value={floatingForm.name}
                        onChange={e => setFloatingForm(prev => ({ ...prev, name: e.target.value }))}
                        className="chassis-inset px-2.5 py-1.5 text-white font-sans text-xs focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[8px] text-zinc-500 uppercase">EMAIL *</label>
                      <input
                        type="email"
                        placeholder="email@domain.com"
                        required
                        value={floatingForm.email}
                        onChange={e => setFloatingForm(prev => ({ ...prev, email: e.target.value }))}
                        className="chassis-inset px-2.5 py-1.5 text-white font-sans text-xs focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <label className="text-[8px] text-zinc-500 uppercase">PESAN *</label>
                      <textarea
                        placeholder="Ketik pesan cepat..."
                        required
                        rows={3}
                        value={floatingForm.message}
                        onChange={e => setFloatingForm(prev => ({ ...prev, message: e.target.value }))}
                        className="chassis-inset px-2.5 py-1.5 text-white font-sans text-xs focus:outline-none focus:border-amber-500/50 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isFloatingSubmitting}
                      className="hardware-key w-full py-2 px-3 rounded bg-amber-600 hover:bg-amber-500 text-black font-mono font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                    >
                      {isFloatingSubmitting ? (
                        <span>MENGIRIM...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>TRANSMIT PING</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Transceiver Key */}
        <button
          type="button"
          onClick={() => setIsFloatingOpen(!isFloatingOpen)}
          className="hardware-key p-3.5 rounded-full bg-[#1e222d] border border-amber-500/50 text-amber-400 shadow-[0_10px_25px_rgba(0,0,0,0.8)] cursor-pointer flex items-center justify-center"
          title="Buka Transceiver Cepat"
        >
          {isFloatingOpen ? <X className="w-5 h-5 text-white" /> : <MessageSquare className="w-5 h-5 text-amber-400" />}
        </button>
      </div>
    </div>
  );
}
