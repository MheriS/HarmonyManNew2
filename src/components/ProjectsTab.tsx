import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { 
  ExternalLink, 
  Github, 
  Code2, 
  Sparkles, 
  Heart, 
  MessageSquare, 
  Send, 
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileImage,
  Play,
  X,
  Radio,
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react';

import { db } from '../lib/firebase';
import { 
  doc, 
  onSnapshot, 
  getDoc,
  setDoc, 
  updateDoc, 
  increment,
  arrayUnion
} from 'firebase/firestore';

interface Comment {
  id: string;
  senderName: string;
  text: string;
  createdAt: string;
  _time?: number;
}

interface ProjectInteraction {
  likes: number;
  liked: boolean;
  comments: Comment[];
}

const getDbProjectId = (pid: string) => {
  switch (pid) {
    case 'p1': return 'Rice_Doctor_AI';
    case 'p2': return 'Klasifikasi_Citra_Keris_(KNN_&_HOG)';
    case 'p3': return 'Chatbot_Asisten_Rumah_Sakit_(versi_sementara)_-_Part_1';
    case 'p4': return 'Chatbot_Asisten_Rumah_Sakit_(versi_sementara)_-_Part_2';
    case 'p5': return 'Perbaikan_Tampilan_Website_Profil_Instansi_(Joomla)';
    case 'p6': return 'Loker_Tracker';
    case 'p7': return 'PAS_Assistant';
    default: return pid;
  }
};

export default function ProjectsTab() {
  const [filter, setFilter] = useState<string>('Semua');
  const [userName, setUserName] = useState(() => localStorage.getItem('heri_portfolio_username') || '');
  const [commentDrafts, setCommentDrafts] = useState<{ [key: string]: string }>({});
  const [openCommentsProjectId, setOpenCommentsProjectId] = useState<string | null>(null);
  
  const [projectSlideIndices, setProjectSlideIndices] = useState<{ [key: string]: number }>({});
  const [playingProjectId, setPlayingProjectId] = useState<string | null>(null);

  const [likedList, setLikedList] = useState<{ [key: string]: boolean }>(() => {
    const initial: { [key: string]: boolean } = {};
    const defaultKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];
    defaultKeys.forEach(pid => {
      initial[pid] = localStorage.getItem(`liked_${pid}`) === 'true';
    });
    return initial;
  });

  const [interactions, setInteractions] = useState<{ [key: string]: ProjectInteraction }>(() => {
    const initial: { [key: string]: ProjectInteraction } = {};
    const defaultKeys = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];
    defaultKeys.forEach(pid => {
      initial[pid] = {
        likes: 0,
        liked: localStorage.getItem(`liked_${pid}`) === 'true',
        comments: []
      };
    });
    return initial;
  });

  const getEmbedData = (url: string) => {
    if (!url) return null;
    
    const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const ytMatch = url.match(ytRegex);
    if (ytMatch) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&playsinline=1`
      };
    }

    const ttRegex = /tiktok\.com\/@[^\/]+\/video\/(\d+)/;
    const ttMatch = url.match(ttRegex);
    if (ttMatch) {
      return {
        type: 'tiktok',
        embedUrl: `https://www.tiktok.com/embed/v2/${ttMatch[1]}`
      };
    }

    return null;
  };

  useEffect(() => {
    if (!db) return;

    const unsubscribes: (() => void)[] = [];
    const projectIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

    projectIds.forEach(projectId => {
      const dbProjectId = getDbProjectId(projectId);
      const projectDocRef = doc(db, 'portfolio_projects', dbProjectId);
      
      getDoc(projectDocRef).then(snapshot => {
        if (!snapshot.exists()) {
          setDoc(projectDocRef, { likes: 0, comments: [] }, { merge: true }).catch(err => {
            console.error("Error setting default likes:", err);
          });
        }
      });

      const unsubProject = onSnapshot(projectDocRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const firestoreLikes = data?.likes ?? 0;
          
          const rawComments = data?.comments || [];
          const dbComments: Comment[] = rawComments.map((item: any, i: number) => {
            const sender = item.user || item.senderName || 'Anonim';
            const txt = item.text || '';
            const idVal = item.id ? String(item.id) : `c_${i}_${Math.random().toString(36).substring(2, 6)}`;
            
            let dateStr = 'Baru saja';
            let sortTime = 0;
            
            if (item.time) {
              dateStr = String(item.time);
              if (item.id) {
                const idAsNum = Number(item.id);
                if (!isNaN(idAsNum) && idAsNum > 1000000) {
                  sortTime = idAsNum;
                }
              }
              if (sortTime === 0) {
                const parsed = Date.parse(item.time);
                if (!isNaN(parsed)) {
                  sortTime = parsed;
                }
              }
            } else if (item.createdAt) {
              let dateObj: Date | null = null;
              try {
                if (item.createdAt && typeof item.createdAt === 'object') {
                  if (item.createdAt.seconds) {
                    dateObj = new Date(item.createdAt.seconds * 1000);
                  } else if (typeof item.createdAt.toDate === 'function') {
                    dateObj = item.createdAt.toDate();
                  }
                } else if (item.createdAt) {
                  dateObj = new Date(item.createdAt);
                }
                
                if (dateObj && !isNaN(dateObj.getTime())) {
                  dateStr = dateObj.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });
                  sortTime = dateObj.getTime();
                }
              } catch (err) {
                console.error("Error formatting comment date:", err);
              }
            }

            if (sortTime === 0) {
              const idAsNum = Number(item.id);
              if (!isNaN(idAsNum)) {
                sortTime = idAsNum;
              }
            }
            
            return {
              id: idVal,
              senderName: sender,
              text: txt,
              createdAt: dateStr,
              _time: sortTime
            };
          });

          dbComments.sort((a, b) => (a._time ?? 0) - (b._time ?? 0));
          
          setInteractions(prev => {
            const current = prev[projectId] || { 
              likes: 0, 
              liked: false, 
              comments: [] 
            };
            return {
              ...prev,
              [projectId]: {
                ...current,
                likes: firestoreLikes,
                comments: dbComments
              }
            };
          });
        }
      }, (error) => {
        console.error(`Error loading interactions:`, error);
      });
      unsubscribes.push(unsubProject);
    });

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, []);

  const handleToggleLike = async (projectId: string) => {
    const likedStorageKey = `liked_${projectId}`;
    const isAlreadyLiked = likedList[projectId] || false;
    const newLikedState = !isAlreadyLiked;

    setLikedList(prev => ({
      ...prev,
      [projectId]: newLikedState
    }));

    setInteractions(prev => {
      const current = prev[projectId] || { 
        likes: 0, 
        liked: false, 
        comments: [] 
      };
      return {
        ...prev,
        [projectId]: {
          ...current,
          liked: newLikedState,
          likes: newLikedState ? current.likes + 1 : Math.max(0, current.likes - 1)
        }
      };
    });

    localStorage.setItem(likedStorageKey, newLikedState ? 'true' : 'false');

    if (db) {
      try {
        const dbProjectId = getDbProjectId(projectId);
        const projectDocRef = doc(db, 'portfolio_projects', dbProjectId);
        await updateDoc(projectDocRef, {
          likes: increment(newLikedState ? 1 : -1)
        });
      } catch (e) {
        console.error("Firestore likes update error:", e);
      }
    }
  };

  const handlePostComment = async (projectId: string, e: React.FormEvent) => {
    e.preventDefault();
    const draftText = commentDrafts[projectId] || '';
    if (!draftText.trim()) return;

    const sender = userName.trim() || 'Anonim';
    localStorage.setItem('heri_portfolio_username', sender);

    const numericId = Date.now();
    const now = new Date();
    const formattedLocalTime = now.toLocaleString('id-ID').replace(/:/g, '.');

    const optimisticComment: Comment = {
      id: String(numericId),
      senderName: sender,
      text: draftText.trim(),
      createdAt: formattedLocalTime
    };

    setInteractions(prev => {
      const current = prev[projectId] || { 
        likes: 0, 
        liked: false, 
        comments: [] 
      };
      return {
        ...prev,
        [projectId]: {
          ...current,
          comments: [...current.comments, optimisticComment]
        }
      };
    });

    setCommentDrafts(prev => ({
      ...prev,
      [projectId]: ''
    }));

    if (db) {
      try {
        const dbProjectId = getDbProjectId(projectId);
        const projectDocRef = doc(db, 'portfolio_projects', dbProjectId);
        await updateDoc(projectDocRef, {
          comments: arrayUnion({
            id: numericId,
            user: sender,
            text: draftText.trim(),
            time: formattedLocalTime,
            likes: 0
          })
        });
      } catch (err) {
        console.error("Firestore comment post error:", err);
      }
    }
  };

  const handleNextSlide = (projectId: string, imagesCount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectSlideIndices(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % imagesCount
    }));
  };

  const handlePrevSlide = (projectId: string, imagesCount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjectSlideIndices(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + imagesCount) % imagesCount
    }));
  };

  const categories = ['Semua', 'AI Project', 'AI & Web Project', 'Web Project', 'Frontend Web Project'];

  const filteredProjects = filter === 'Semua' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.type === filter);

  return (
    <div className="flex flex-col gap-6 w-full select-none">
      {/* Rack Header */}
      <div className="flex items-center justify-between px-1 font-mono text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-orange-500 rounded-sm" />
          <span className="font-bold text-white uppercase tracking-wider">RAK MODUL PRODUK & RISET</span>
        </div>
        <span className="text-[10px] text-zinc-600 font-mono">TOTAL: {PROJECTS.length} MODUL</span>
      </div>

      {/* Hardware Channel Selector (Filter Bar) */}
      <div className="chassis-box p-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="font-mono text-[9px] text-zinc-500 uppercase px-2 shrink-0">FILTER:</span>
        <div className="flex items-center gap-1.5 shrink-0">
          {categories.map((cat) => {
            const isSelected = filter === cat;
            const count = cat === 'Semua'
              ? PROJECTS.length
              : PROJECTS.filter(p => p.type === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`hardware-key px-3 py-1.5 rounded font-mono text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-[#232734] border border-orange-500/50 text-white font-bold'
                    : 'bg-[#101217] border border-white/[0.06] text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange-400 led-orange' : 'bg-zinc-700'}`} />
                <span>{cat}</span>
                <span className="text-[10px] text-zinc-500">[{count}]</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {filteredProjects.map((project, idx) => {
          const hasMultipleImages = !!(project.images && project.images.length > 0);
          const activeImageIndex = projectSlideIndices[project.id] || 0;
          const currentImg = hasMultipleImages 
            ? project.images![activeImageIndex] 
            : project.image;

          const embedData = getEmbedData(project.demo);
          const projectCode = `MOD-${String(idx + 1).padStart(2, '0')}`;

          return (
            <div
              key={project.id}
              className="chassis-box flex flex-col justify-between overflow-hidden group"
            >
              {/* Module Header Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5 bg-[#101217] font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 led-amber" />
                  <span className="text-zinc-300 font-bold">{projectCode} // {project.type}</span>
                </div>
                {project.isSuccessful && (
                  <span className="text-emerald-400 font-mono text-[9px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED</span>
                  </span>
                )}
              </div>

              {/* Media Display Deck (CRT Screen) */}
              <div className="p-3">
                <div className="crt-screen aspect-video w-full flex items-center justify-center relative select-none">
                  {playingProjectId === project.id && embedData ? (
                    <div className="absolute inset-0 w-full h-full bg-black z-30 flex flex-col justify-between">
                      <iframe
                        src={embedData.embedUrl}
                        title={`${project.title} Video Player`}
                        className="w-full h-full border-0 absolute top-0 left-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingProjectId(null);
                        }}
                        className="absolute top-2 right-2 bg-black/80 hover:bg-rose-600 text-white p-1.5 rounded border border-white/20 z-40 cursor-pointer"
                        title="Tutup Player"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : currentImg ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={currentImg}
                        alt={`${project.title} screenshot`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />

                      {/* Multi-image transport controls */}
                      {hasMultipleImages && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => handlePrevSlide(project.id, project.images!.length, e)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/80 hover:bg-amber-500 hover:text-black text-white rounded border border-white/20 cursor-pointer z-20"
                            title="Sebelumnya"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleNextSlide(project.id, project.images!.length, e)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/80 hover:bg-amber-500 hover:text-black text-white rounded border border-white/20 cursor-pointer z-20"
                            title="Selanjutnya"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <div className="absolute bottom-2 right-2 bg-black/80 border border-white/20 px-2 py-0.5 rounded font-mono text-[9px] text-zinc-300 z-20">
                            FRAME {activeImageIndex + 1}/{project.images!.length}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                      <Code2 className="w-6 h-6 text-zinc-600" />
                      <span>NO_OPTICAL_FEED</span>
                    </div>
                  )}

                  {/* Play Video Trigger Overlay */}
                  {embedData && playingProjectId !== project.id && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlayingProjectId(project.id);
                      }}
                      className="absolute inset-0 bg-black/50 hover:bg-black/70 flex flex-col items-center justify-center gap-2 transition-all z-20 cursor-pointer"
                    >
                      <div className="hardware-key p-3 rounded-full bg-orange-600 text-black flex items-center justify-center">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-white/20">
                        PUTAR DEMO VIDEO
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Module Description & Specs */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-bold text-white font-display">
                    {project.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {project.description}
                  </p>
                </div>

                {/* Tech Instruction Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/50 border border-white/[0.08] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Keys (Demo & Repos) */}
                <div className="border-t border-white/[0.08] pt-3 flex flex-col gap-2">
                  <div className="flex gap-2">
                    {embedData ? (
                      <button
                        type="button"
                        onClick={() => setPlayingProjectId(playingProjectId === project.id ? null : project.id)}
                        className="hardware-key flex-1 py-2 px-3 rounded bg-[#202430] border border-white/10 hover:border-orange-500/50 text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                        <span>{playingProjectId === project.id ? 'TUTUP PLAYER' : 'PUTAR DEMO'}</span>
                      </button>
                    ) : (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hardware-key flex-1 py-2 px-3 rounded bg-[#202430] border border-white/10 hover:border-orange-500/50 text-white font-mono text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>LIHAT DEMO WEB</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-orange-400" />
                      </a>
                    )}

                    {project.github && project.github.length > 0 && project.github[0].url !== '-' && (
                      <div className="flex items-center gap-1">
                        {project.github.map((g, gi) => (
                          <a
                            key={gi}
                            href={g.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hardware-key py-2 px-2.5 rounded bg-[#161820] border border-white/10 hover:border-amber-500/40 text-zinc-300 hover:text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                            title={`Repository ${g.label}`}
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>{g.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Telemetry Interaction Deck (Likes & Comments) */}
                {(() => {
                  const data = interactions[project.id] || { likes: 0, liked: false, comments: [] };
                  const isCommentsOpen = openCommentsProjectId === project.id;

                  return (
                    <div className="chassis-inset p-2.5 flex flex-col gap-2 font-mono text-[10px]">
                      <div className="flex items-center justify-between">
                        {/* Like Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleLike(project.id)}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors ${
                            data.liked
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${data.liked ? 'fill-current' : ''}`} />
                          <span className="num-tabular font-bold">{data.likes} SUKA</span>
                        </button>

                        {/* Comment Toggle */}
                        <button
                          type="button"
                          onClick={() => setOpenCommentsProjectId(isCommentsOpen ? null : project.id)}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors ${
                            isCommentsOpen ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>LOG: {data.comments.length}</span>
                        </button>
                      </div>

                      {/* Expandable Comments Log */}
                      <AnimatePresence>
                        {isCommentsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col gap-2 pt-2 border-t border-white/[0.06] overflow-hidden"
                          >
                            <input
                              type="text"
                              placeholder="NAMA PENGIRIM (OPSIONAL)"
                              value={userName}
                              onChange={(e) => {
                                setUserName(e.target.value);
                                localStorage.setItem('heri_portfolio_username', e.target.value);
                              }}
                              className="w-full bg-[#101217] border border-white/10 rounded px-2 py-1 text-white font-mono text-[10px]"
                            />

                            <div className="flex flex-col gap-1.5 max-h-[120px] overflow-y-auto pr-1">
                              {data.comments.length === 0 ? (
                                <p className="text-zinc-600 italic py-1 text-center font-mono">Belum ada transmisi log.</p>
                              ) : (
                                data.comments.map((c) => (
                                  <div key={c.id} className="p-1.5 rounded bg-[#101217] border border-white/5 flex flex-col gap-0.5">
                                    <div className="flex justify-between items-center text-[9px]">
                                      <span className="font-bold text-amber-400">{c.senderName}</span>
                                      <span className="text-zinc-600">{c.createdAt}</span>
                                    </div>
                                    <p className="text-zinc-300 font-sans text-[10.5px]">{c.text}</p>
                                  </div>
                                ))
                              )}
                            </div>

                            <form onSubmit={(e) => handlePostComment(project.id, e)} className="flex gap-1.5">
                              <input
                                type="text"
                                placeholder="Tulis komentar transmisi..."
                                required
                                value={commentDrafts[project.id] || ''}
                                onChange={(e) => setCommentDrafts(prev => ({ ...prev, [project.id]: e.target.value }))}
                                className="flex-1 bg-[#101217] border border-white/10 rounded px-2 py-1 text-white font-sans text-xs focus:outline-none focus:border-amber-500/50"
                              />
                              <button
                                type="submit"
                                className="hardware-key px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-black rounded font-mono font-bold text-xs cursor-pointer"
                              >
                                KIRIM
                              </button>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
