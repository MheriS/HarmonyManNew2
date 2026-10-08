import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Download, Github, Linkedin, Instagram, Camera, ShieldCheck, Terminal, Radio } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Sidebar() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [cloudError, setCloudError] = useState<string | null>(null);
  const [dbState, setDbState] = useState<'connecting' | 'connected' | 'error' | 'no-db'>('connecting');

  const [isVerified, setIsVerified] = useState(() => {
    try {
      return sessionStorage.getItem('is_admin_heri_verified') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    let active = true;

    const fetchAvatar = async () => {
      try {
        const storedAvatar = localStorage.getItem('profile_avatar_heri');
        if (storedAvatar && active) {
          setAvatar(storedAvatar);
        }
      } catch (e) {
        console.warn("Storage restricted.");
      }

      if (db) {
        try {
          const docRef = doc(db, 'profile', 'avatar_data');
          const docSnap = await getDoc(docRef);
          let cloudAvatar = null;

          if (docSnap.exists() && docSnap.data().avatar) {
            cloudAvatar = docSnap.data().avatar;
          } else {
            const fallbackRef = doc(db, 'portfolio_projects', 'profile_avatar');
            const fallbackSnap = await getDoc(fallbackRef);
            if (fallbackSnap.exists() && fallbackSnap.data().avatar) {
              cloudAvatar = fallbackSnap.data().avatar;
            }
          }

          if (cloudAvatar && active) {
            setAvatar(cloudAvatar);
            try {
              localStorage.setItem('profile_avatar_heri', cloudAvatar);
            } catch (e) { }
          }
          setDbState('connected');
        } catch (error: any) {
          setDbState('error');
          setCloudError(error.message || 'Izin database terbatas');
        }
      } else {
        setDbState('no-db');
      }
    };

    fetchAvatar();

    return () => {
      active = false;
    };
  }, []);

  const handleImageClick = () => {
    if (isVerified) {
      fileInputRef.current?.click();
    } else {
      setShowPasscodeModal(true);
    }
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const configPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'heri21';

    if (passcode === configPasscode) {
      setIsVerified(true);
      try {
        sessionStorage.setItem('is_admin_heri_verified', 'true');
      } catch (err) { }
      setShowPasscodeModal(false);
      setPasscode('');
      setPasscodeError('');
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 100);
    } else {
      setPasscodeError('Kunci otentikasi salah.');
      setPasscode('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const image = new Image();

        image.onload = async () => {
          const canvas = document.createElement('canvas');
          const maxDim = 360;
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxDim) {
              height *= maxDim / width;
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width *= maxDim / height;
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(image, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.88);

            setAvatar(compressedBase64);
            try {
              localStorage.setItem('profile_avatar_heri', compressedBase64);
            } catch (err) { }

            if (db) {
              let success = false;
              let lastErrorMsg = "";

              try {
                const docRef = doc(db, 'profile', 'avatar_data');
                await setDoc(docRef, { avatar: compressedBase64 });
                success = true;
              } catch (err: any) {
                lastErrorMsg = err.message || "Permission restricted on 'profile'";
              }

              if (!success) {
                try {
                  const fallbackRef = doc(db, 'portfolio_projects', 'profile_avatar');
                  await setDoc(fallbackRef, { avatar: compressedBase64 });
                  success = true;
                } catch (err: any) {
                  lastErrorMsg = err.message || "Permission restricted on fallback";
                }
              }

              if (success) {
                setDbState('connected');
                setCloudError(null);
              } else {
                setDbState('error');
                setCloudError(lastErrorMsg);
              }
            }
          }
          setIsUploading(false);
        };
        image.onerror = () => {
          setIsUploading(false);
        };

        image.src = base64String;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <aside
        id="heri-profile-sidebar"
        className="chassis-box w-full lg:w-[340px] shrink-0 p-5 xl:sticky xl:top-20 flex flex-col gap-5 select-none"
      >
        {/* Screw Rivets in 4 Corners */}
        <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full border border-white/20 bg-zinc-800 flex items-center justify-center text-[7px] text-zinc-500 font-mono">+</div>
        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full border border-white/20 bg-zinc-800 flex items-center justify-center text-[7px] text-zinc-500 font-mono">+</div>
        <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full border border-white/20 bg-zinc-800 flex items-center justify-center text-[7px] text-zinc-500 font-mono">+</div>
        <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full border border-white/20 bg-zinc-800 flex items-center justify-center text-[7px] text-zinc-500 font-mono">+</div>

        {/* Header Unit Stamp */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 px-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 led-green" />
            <span className="font-bold text-zinc-300">UNIT_MHS // MOD-01</span>
          </div>
          <span className="font-mono text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
            SYS_ONLINE
          </span>
        </div>

        {/* Biometric Viewfinder Frame (Photo) */}
        <div className="w-full flex flex-col items-center">
          <div className="chassis-inset p-2.5 w-full max-w-[240px] flex flex-col items-center relative">
            {/* Viewfinder Target Crosshairs */}
            <span className="absolute top-1.5 left-1.5 font-mono text-[10px] text-zinc-600">┌</span>
            <span className="absolute top-1.5 right-1.5 font-mono text-[10px] text-zinc-600">┐</span>
            <span className="absolute bottom-1.5 left-1.5 font-mono text-[10px] text-zinc-600">└</span>
            <span className="absolute bottom-1.5 right-1.5 font-mono text-[10px] text-zinc-600">┘</span>

            <div
              onClick={handleImageClick}
              className="crt-screen w-full aspect-square rounded-md overflow-hidden relative cursor-pointer group"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 font-mono text-zinc-600 text-xs">
                  <Camera className="w-8 h-8 mb-1 text-zinc-600" />
                  <span>BIOMETRIC RAW</span>
                </div>
              )}

              {/* Upload Hover State */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 text-white font-mono text-[10px]">
                <Camera className="w-5 h-5 text-amber-400" />
                <span>GANTI FOTO</span>
              </div>

              {isUploading && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center font-mono text-[10px] text-amber-400">
                  <span className="animate-spin mb-1">⚙</span>
                  <span>SYNC CLOUD...</span>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            {/* Viewfinder Telemetry Readout */}
            <div className="w-full flex items-center justify-between text-[8px] font-mono text-zinc-500 mt-1.5 px-0.5">
              <span>CCD_360PX</span>
              <span>CALIBRATED</span>
            </div>
          </div>

          {/* Identity Information */}
          <div className="text-center w-full mt-3">
            <h2 className="text-xl font-bold tracking-tight text-white uppercase font-display">
              {PERSONAL_INFO.name}
            </h2>
            <p className="text-xs font-mono text-amber-400 font-semibold mt-0.5">
              {PERSONAL_INFO.title}
            </p>

            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-white/[0.08] bg-black/40 font-mono text-[10px] text-zinc-400">
              <MapPin className="w-3 h-3 text-orange-400" />
              <span>{PERSONAL_INFO.location} // GMT+7</span>
            </div>
          </div>
        </div>

        {/* Telemetry Meters (Stats Gauge) */}
        <div className="chassis-inset p-3 grid grid-cols-3 gap-2 text-center">
          {PERSONAL_INFO.stats.map((st, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="text-lg font-bold font-mono text-amber-400 num-tabular">
                {st.value}
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                {st.label}
              </span>
              <div className="w-full bg-zinc-800 h-1 rounded-full mt-1.5 overflow-hidden flex">
                <div className="bg-amber-400 h-full w-4/5" />
              </div>
            </div>
          ))}
        </div>

        {/* Tactile Hardware Push Switch (Download CV) */}
        <motion.a
          href={PERSONAL_INFO.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          className="hardware-key w-full py-3 px-4 rounded-lg bg-gradient-to-b from-[#2a2e3a] to-[#1a1d24] border border-white/[0.15] text-white flex items-center justify-between cursor-pointer font-mono text-xs font-bold"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 led-orange" />
            <span className="tracking-wide text-zinc-100">UNDUH DOKUMEN CV</span>
          </div>
          <Download className="w-4 h-4 text-orange-400" />
        </motion.a>

        {/* System Deployment Status Bar */}
        <div className="chassis-inset p-2 flex items-center gap-2 text-[10px] font-mono text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400/90 font-medium tracking-tight">
            STATUS: SIAP PROYEK & KONTRAK
          </span>
        </div>

        {/* Connectivity Ports (Socials) */}
        <div className="border-t border-white/[0.08] pt-3 flex flex-col gap-2">
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider px-1">
            PORT KOMUNIKASI EKSTERNAL:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <motion.a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.94 }}
              className="hardware-key p-2 rounded-lg bg-[#181a22] border border-white/[0.08] hover:border-amber-500/40 text-zinc-400 hover:text-white flex flex-col items-center gap-1 font-mono text-[9px]"
              title="LinkedIn Port"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
              <span>LINKEDIN</span>
            </motion.a>

            <motion.a
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.94 }}
              className="hardware-key p-2 rounded-lg bg-[#181a22] border border-white/[0.08] hover:border-amber-500/40 text-zinc-400 hover:text-white flex flex-col items-center gap-1 font-mono text-[9px]"
              title="GitHub Port"
            >
              <Github className="w-4 h-4 text-zinc-200" />
              <span>GITHUB</span>
            </motion.a>

            <motion.a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.94 }}
              className="hardware-key p-2 rounded-lg bg-[#181a22] border border-white/[0.08] hover:border-amber-500/40 text-zinc-400 hover:text-white flex flex-col items-center gap-1 font-mono text-[9px]"
              title="Instagram Port"
            >
              <Instagram className="w-4 h-4 text-rose-400" />
              <span>INSTAGRAM</span>
            </motion.a>
          </div>
        </div>

        {/* Cloud Error Display */}
        {dbState === 'error' && (
          <div className="chassis-inset p-2.5 font-mono text-[9px] text-rose-400 leading-normal border border-rose-900/40">
            [SYS_WARN] Izin cloud database terbatas. Foto aktif di cache lokal.
          </div>
        )}
      </aside>

      {/* Terminal Access Passcode Modal */}
      <AnimatePresence>
        {showPasscodeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm chassis-box p-6 border-amber-500/30"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                    OTENTIKASI AKSES ADMIN
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-400">
                    Masukkan passcode pemilik unit untuk mengunggah foto profil.
                  </p>
                </div>

                <form onSubmit={handleVerifyPasscode} className="w-full flex flex-col gap-3 mt-1">
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="PASSCODE"
                    autoFocus
                    className="w-full chassis-inset px-4 py-2.5 text-center text-amber-400 font-mono text-sm tracking-widest focus:outline-none focus:border-amber-500/50"
                  />

                  {passcodeError && (
                    <span className="font-mono text-[10px] text-rose-400">
                      {passcodeError}
                    </span>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasscodeModal(false);
                        setPasscode('');
                        setPasscodeError('');
                      }}
                      className="py-2 rounded bg-zinc-800 text-zinc-400 hover:text-white font-mono text-xs cursor-pointer"
                    >
                      BATAL
                    </button>
                    <button
                      type="submit"
                      className="py-2 rounded bg-amber-600 hover:bg-amber-500 text-black font-mono font-bold text-xs cursor-pointer"
                    >
                      VERIFIKASI
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}