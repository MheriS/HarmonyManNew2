import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Copy, Send, AlertCircle, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { useLanguage } from '../i18n/LanguageContext';

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactTab() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [errorText, setErrorText] = useState('');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorText) setErrorText('');
  };

  const handleCopyEmail = () => {
    try {
      navigator.clipboard.writeText(PERSONAL_INFO.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      console.warn("Clipboard access denied");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorText(t.contact.validationError);
      return;
    }

    if (!email.includes('@')) {
      setErrorText(t.contact.emailError);
      return;
    }

    setIsSubmitting(true);
    setErrorText('');

    const clientKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (clientKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: clientKey,
            name: name,
            email: email,
            subject: subject || `Portfolio Message from ${name}`,
            message: message,
            from_name: 'Moh. Heri Susanto Portfolio'
          })
        });

        const result = await response.json();
        if (result.success) {
          setIsSuccess(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => {
            setIsSuccess(false);
          }, 6000);
        } else {
          setErrorText(result.message || t.contact.genericError);
        }
      } catch (err) {
        setErrorText(t.contact.networkError);
      } finally {
        setIsSubmitting(false);
      }
    } else if (hasWeb3Key) {
      try {
        const response = await fetch('/api/submit-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            subject: subject || `Portfolio Message from ${name}`,
            message: message
          })
        });

        const result = await response.json();
        if (result.success) {
          setIsSuccess(true);
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => {
            setIsSuccess(false);
          }, 6000);
        } else {
          setErrorText(result.message || t.contact.genericError);
        }
      } catch (err) {
        setErrorText(t.contact.serverError);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setIsSuccess(false);
        }, 6000);
      }, 1200);
    }
  };

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
          <span className="w-1.5 h-4 bg-orange-500 rounded-sm" />
          <span className="font-bold text-white uppercase tracking-wider">{t.contact.header}</span>
        </div>
        <span className="text-[10px] text-zinc-600 font-mono">{t.contact.status}</span>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-5 gap-5 w-full items-start">
        {/* Left Comms Station */}
        <div className="md:col-span-2 flex flex-col gap-3.5">
          {/* Primary Email Transceiver Card */}
          <div className="chassis-box p-4 flex flex-col gap-3">
            <span className="font-mono text-[9px] text-amber-500 font-bold uppercase tracking-wider">
              {t.contact.primaryChannelLabel}
            </span>

            <div className="chassis-inset p-2.5 font-mono text-xs font-bold text-white break-all">
              {PERSONAL_INFO.email}
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`hardware-key w-full py-2 px-3 rounded font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isCopied
                  ? 'bg-emerald-600 text-black'
                  : 'bg-[#1e222d] border border-white/10 hover:border-amber-500/50 text-zinc-200'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.contact.emailCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.contact.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick WhatsApp Terminal */}
          <div className="chassis-box p-4 flex flex-col gap-2.5">
            <span className="font-mono text-[9px] text-zinc-400 font-bold uppercase tracking-wider">
              {t.contact.whatsappLabel}
            </span>
            <a
              href="https://wa.me/6282131505173"
              target="_blank"
              rel="noopener noreferrer"
              className="hardware-key w-full py-2.5 px-3 rounded bg-[#13261c] border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.contact.whatsappButton}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 led-green led-pulse" />
            </a>
          </div>

          {/* Telemetry Specs */}
          <div className="chassis-inset p-3 flex flex-col gap-2 font-mono text-[10px] text-zinc-400">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">{t.contact.responseTime}</span>
              <span className="text-zinc-200">{t.contact.responseValue}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.06] pt-1.5">
              <span className="text-zinc-500">{t.contact.timezone}</span>
              <span className="text-zinc-200">{t.contact.timezoneValue}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.06] pt-1.5">
              <span className="text-zinc-500">{t.contact.protocolStatus}</span>
              <span className="text-emerald-400 font-bold">{t.contact.protocolValue}</span>
            </div>
          </div>
        </div>

        {/* Right Dispatch Console Form */}
        <div className="md:col-span-3 chassis-box p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 font-mono text-[10px]">
            <div className="flex items-center gap-2 text-zinc-200 font-bold">
              <Send className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.contact.consoleTitle}</span>
            </div>
            <span className="text-zinc-600">{t.contact.consolePort}</span>
          </div>

          {/* Alert notifications */}
          <AnimatePresence>
            {errorText && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="chassis-inset p-2.5 font-mono text-xs text-rose-400 border border-rose-900/50 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{t.contact.errorPrefix} {errorText}</span>
              </motion.div>
            )}

            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="chassis-inset p-3 font-mono text-xs text-emerald-300 border border-emerald-900/50 flex flex-col gap-1"
              >
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>{t.contact.successTitle}</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  {t.contact.successMessage}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase text-zinc-500 font-bold">{t.contact.nameLabel}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.contact.namePlaceholder}
                  disabled={isSubmitting}
                  className="chassis-inset px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-orange-500/50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] uppercase text-zinc-500 font-bold">{t.contact.emailLabel}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@domain.com"
                  disabled={isSubmitting}
                  className="chassis-inset px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-orange-500/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase text-zinc-500 font-bold">{t.contact.subjectLabel}</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={t.contact.subjectPlaceholder}
                disabled={isSubmitting}
                className="chassis-inset px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-orange-500/50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[9px] uppercase text-zinc-500 font-bold">{t.contact.messageLabel}</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.contact.messagePlaceholder}
                disabled={isSubmitting}
                className="chassis-inset px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-orange-500/50 resize-none leading-relaxed"
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              className={`hardware-key w-full py-3 px-4 rounded bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer mt-1 ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span>{t.contact.submittingButton}</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitButton}</span>
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
