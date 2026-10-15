import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  EXPERIENCES as defaultExperiences,
  certifications as defaultCertifications,
  PUBLICATIONS as defaultPublications,
  education as defaultEducation
} from '../data';
import {
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  ChevronRight,
  ArrowUpRight,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  FileText,
  X,
  Check,
  Upload,
  Search,
  FileCheck,
  ExternalLink,
  AlertTriangle,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  Layers,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  CheckCircle2,
  Images,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Education, Certification, ExperienceItem, PublicationItem } from '../types';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { translateText, translateMultiline } from '../utils/aiTranslator';

const STORAGE_KEY_EDU = 'heri_portfolio_education_v2';
const STORAGE_KEY_WORK = 'heri_portfolio_work_v2';
const STORAGE_KEY_CERTS = 'heri_portfolio_certifications_v2';
const STORAGE_KEY_PUBS = 'heri_portfolio_pubs_v2';
const AUTH_SESSION_KEY = 'is_admin_heri_verified';

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } },
};

// Canvas image compression helper for documents & photos
const compressDocumentFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper to render achievement line with link support and bilingual English resolution
const renderAchievementContent = (pt: string | React.ReactNode, isEn: boolean = false) => {
  // If in English mode and the item refers to the JNTETI journal paper (either as React element or string)
  if (isEn) {
    const isJnteti =
      React.isValidElement(pt) ||
      (typeof pt === 'string' && (
        pt.includes('jurnal.ugm.ac.id') ||
        pt.includes('JNTETI') ||
        pt.includes('jurnal ilmiah') ||
        pt.includes('journal')
      ));

    if (isJnteti) {
      return (
        <span>
          Published scientific journal paper on 'Rice Plant Disease Classification Using Convolutional Neural Network (CNN) Based on Leaf Images' in{' '}
          <a
            href="https://jurnal.ugm.ac.id/v3/JNTETI/article/view/18791"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline hover:text-amber-300 transition-colors font-medium"
          >
            'UGM National Journal of Electrical Engineering and Information Technology (JNTETI)'
          </a>
        </span>
      );
    }
  }

  if (React.isValidElement(pt)) {
    return pt;
  }

  if (typeof pt === 'string') {
    if (pt.includes('jurnal.ugm.ac.id') || pt.includes('JNTETI')) {
      return (
        <span>
          {isEn ? (
            <>
              Published scientific journal paper on 'Rice Plant Disease Classification Using Convolutional Neural Network (CNN) Based on Leaf Images' in{' '}
              <a
                href="https://jurnal.ugm.ac.id/v3/JNTETI/article/view/18791"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline hover:text-amber-300 transition-colors font-medium"
              >
                'UGM National Journal of Electrical Engineering and Information Technology (JNTETI)'
              </a>
            </>
          ) : (
            <>
              Menerbitkan jurnal ilmiah tentang 'Klasifikasi Penyakit Padi Menggunakan Convolutional Neural Network (CNN) Berbasis Citra Daun' di{' '}
              <a
                href="https://jurnal.ugm.ac.id/v3/JNTETI/article/view/18791"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline hover:text-amber-300 transition-colors font-medium"
              >
                'Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI) UGM'
              </a>
            </>
          )}
        </span>
      );
    }

    // Markdown link regex: [text](url)
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    if (linkRegex.test(pt)) {
      const parts = [];
      let lastIndex = 0;
      let match;
      while ((match = linkRegex.exec(pt)) !== null) {
        if (match.index > lastIndex) {
          parts.push(pt.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline font-medium"
          >
            {match[1]}
          </a>
        );
        lastIndex = linkRegex.lastIndex;
      }
      if (lastIndex < pt.length) {
        parts.push(pt.substring(lastIndex));
      }
      return <span>{parts}</span>;
    }

    return <span>{pt}</span>;
  }
  return <span>{String(pt)}</span>;
};

// Normalize multiple photos array helper
const getItemPhotos = (item: { mediaUrls?: string[]; mediaUrl?: string }): string[] => {
  if (Array.isArray(item.mediaUrls) && item.mediaUrls.length > 0) {
    return item.mediaUrls.filter(Boolean);
  }
  if (item.mediaUrl) {
    return [item.mediaUrl];
  }
  return [];
};

export default function ResumeTab() {
  const { t, language } = useLanguage();

  // Active section filter (Solving Problem 1: long page scrolling)
  type SectionFilter = 'all' | 'edu' | 'work' | 'certs' | 'pubs';
  const [activeSection, setActiveSection] = useState<SectionFilter>('all');

  // Scroll Position Memory Ref (Solving: "ketika klik cancel seharusnya kembali ke posisi terakhir dipencet")
  const lastScrollY = useRef<number>(0);
  const lastTriggerElementId = useRef<string | null>(null);
  const editorPanelRef = useRef<HTMLDivElement>(null);

  // Admin authentication state (Solving Problem 2: passcode verification)
  const [isAdminVerified, setIsAdminVerified] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch (_) {
      return false;
    }
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Education state loaded from localStorage or data.tsx defaults
  const [educationList, setEducationList] = useState<Education[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EDU);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) { }
    return defaultEducation;
  });

  // Track 02: Work Experience state loaded from localStorage or data.tsx defaults
  const [workList, setWorkList] = useState<ExperienceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WORK);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) { }
    return defaultExperiences.filter(exp => exp.type === 'work');
  });

  // Certifications state loaded from localStorage or data.tsx defaults
  const [certificationsList, setCertificationsList] = useState<Certification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CERTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) { }
    return defaultCertifications;
  });

  // Publications state loaded from localStorage or data.tsx defaults
  const [publicationsList, setPublicationsList] = useState<PublicationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PUBS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) { }
    return defaultPublications;
  });

  // Search & Filter state for certifications
  const [certSearch, setCertSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Unified Active Editor Panel state (Solves auto-scroll to edit/add menu directly on the page!)
  type EditorType = 'edu' | 'work' | 'cert' | 'pub';
  const [activeEditor, setActiveEditor] = useState<{
    type: EditorType;
    mode: 'add' | 'edit';
    tab: 'info' | 'details';
    editingId?: string;
  } | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{ type: 'edu' | 'work' | 'cert' | 'pub'; id: string; name: string } | null>(null);

  // Lightbox / Multi-Photo Inspector Modal state
  const [previewGallery, setPreviewGallery] = useState<{
    title: string;
    subtitle: string;
    photos: string[];
    activeIndex: number;
    verifyUrl?: string;
  } | null>(null);

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Language tab inside active editor (ID vs EN) & AI translation state
  const [editorLangTab, setEditorLangTab] = useState<'id' | 'en'>('id');
  const [isAiTranslating, setIsAiTranslating] = useState(false);

  // Form states for Education Editor
  const [eduDegree, setEduDegree] = useState('');
  const [eduDegreeEn, setEduDegreeEn] = useState('');
  const [eduSchool, setEduSchool] = useState('');
  const [eduSchoolEn, setEduSchoolEn] = useState('');
  const [eduLocation, setEduLocation] = useState('');
  const [eduLocationEn, setEduLocationEn] = useState('');
  const [eduPeriod, setEduPeriod] = useState('');
  const [eduGpa, setEduGpa] = useState('');
  const [eduFieldOfStudy, setEduFieldOfStudy] = useState('');
  const [eduFieldOfStudyEn, setEduFieldOfStudyEn] = useState('');
  const [eduStatus, setEduStatus] = useState('completed');
  const [eduAchievementsText, setEduAchievementsText] = useState('');
  const [eduAchievementsTextEn, setEduAchievementsTextEn] = useState('');
  const [eduDescription, setEduDescription] = useState('');
  const [eduDescriptionEn, setEduDescriptionEn] = useState('');
  const [eduPhotos, setEduPhotos] = useState<string[]>([]);
  const [eduUrlInput, setEduUrlInput] = useState('');
  const [eduUploadType, setEduUploadType] = useState<'file' | 'url'>('file');

  // Form states for Work Experience Editor (Track 02)
  const [workRole, setWorkRole] = useState('');
  const [workRoleEn, setWorkRoleEn] = useState('');
  const [workCompany, setWorkCompany] = useState('');
  const [workCompanyEn, setWorkCompanyEn] = useState('');
  const [workPeriod, setWorkPeriod] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [workLocationEn, setWorkLocationEn] = useState('');
  const [workBadge, setWorkBadge] = useState('Magang');
  const [workBadgeEn, setWorkBadgeEn] = useState('Internship');
  const [workDescriptionText, setWorkDescriptionText] = useState('');
  const [workDescriptionTextEn, setWorkDescriptionTextEn] = useState('');
  const [workPhotos, setWorkPhotos] = useState<string[]>([]);
  const [workUrlInput, setWorkUrlInput] = useState('');
  const [workUploadType, setWorkUploadType] = useState<'file' | 'url'>('file');

  // Form states for Certification Editor
  const [certName, setCertName] = useState('');
  const [certNameEn, setCertNameEn] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certIssuerEn, setCertIssuerEn] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certValidUntil, setCertValidUntil] = useState('');
  const [certCredentialId, setCertCredentialId] = useState('');
  const [certVerifyUrl, setCertVerifyUrl] = useState('');
  const [certCategory, setCertCategory] = useState('');
  const [certLevel, setCertLevel] = useState('Associate');
  const [certSkillsText, setCertSkillsText] = useState('');
  const [certSkillsTextEn, setCertSkillsTextEn] = useState('');
  const [certDescription, setCertDescription] = useState('');
  const [certDescriptionEn, setCertDescriptionEn] = useState('');
  const [certPhotos, setCertPhotos] = useState<string[]>([]);
  const [certUrlInput, setCertUrlInput] = useState('');
  const [certUploadType, setCertUploadType] = useState<'file' | 'url'>('file');
  const [certNoExpiry, setCertNoExpiry] = useState(true);

  // Form states for Publication Editor
  const [pubTitle, setPubTitle] = useState('');
  const [pubTitleEn, setPubTitleEn] = useState('');
  const [pubJournal, setPubJournal] = useState('');
  const [pubJournalEn, setPubJournalEn] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [pubAuthor, setPubAuthor] = useState('');
  const [pubUrl, setPubUrl] = useState('');
  const [pubDoi, setPubDoi] = useState('');
  const [pubDescription, setPubDescription] = useState('');
  const [pubDescriptionEn, setPubDescriptionEn] = useState('');
  const [pubPhotos, setPubPhotos] = useState<string[]>([]);
  const [pubUrlInput, setPubUrlInput] = useState('');
  const [pubUploadType, setPubUploadType] = useState<'file' | 'url'>('file');

  const [isProcessingMedia, setIsProcessingMedia] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // AI Auto-Translation actions for all editors
  const handleAiTranslateEdu = async () => {
    setIsAiTranslating(true);
    try {
      const [deg, sch, loc, fos, desc, ach] = await Promise.all([
        eduDegree ? translateText(eduDegree, 'id', 'en') : Promise.resolve(''),
        eduSchool ? translateText(eduSchool, 'id', 'en') : Promise.resolve(''),
        eduLocation ? translateText(eduLocation, 'id', 'en') : Promise.resolve(''),
        eduFieldOfStudy ? translateText(eduFieldOfStudy, 'id', 'en') : Promise.resolve(''),
        eduDescription ? translateText(eduDescription, 'id', 'en') : Promise.resolve(''),
        eduAchievementsText ? translateMultiline(eduAchievementsText, 'id', 'en') : Promise.resolve('')
      ]);
      setEduDegreeEn(deg);
      setEduSchoolEn(sch);
      setEduLocationEn(loc);
      setEduFieldOfStudyEn(fos);
      setEduDescriptionEn(desc);
      setEduAchievementsTextEn(ach);
      setEditorLangTab('en');
      setToastMessage(t.resume.aiTranslateSuccess);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsAiTranslating(false);
    }
  };

  const handleAiTranslateWork = async () => {
    setIsAiTranslating(true);
    try {
      const [role, comp, badge, desc] = await Promise.all([
        workRole ? translateText(workRole, 'id', 'en') : Promise.resolve(''),
        workCompany ? translateText(workCompany, 'id', 'en') : Promise.resolve(''),
        workBadge ? translateText(workBadge, 'id', 'en') : Promise.resolve(''),
        workDescriptionText ? translateMultiline(workDescriptionText, 'id', 'en') : Promise.resolve('')
      ]);
      setWorkRoleEn(role);
      setWorkCompanyEn(comp);
      setWorkBadgeEn(badge);
      setWorkDescriptionTextEn(desc);
      setEditorLangTab('en');
      setToastMessage(t.resume.aiTranslateSuccess);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsAiTranslating(false);
    }
  };

  const handleAiTranslateCert = async () => {
    setIsAiTranslating(true);
    try {
      const [name, issuer, skills, desc] = await Promise.all([
        certName ? translateText(certName, 'id', 'en') : Promise.resolve(''),
        certIssuer ? translateText(certIssuer, 'id', 'en') : Promise.resolve(''),
        certSkillsText ? translateText(certSkillsText, 'id', 'en') : Promise.resolve(''),
        certDescription ? translateText(certDescription, 'id', 'en') : Promise.resolve('')
      ]);
      setCertNameEn(name);
      setCertIssuerEn(issuer);
      setCertSkillsTextEn(skills);
      setCertDescriptionEn(desc);
      setEditorLangTab('en');
      setToastMessage(t.resume.aiTranslateSuccess);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsAiTranslating(false);
    }
  };

  const handleAiTranslatePub = async () => {
    setIsAiTranslating(true);
    try {
      const [title, journal, desc] = await Promise.all([
        pubTitle ? translateText(pubTitle, 'id', 'en') : Promise.resolve(''),
        pubJournal ? translateText(pubJournal, 'id', 'en') : Promise.resolve(''),
        pubDescription ? translateText(pubDescription, 'id', 'en') : Promise.resolve('')
      ]);
      setPubTitleEn(title);
      setPubJournalEn(journal);
      setPubDescriptionEn(desc);
      setEditorLangTab('en');
      setToastMessage(t.resume.aiTranslateSuccess);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setIsAiTranslating(false);
    }
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Record position before opening editor
  const recordCurrentPosition = (triggerId?: string) => {
    lastScrollY.current = window.scrollY;
    lastTriggerElementId.current = triggerId || null;
  };

  // Auto-scroll directly to editor panel when opened
  const scrollToEditorPanel = () => {
    setTimeout(() => {
      if (editorPanelRef.current) {
        editorPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        const el = document.getElementById('resume-editor-panel');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Restore position when cancelling editor
  const handleCancelEditor = () => {
    setActiveEditor(null);
    setTimeout(() => {
      if (lastTriggerElementId.current) {
        const el = document.getElementById(lastTriggerElementId.current);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
      }
      window.scrollTo({ top: lastScrollY.current, behavior: 'smooth' });
    }, 60);
  };

  // Auto-scroll to target card after saving
  const scrollToTarget = (targetId: string) => {
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 120);
  };

  // Gatekeeper: requires password verification before doing protected actions
  const requireAdminAuth = (actionCallback: () => void, triggerId?: string) => {
    recordCurrentPosition(triggerId);
    if (isAdminVerified) {
      actionCallback();
    } else {
      setPendingAction(() => actionCallback);
      setPasscodeInput('');
      setPasscodeError('');
      setShowAuthModal(true);
    }
  };

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const configPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'heri21';

    if (passcodeInput === configPasscode) {
      setIsAdminVerified(true);
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch (_) { }
      setShowAuthModal(false);
      setPasscodeInput('');
      setPasscodeError('');
      setToastMessage(t.resume.authSuccessToast);

      if (pendingAction) {
        const action = pendingAction;
        setPendingAction(null);
        setTimeout(() => action(), 80);
      }
    } else {
      setPasscodeError(t.resume.authFailedToast);
      setPasscodeInput('');
    }
  };

  const handleLockAdmin = () => {
    setIsAdminVerified(false);
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch (_) { }
    setToastMessage(t.resume.adminLocked);
  };

  // Persist Education
  const saveEducationList = (newList: Education[]) => {
    setEducationList(newList);
    try {
      const serializable = newList.map(item => ({
        ...item,
        achievements: item.achievements.map(a =>
          typeof a === 'string' ? a : "Menerbitkan jurnal ilmiah tentang 'Klasifikasi Penyakit Padi Menggunakan Convolutional Neural Network (CNN) Berbasis Citra Daun' di 'JNTETI UGM'"
        )
      }));
      localStorage.setItem(STORAGE_KEY_EDU, JSON.stringify(serializable));
      if (db) {
        setDoc(doc(db, 'portfolio_projects', 'education_data'), { items: serializable, updatedAt: new Date().toISOString() }).catch(() => { });
      }
    } catch (_) { }
  };

  // Persist Work Experiences (Track 02)
  const saveWorkList = (newList: ExperienceItem[]) => {
    setWorkList(newList);
    try {
      localStorage.setItem(STORAGE_KEY_WORK, JSON.stringify(newList));
      if (db) {
        setDoc(doc(db, 'portfolio_projects', 'work_data'), { items: newList, updatedAt: new Date().toISOString() }).catch(() => { });
      }
    } catch (_) { }
  };

  // Persist Certifications
  const saveCertificationsList = (newList: Certification[]) => {
    setCertificationsList(newList);
    try {
      localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(newList));
      if (db) {
        setDoc(doc(db, 'portfolio_projects', 'certifications_data'), { items: newList, updatedAt: new Date().toISOString() }).catch(() => { });
      }
    } catch (_) { }
  };

  // Persist Publications
  const savePublicationsList = (newList: PublicationItem[]) => {
    setPublicationsList(newList);
    try {
      localStorage.setItem(STORAGE_KEY_PUBS, JSON.stringify(newList));
      if (db) {
        setDoc(doc(db, 'portfolio_projects', 'publications_data'), { items: newList, updatedAt: new Date().toISOString() }).catch(() => { });
      }
    } catch (_) { }
  };

  // Open Education Editor
  const handleOpenAddEducation = () => {
    requireAdminAuth(() => {
      setEduDegree('');
      setEduSchool('');
      setEduLocation('Malang, Indonesia');
      setEduPeriod('');
      setEduGpa('3.66/4.0');
      setEduFieldOfStudy('Teknik Informatika');
      setEduStatus('completed');
      setEduAchievementsText('');
      setEduDescription('');
      setEduPhotos([]);
      setEduUrlInput('');
      setEduUploadType('file');
      setActiveEditor({ type: 'edu', mode: 'add', tab: 'info' });
      scrollToEditorPanel();
    }, 'btn-add-edu');
  };

  const handleOpenEditEducation = (item: Education) => {
    const cardId = `card-edu-${item.id || 'default'}`;
    requireAdminAuth(() => {
      setEduDegree(item.degree);
      setEduSchool(item.school);
      setEduLocation(item.location || '');
      setEduPeriod(item.period || '');
      setEduGpa(item.gpa || '');
      setEduFieldOfStudy(item.fieldOfStudy || '');
      setEduStatus(item.status || 'completed');
      setEduDescription(item.description || '');

      const textLines = item.achievements.map(a =>
        typeof a === 'string' ? a : "Menerbitkan jurnal ilmiah tentang 'Klasifikasi Penyakit Padi Menggunakan Convolutional Neural Network (CNN) Berbasis Citra Daun' di 'JNTETI UGM'"
      ).join('\n');
      setEduAchievementsText(textLines);

      setEduPhotos(getItemPhotos(item));
      setEduUrlInput('');
      setEduUploadType('file');
      setActiveEditor({ type: 'edu', mode: 'edit', tab: 'info', editingId: item.id });
      scrollToEditorPanel();
    }, cardId);
  };

  // Save Education Entry
  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eduDegree.trim() || !eduSchool.trim()) return;

    const achievementsArray = eduAchievementsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const targetId = activeEditor?.editingId || `edu-${Date.now()}`;
    const newEduItem: Education = {
      id: targetId,
      degree: eduDegree.trim(),
      school: eduSchool.trim(),
      location: eduLocation.trim(),
      period: eduPeriod.trim(),
      gpa: eduGpa.trim(),
      fieldOfStudy: eduFieldOfStudy.trim(),
      status: eduStatus,
      description: eduDescription.trim(),
      achievements: achievementsArray.length > 0 ? achievementsArray : [eduDegree.trim()],
      mediaUrl: eduPhotos[0] || undefined,
      mediaUrls: eduPhotos,
      mediaType: eduPhotos.length > 0 ? 'image' : undefined,
    };

    if (activeEditor?.mode === 'edit') {
      const updated = educationList.map(item => (item.id === activeEditor.editingId ? newEduItem : item));
      saveEducationList(updated);
      setToastMessage(t.resume.toastUpdated);
    } else {
      const updated = [newEduItem, ...educationList];
      saveEducationList(updated);
      setToastMessage(t.resume.toastAdded);
    }

    setActiveEditor(null);
    scrollToTarget(`card-edu-${targetId}`);
  };

  // Open Work Experience Editor (Track 02)
  const handleOpenAddWork = () => {
    requireAdminAuth(() => {
      setWorkRole('');
      setWorkCompany('');
      setWorkPeriod('');
      setWorkLocation('');
      setWorkBadge('Magang');
      setWorkDescriptionText('');
      setWorkPhotos([]);
      setWorkUrlInput('');
      setWorkUploadType('file');
      setActiveEditor({ type: 'work', mode: 'add', tab: 'info' });
      scrollToEditorPanel();
    }, 'btn-add-work');
  };

  const handleOpenEditWork = (item: ExperienceItem) => {
    const cardId = `card-work-${item.id}`;
    requireAdminAuth(() => {
      setWorkRole(item.role);
      setWorkCompany(item.company);
      setWorkPeriod(item.period);
      setWorkLocation(item.location || '');
      setWorkBadge(item.badge || 'Magang');
      setWorkDescriptionText((item.description || []).join('\n'));
      setWorkPhotos(getItemPhotos(item));
      setWorkUrlInput('');
      setWorkUploadType('file');
      setActiveEditor({ type: 'work', mode: 'edit', tab: 'info', editingId: item.id });
      scrollToEditorPanel();
    }, cardId);
  };

  // Save Work Experience Entry
  const handleSaveWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workRole.trim() || !workCompany.trim()) return;

    const descArray = workDescriptionText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const targetId = activeEditor?.editingId || `work-${Date.now()}`;
    const newWorkItem: ExperienceItem = {
      id: targetId,
      role: workRole.trim(),
      company: workCompany.trim(),
      period: workPeriod.trim(),
      location: workLocation.trim() || undefined,
      badge: workBadge.trim() || undefined,
      type: 'work',
      description: descArray.length > 0 ? descArray : [workRole.trim()],
      mediaUrl: workPhotos[0] || undefined,
      mediaUrls: workPhotos,
    };

    if (activeEditor?.mode === 'edit') {
      const updated = workList.map(item => (item.id === activeEditor.editingId ? newWorkItem : item));
      saveWorkList(updated);
      setToastMessage(t.resume.toastUpdated);
    } else {
      const updated = [newWorkItem, ...workList];
      saveWorkList(updated);
      setToastMessage(t.resume.toastAdded);
    }

    setActiveEditor(null);
    scrollToTarget(`card-work-${targetId}`);
  };

  // Open Certification Editor
  const handleOpenAddCertification = () => {
    requireAdminAuth(() => {
      setCertName('');
      setCertIssuer('');
      setCertDate('');
      setCertValidUntil(t.resume.noExpiration);
      setCertNoExpiry(true);
      setCertCredentialId('');
      setCertVerifyUrl('https://digitalent.komdigi.go.id/cek-sertifikat#');
      setCertCategory('Artificial Intelligence');
      setCertLevel('Associate');
      setCertSkillsText('');
      setCertDescription('');
      setCertPhotos([]);
      setCertUrlInput('');
      setCertUploadType('file');
      setActiveEditor({ type: 'cert', mode: 'add', tab: 'info' });
      scrollToEditorPanel();
    }, 'btn-add-cert');
  };

  const handleOpenEditCertification = (item: Certification) => {
    const cardId = `card-cert-${item.id || item.credentialId}`;
    requireAdminAuth(() => {
      setCertName(item.name);
      setCertIssuer(item.issuer);
      setCertDate(item.date);
      setCertValidUntil(item.validUntil);
      setCertNoExpiry(item.validUntil.toLowerCase().includes('tidak') || item.validUntil.toLowerCase().includes('not'));
      setCertCredentialId(item.credentialId || '');
      setCertVerifyUrl(item.verifyUrl || '');
      setCertCategory(item.category || 'Artificial Intelligence');
      setCertLevel(item.level || 'Associate');
      setCertSkillsText((item.skills || []).join(', '));
      setCertDescription(item.description || '');
      setCertPhotos(getItemPhotos(item));
      setCertUrlInput('');
      setCertUploadType('file');
      setActiveEditor({ type: 'cert', mode: 'edit', tab: 'info', editingId: item.id });
      scrollToEditorPanel();
    }, cardId);
  };

  // Save Certification Entry
  const handleSaveCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certName.trim() || !certIssuer.trim()) return;

    const skillsArray = certSkillsText
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const targetId = activeEditor?.editingId || `cert-${Date.now()}`;
    const newCertItem: Certification = {
      id: targetId,
      name: certName.trim(),
      issuer: certIssuer.trim(),
      date: certDate.trim() || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      validUntil: certNoExpiry ? t.resume.noExpiration : certValidUntil.trim(),
      credentialId: certCredentialId.trim(),
      status: 'active',
      level: certLevel.trim(),
      category: certCategory.trim(),
      logo: '-',
      skills: skillsArray,
      verifyUrl: certVerifyUrl.trim(),
      description: certDescription.trim() || undefined,
      mediaUrl: certPhotos[0] || undefined,
      mediaUrls: certPhotos,
      mediaType: certPhotos.length > 0 ? 'image' : undefined,
    };

    if (activeEditor?.mode === 'edit') {
      const updated = certificationsList.map(item => (item.id === activeEditor.editingId ? newCertItem : item));
      saveCertificationsList(updated);
      setToastMessage(t.resume.toastUpdated);
    } else {
      const updated = [newCertItem, ...certificationsList];
      saveCertificationsList(updated);
      setToastMessage(t.resume.toastAdded);
    }

    setActiveEditor(null);
    scrollToTarget(`card-cert-${targetId}`);
  };

  // Open Publication Editor
  const handleOpenAddPublication = () => {
    requireAdminAuth(() => {
      setPubTitle('');
      setPubJournal('');
      setPubYear(new Date().getFullYear().toString());
      setPubAuthor('Moh. Heri Susanto');
      setPubUrl('');
      setPubDoi('');
      setPubPhotos([]);
      setPubUrlInput('');
      setPubUploadType('file');
      setActiveEditor({ type: 'pub', mode: 'add', tab: 'info' });
      scrollToEditorPanel();
    }, 'btn-add-pub');
  };

  const handleOpenEditPublication = (item: PublicationItem) => {
    const cardId = `card-pub-${item.id}`;
    requireAdminAuth(() => {
      setPubTitle(item.title);
      setPubJournal(item.journal);
      setPubYear(item.year);
      setPubAuthor(item.author);
      setPubUrl(item.url || '');
      setPubDoi(item.doi || '');
      setPubPhotos(getItemPhotos(item));
      setPubUrlInput('');
      setPubUploadType('file');
      setActiveEditor({ type: 'pub', mode: 'edit', tab: 'info', editingId: item.id });
      scrollToEditorPanel();
    }, cardId);
  };

  // Save Publication Entry
  const handleSavePublication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubTitle.trim() || !pubJournal.trim()) return;

    const targetId = activeEditor?.editingId || `pub-${Date.now()}`;
    const newPubItem: PublicationItem = {
      id: targetId,
      title: pubTitle.trim(),
      journal: pubJournal.trim(),
      year: pubYear.trim(),
      author: pubAuthor.trim() || 'Moh. Heri Susanto',
      url: pubUrl.trim() || undefined,
      doi: pubDoi.trim() || undefined,
      mediaUrl: pubPhotos[0] || undefined,
      mediaUrls: pubPhotos,
    };

    if (activeEditor?.mode === 'edit') {
      const updated = publicationsList.map(item => (item.id === activeEditor.editingId ? newPubItem : item));
      savePublicationsList(updated);
      setToastMessage(t.resume.toastUpdated);
    } else {
      const updated = [newPubItem, ...publicationsList];
      savePublicationsList(updated);
      setToastMessage(t.resume.toastAdded);
    }

    setActiveEditor(null);
    scrollToTarget(`card-pub-${targetId}`);
  };

  // Prompt delete with auth gate & position recording
  const handlePromptDelete = (target: { type: 'edu' | 'work' | 'cert' | 'pub'; id: string; name: string }) => {
    requireAdminAuth(() => {
      setDeleteTarget(target);
    }, `card-${target.type}-${target.id}`);
  };

  // Execute delete handler
  const handleExecuteDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'edu') {
      const updated = educationList.filter(item => item.id !== deleteTarget.id);
      saveEducationList(updated);
      setToastMessage(t.resume.toastDeleted);
    } else if (deleteTarget.type === 'work') {
      const updated = workList.filter(item => item.id !== deleteTarget.id);
      saveWorkList(updated);
      setToastMessage(t.resume.toastDeleted);
    } else if (deleteTarget.type === 'pub') {
      const updated = publicationsList.filter(item => item.id !== deleteTarget.id);
      savePublicationsList(updated);
      setToastMessage(t.resume.toastDeleted);
    } else {
      const updated = certificationsList.filter(item => item.id !== deleteTarget.id);
      saveCertificationsList(updated);
      setToastMessage(t.resume.toastDeleted);
    }

    setDeleteTarget(null);
    handleCancelEditor();
  };

  // Prompt Reset to Factory Default with auth gate
  const handlePromptReset = () => {
    requireAdminAuth(() => {
      setShowResetConfirm(true);
    });
  };

  // Reset to Factory Default Data
  const handleResetToDefaults = () => {
    saveEducationList(defaultEducation);
    saveWorkList(defaultExperiences.filter(exp => exp.type === 'work'));
    saveCertificationsList(defaultCertifications);
    savePublicationsList(defaultPublications);
    setShowResetConfirm(false);
    setToastMessage(t.resume.toastReset);
  };

  // Multi-file upload handler
  const handleMultiFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0 || !activeEditor) return;
    setIsProcessingMedia(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          const comp = await compressDocumentFile(file);
          compressedList.push(comp);
        }
      }

      if (activeEditor.type === 'edu') {
        setEduPhotos(prev => [...prev, ...compressedList]);
      } else if (activeEditor.type === 'work') {
        setWorkPhotos(prev => [...prev, ...compressedList]);
      } else if (activeEditor.type === 'pub') {
        setPubPhotos(prev => [...prev, ...compressedList]);
      } else {
        setCertPhotos(prev => [...prev, ...compressedList]);
      }
    } catch (err) {
      console.error("Multi upload error", err);
    } finally {
      setIsProcessingMedia(false);
    }
  };

  // Add image from URL input
  const handleAddPhotoFromUrl = () => {
    if (!activeEditor) return;
    if (activeEditor.type === 'edu' && eduUrlInput.trim()) {
      setEduPhotos(prev => [...prev, eduUrlInput.trim()]);
      setEduUrlInput('');
    } else if (activeEditor.type === 'work' && workUrlInput.trim()) {
      setWorkPhotos(prev => [...prev, workUrlInput.trim()]);
      setWorkUrlInput('');
    } else if (activeEditor.type === 'pub' && pubUrlInput.trim()) {
      setPubPhotos(prev => [...prev, pubUrlInput.trim()]);
      setPubUrlInput('');
    } else if (activeEditor.type === 'cert' && certUrlInput.trim()) {
      setCertPhotos(prev => [...prev, certUrlInput.trim()]);
      setCertUrlInput('');
    }
  };

  // Remove photo by index
  const handleRemovePhoto = (index: number) => {
    if (!activeEditor) return;
    if (activeEditor.type === 'edu') {
      setEduPhotos(prev => prev.filter((_, i) => i !== index));
    } else if (activeEditor.type === 'work') {
      setWorkPhotos(prev => prev.filter((_, i) => i !== index));
    } else if (activeEditor.type === 'pub') {
      setPubPhotos(prev => prev.filter((_, i) => i !== index));
    } else {
      setCertPhotos(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Categories list for filtering
  const allCategories = ['all', ...Array.from(new Set(certificationsList.map(c => {
    const loc = t.resumeData?.certifications?.[c.id || ''];
    return loc?.category || c.category;
  }).filter(Boolean)))];

  // Filtered certifications list with bilingual support
  const filteredCertifications = certificationsList.filter(cert => {
    const loc = t.resumeData?.certifications?.[cert.id || ''];
    const certCategory = loc?.category || cert.category;
    const certName = loc?.name || cert.name;
    const certIssuer = loc?.issuer || cert.issuer;
    const certSkills = loc?.skills || cert.skills;

    const matchesCategory = selectedCategory === 'all' || certCategory === selectedCategory;
    const query = certSearch.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesQuery =
      certName.toLowerCase().includes(query) ||
      certIssuer.toLowerCase().includes(query) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(query)) ||
      (certSkills && certSkills.some(s => s.toLowerCase().includes(query)));

    return matchesCategory && matchesQuery;
  });

  return (
    <motion.div
      className="flex flex-col gap-5 w-full select-none"
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900/95 border border-amber-500/40 text-amber-300 font-mono text-xs shadow-2xl backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Plate & Security Control Bar */}
      <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-3 px-1 font-mono text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-amber-500 rounded-sm" />
          <span className="font-bold text-white uppercase tracking-wider">{t.resume.header}</span>
        </div>

        {/* Security & Action controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Security Status Badge */}
          {isAdminVerified ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
              <Unlock className="w-3 h-3 text-emerald-400" />
              <span className="font-bold">{t.resume.adminUnlocked}</span>
              <button
                onClick={handleLockAdmin}
                className="ml-1 text-[9px] underline text-zinc-400 hover:text-white"
                title={t.resume.adminLockBtn}
              >
                [{t.resume.adminLockBtn}]
              </button>
            </div>
          ) : (
            <button
              onClick={() => requireAdminAuth(() => { })}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/80 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-zinc-400 hover:text-amber-400 text-[10px] font-mono transition-all"
              title={t.resume.adminUnlockBtn}
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>{t.resume.adminLocked}</span>
            </button>
          )}

          {/* Reset button */}
          <button
            onClick={handlePromptReset}
            title={t.resume.resetDefaultBtn}
            className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-amber-400 px-2 py-1 rounded bg-white/[0.03] hover:bg-amber-500/10 border border-white/5 hover:border-amber-500/30 transition-all font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">{t.resume.resetDefaultBtn}</span>
          </button>
        </div>
      </motion.div>

      {/* QUICK SECTION SELECTOR (Solves Problem 1: Cuts vertical length & scrolling completely) */}
      <motion.div variants={fadeUp} className="chassis-inset p-1.5 flex items-center gap-1 overflow-x-auto custom-scrollbar font-mono text-[11px]">
        <button
          onClick={() => setActiveSection('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all uppercase font-bold ${activeSection === 'all'
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-300'
            }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t.resume.sectionAll}</span>
        </button>

        <button
          onClick={() => setActiveSection('edu')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all uppercase font-bold ${activeSection === 'edu'
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-300'
            }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{t.resume.sectionEdu} ({educationList.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('work')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all uppercase font-bold ${activeSection === 'work'
            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-300'
            }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>{t.resume.sectionWork} ({workList.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('certs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all uppercase font-bold ${activeSection === 'certs'
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-300'
            }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{t.resume.sectionCerts} ({certificationsList.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('pubs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all uppercase font-bold ${activeSection === 'pubs'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
            : 'text-zinc-500 hover:text-zinc-300'
            }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.resume.sectionPubs} ({publicationsList.length})</span>
        </button>
      </motion.div>

      {/* ========================================================================= */}
      {/* INLINE CONFIGURATION TERMINAL / EDITOR (Solves Auto-Scroll Directly!)     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeEditor && (
          <motion.div
            id="resume-editor-panel"
            ref={editorPanelRef}
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2 }}
            className="chassis-box p-4 sm:p-5 flex flex-col gap-4 border-2 border-amber-500 shadow-2xl relative scroll-mt-24 ring-4 ring-amber-500/20 bg-zinc-950/95"
          >
            {/* Header Plate */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>
                  SYS_REG // {activeEditor.mode === 'add' ? 'ADD NEW' : 'EDIT'} {activeEditor.type.toUpperCase()} ENTRY
                </span>
              </div>
              <button
                type="button"
                onClick={handleCancelEditor}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title={t.resume.cancel}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-Tabs */}
            <div className="flex items-center border-b border-white/10 bg-black/40 px-2 pt-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveEditor(prev => prev ? ({ ...prev, tab: 'info' }) : null)}
                className={`px-4 py-2 border-b-2 font-bold transition-all ${activeEditor.tab === 'info'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
              >
                {t.resume.tabBasicInfo}
              </button>
              <button
                type="button"
                onClick={() => setActiveEditor(prev => prev ? ({ ...prev, tab: 'details' }) : null)}
                className={`px-4 py-2 border-b-2 font-bold transition-all ${activeEditor.tab === 'details'
                  ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
                  }`}
              >
                {t.resume.tabDetailsMedia}
              </button>
            </div>

            {/* Form Renderer for Active Type */}
            {activeEditor.type === 'edu' && (
              <form onSubmit={handleSaveEducation} className="flex flex-col gap-3">
                {activeEditor.tab === 'info' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.degreeLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S1 - Teknik Informatika"
                        value={eduDegree}
                        onChange={(e) => setEduDegree(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.schoolLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. UIN Maulana Malik Ibrahim Malang"
                        value={eduSchool}
                        onChange={(e) => setEduSchool(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.fieldOfStudy}</label>
                      <input
                        type="text"
                        placeholder="Teknik Informatika"
                        value={eduFieldOfStudy}
                        onChange={(e) => setEduFieldOfStudy(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.periodLabel}</label>
                      <input
                        type="text"
                        placeholder="2020 - 2025"
                        value={eduPeriod}
                        onChange={(e) => setEduPeriod(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.gpaFormLabel}</label>
                      <input
                        type="text"
                        placeholder="3.66/4.0"
                        value={eduGpa}
                        onChange={(e) => setEduGpa(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.locationLabel}</label>
                      <input
                        type="text"
                        placeholder="Malang, Indonesia"
                        value={eduLocation}
                        onChange={(e) => setEduLocation(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.achievementsLabel}</label>
                      <textarea
                        rows={3}
                        placeholder={"Lulus dengan predikat Cum Laude\nMenerbitkan publikasi jurnal ilmiah..."}
                        value={eduAchievementsText}
                        onChange={(e) => setEduAchievementsText(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    {/* Multi-Photo Bay */}
                    <div className="chassis-inset p-3 flex flex-col gap-2 font-mono text-xs border border-white/10">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5" />
                        {t.resume.mediaSourceLabel} ({eduPhotos.length})
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleMultiFileUpload(e.target.files)}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{t.resume.multiPhotoNotice}</span>
                        </button>
                      </div>
                      {eduPhotos.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1 max-h-24 overflow-y-auto custom-scrollbar">
                          {eduPhotos.map((img, i) => (
                            <div key={i} className="relative rounded border border-white/20 overflow-hidden aspect-square bg-zinc-950">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(i)}
                                className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/80 text-red-400 hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handleCancelEditor}
                    className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {t.resume.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.resume.saveEntry}</span>
                  </button>
                </div>
              </form>
            )}

            {activeEditor.type === 'work' && (
              <form onSubmit={handleSaveWork} className="flex flex-col gap-3">
                {activeEditor.tab === 'info' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.roleLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IT Specialist / AI Engineer"
                        value={workRole}
                        onChange={(e) => setWorkRole(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-orange-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.companyLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. PT. Arion Indonesia"
                        value={workCompany}
                        onChange={(e) => setWorkCompany(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-orange-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.periodLabel}</label>
                      <input
                        type="text"
                        placeholder="Jun 2023 – Agu 2023"
                        value={workPeriod}
                        onChange={(e) => setWorkPeriod(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-orange-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.badgeLabel}</label>
                      <input
                        type="text"
                        placeholder="Magang / Full-Time"
                        value={workBadge}
                        onChange={(e) => setWorkBadge(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-orange-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.responsibilitiesLabel}</label>
                      <textarea
                        rows={3}
                        placeholder={"Mengembangkan fitur web...\nTroubleshooting sistem..."}
                        value={workDescriptionText}
                        onChange={(e) => setWorkDescriptionText(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-orange-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    {/* Multi-Photo Bay */}
                    <div className="chassis-inset p-3 flex flex-col gap-2 font-mono text-xs border border-white/10">
                      <span className="text-orange-400 font-bold flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5" />
                        {t.resume.mediaSourceLabel} ({workPhotos.length})
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleMultiFileUpload(e.target.files)}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40 text-[10px] font-bold flex items-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{t.resume.multiPhotoNotice}</span>
                        </button>
                      </div>
                      {workPhotos.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1 max-h-24 overflow-y-auto custom-scrollbar">
                          {workPhotos.map((img, i) => (
                            <div key={i} className="relative rounded border border-white/20 overflow-hidden aspect-square bg-zinc-950">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(i)}
                                className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/80 text-red-400 hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handleCancelEditor}
                    className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {t.resume.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-orange-500 hover:bg-orange-400 text-black font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.resume.saveEntry}</span>
                  </button>
                </div>
              </form>
            )}

            {activeEditor.type === 'cert' && (
              <form onSubmit={handleSaveCertification} className="flex flex-col gap-3">
                {activeEditor.tab === 'info' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.certNameLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. AI Engineer For Milenial"
                        value={certName}
                        onChange={(e) => setCertName(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.issuerLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DTS Kominfo & ElevAlte"
                        value={certIssuer}
                        onChange={(e) => setCertIssuer(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.categoryLabel}</label>
                      <input
                        type="text"
                        placeholder="Artificial Intelligence / Machine Learning"
                        value={certCategory}
                        onChange={(e) => setCertCategory(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.levelLabel}</label>
                      <select
                        value={certLevel}
                        onChange={(e) => setCertLevel(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      >
                        <option value="Associate">Associate</option>
                        <option value="Professional">Professional</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1 font-mono text-xs">
                        <label className="text-zinc-400 font-bold">{t.resume.credentialIdLabel}</label>
                        <input
                          type="text"
                          placeholder="e.g. 22910029850..."
                          value={certCredentialId}
                          onChange={(e) => setCertCredentialId(e.target.value)}
                          className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1 font-mono text-xs">
                        <label className="text-zinc-400 font-bold">{t.resume.verifyUrlLabel}</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={certVerifyUrl}
                          onChange={(e) => setCertVerifyUrl(e.target.value)}
                          className="bg-black/60 border border-white/10 focus:border-amber-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                        />
                      </div>
                    </div>
                    {/* Multi-Photo Bay */}
                    <div className="chassis-inset p-3 flex flex-col gap-2 font-mono text-xs border border-white/10">
                      <span className="text-amber-400 font-bold flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5" />
                        {t.resume.mediaSourceLabel} ({certPhotos.length})
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleMultiFileUpload(e.target.files)}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold flex items-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{t.resume.multiPhotoNotice}</span>
                        </button>
                      </div>
                      {certPhotos.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1 max-h-24 overflow-y-auto custom-scrollbar">
                          {certPhotos.map((img, i) => (
                            <div key={i} className="relative rounded border border-white/20 overflow-hidden aspect-square bg-zinc-950">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(i)}
                                className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/80 text-red-400 hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handleCancelEditor}
                    className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {t.resume.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.resume.saveEntry}</span>
                  </button>
                </div>
              </form>
            )}

            {activeEditor.type === 'pub' && (
              <form onSubmit={handleSavePublication} className="flex flex-col gap-3">
                {activeEditor.tab === 'info' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 font-mono text-xs sm:col-span-2">
                      <label className="text-zinc-400 font-bold">{t.resume.pubTitleLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="Klasifikasi Penyakit Padi Menggunakan CNN..."
                        value={pubTitle}
                        onChange={(e) => setPubTitle(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-cyan-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.journalLabel} *</label>
                      <input
                        type="text"
                        required
                        placeholder="Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI) UGM"
                        value={pubJournal}
                        onChange={(e) => setPubJournal(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-cyan-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.pubYearLabel}</label>
                      <input
                        type="text"
                        placeholder="2024"
                        value={pubYear}
                        onChange={(e) => setPubYear(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-cyan-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.authorLabel}</label>
                      <input
                        type="text"
                        placeholder="Moh. Heri Susanto"
                        value={pubAuthor}
                        onChange={(e) => setPubAuthor(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-cyan-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.pubUrlLabel}</label>
                      <input
                        type="url"
                        placeholder="https://jurnal.ugm.ac.id/..."
                        value={pubUrl}
                        onChange={(e) => setPubUrl(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-cyan-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 font-mono text-xs">
                      <label className="text-zinc-400 font-bold">{t.resume.doiLabel}</label>
                      <input
                        type="text"
                        placeholder="10.22146/jnteti..."
                        value={pubDoi}
                        onChange={(e) => setPubDoi(e.target.value)}
                        className="bg-black/60 border border-white/10 focus:border-cyan-500 rounded px-2.5 py-1.5 text-xs font-mono text-white outline-none"
                      />
                    </div>
                    {/* Multi-Photo Bay for Publication */}
                    <div className="chassis-inset p-3 flex flex-col gap-2 font-mono text-xs border border-white/10">
                      <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5" />
                        {t.resume.mediaSourceLabel} ({pubPhotos.length})
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          ref={fileInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleMultiFileUpload(e.target.files)}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold flex items-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{t.resume.multiPhotoNotice}</span>
                        </button>
                      </div>
                      {pubPhotos.length > 0 && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1 max-h-24 overflow-y-auto custom-scrollbar">
                          {pubPhotos.map((img, i) => (
                            <div key={i} className="relative rounded border border-white/20 overflow-hidden aspect-square bg-zinc-950">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(i)}
                                className="absolute top-0.5 right-0.5 p-0.5 rounded bg-black/80 text-red-400 hover:text-white"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 font-mono text-xs">
                  <button
                    type="button"
                    onClick={handleCancelEditor}
                    className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {t.resume.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.resume.saveEntry}</span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dual Bus Timelines (Track 01 Education & Track 02 Work) */}
      {(activeSection === 'all' || activeSection === 'edu' || activeSection === 'work') && (
        <motion.div variants={fadeUp} className={`grid gap-5 w-full ${activeSection === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>

          {/* TRACK 01: Academic Qualification */}
          {(activeSection === 'all' || activeSection === 'edu') && (
            <div className="chassis-box p-5 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-zinc-200 font-bold">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>{t.resume.educationTrack}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600">{t.resume.educationLevel}</span>
                  <motion.button
                    id="btn-add-edu"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenAddEducation}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold transition-all shadow-sm"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{t.resume.addEduBtn}</span>
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col gap-5 pl-2 border-l border-white/10 relative">
                {educationList.map((item, idx) => {
                  const cardId = `card-edu-${item.id || idx}`;
                  const photos = getItemPhotos(item);

                  // Localized content resolution (Solves bilingual English logbook)
                  // const loc = t.resumeData?.education?.[item.id || ''];
                  const educationTranslationKey =
                    item.id === 'edu-uin-malang-s1' ||
                      item.degree === 'S1 - Teknik Informatika'
                      ? 'edu-uin-malang-s1'
                      : item.id || '';

                  const loc = t.resumeData?.education?.[educationTranslationKey];
                  const degree = loc?.degree || item.degree;
                  const school = loc?.school || item.school;
                  const location = loc?.location || item.location;
                  const achievements = loc?.achievements || item.achievements;

                  return (
                    <div id={cardId} key={item.id || idx} className="relative pl-5 flex flex-col gap-1.5 group scroll-mt-24">
                      {/* Node pin */}
                      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-amber-400 led-amber led-pulse-slow led-pulse-delay-1" />

                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-amber-400 font-bold">
                          {t.resume.period} {item.period}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {item.gpa && (
                            <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                              {t.resume.gpaLabel} {item.gpa}
                            </span>
                          )}
                          {/* Action buttons (Edit & Delete) with auth gates */}
                          <div className="flex items-center gap-1 ml-1">
                            <button
                              onClick={() => handleOpenEditEducation(item)}
                              className="p-1 text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 rounded border border-transparent hover:border-amber-500/30 transition-all"
                              title={t.resume.editEduBtn}
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handlePromptDelete({ type: 'edu', id: item.id || `edu-${idx}`, name: degree })}
                              className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded border border-transparent hover:border-red-500/30 transition-all"
                              title={t.resume.deleteEduBtn}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white font-display">
                          {degree}
                        </h4>
                        {item.fieldOfStudy && (
                          <span className="text-[11px] font-mono text-amber-400/80">
                            {item.fieldOfStudy}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-zinc-400 font-mono">
                        {school} <span className="text-zinc-600">[{location}]</span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-zinc-400/90 font-sans leading-relaxed pt-0.5">
                          {item.description}
                        </p>
                      )}

                      {achievements && achievements.length > 0 && (
                        <ul className="flex flex-col gap-1 pt-1">
                          {achievements.map((pt, i) => (
                            <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5 font-sans leading-relaxed">
                              <ChevronRight className="w-3.5 h-3.5 text-amber-400/60 shrink-0 mt-0.5" />
                              <span>{renderAchievementContent(pt)}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Supporting Multiple Photos / Document Badge */}
                      {photos.length > 0 ? (
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => setPreviewGallery({
                              title: degree,
                              subtitle: `${school} (${item.period})`,
                              photos: photos,
                              activeIndex: 0
                            })}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] transition-all"
                          >
                            <Images className="w-3.5 h-3.5 text-amber-400" />
                            <span>{t.resume.viewPhotos} ({photos.length})</span>
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <button
                            onClick={() => handleOpenEditEducation(item)}
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
                          >
                            <Upload className="w-2.5 h-2.5" />
                            <span>+ {t.resume.mediaSourceLabel}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TRACK 02: Industrial Engineering Experience */}
          {(activeSection === 'all' || activeSection === 'work') && (
            <div className="chassis-box p-5 flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-2.5 font-mono text-[10px]">
                <div className="flex items-center gap-2 text-zinc-200 font-bold">
                  <Briefcase className="w-4 h-4 text-orange-400" />
                  <span>{t.resume.workTrack}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-600">{t.resume.workLevel}</span>
                  <motion.button
                    id="btn-add-work"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenAddWork}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/40 text-[10px] font-bold transition-all shadow-sm"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{t.resume.addWorkBtn}</span>
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col gap-5 pl-2 border-l border-white/10 relative">
                {workList.map((item) => {
                  const cardId = `card-work-${item.id}`;
                  const photos = getItemPhotos(item);

                  // Localized content resolution (Solves bilingual English logbook)
                  const loc = t.resumeData?.experiences?.[item.id];
                  const role = loc?.role || item.role;
                  const company = loc?.company || item.company;
                  const badge = loc?.badge || item.badge;
                  const description = loc?.description || item.description;

                  return (
                    <div id={cardId} key={item.id} className="relative pl-5 flex flex-col gap-1.5 group scroll-mt-24">
                      {/* Node pin */}
                      <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-orange-400 led-orange led-pulse-slow led-pulse-delay-2" />

                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] text-orange-400 font-bold">
                          {t.resume.period} {item.period}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {badge && (
                            <span className="font-mono text-[9px] text-zinc-300 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                              {badge}
                            </span>
                          )}
                          {/* Action buttons (Edit & Delete for Track 02) */}
                          <div className="flex items-center gap-1 ml-1">
                            <button
                              onClick={() => handleOpenEditWork(item)}
                              className="p-1 text-zinc-500 hover:text-orange-400 hover:bg-orange-500/10 rounded border border-transparent hover:border-orange-500/30 transition-all"
                              title={t.resume.editWorkBtn}
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handlePromptDelete({ type: 'work', id: item.id, name: role })}
                              className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded border border-transparent hover:border-red-500/30 transition-all"
                              title={t.resume.deleteWorkBtn}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white font-display">
                        {role}
                      </h4>

                      <div className="text-xs text-zinc-400 font-mono">
                        {company} {item.location && <span className="text-zinc-600">[{item.location}]</span>}
                      </div>

                      <ul className="flex flex-col gap-1 pt-1">
                        {description.map((pt, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5 font-sans leading-relaxed">
                            <ChevronRight className="w-3.5 h-3.5 text-orange-400/60 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Supporting Multiple Photos / Documentation Badge */}
                      {photos.length > 0 ? (
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => setPreviewGallery({
                              title: role,
                              subtitle: `${company} (${item.period})`,
                              photos: photos,
                              activeIndex: 0
                            })}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-300 font-mono text-[10px] transition-all"
                          >
                            <Images className="w-3.5 h-3.5 text-orange-400" />
                            <span>{t.resume.viewPhotos} ({photos.length})</span>
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1">
                          <button
                            onClick={() => handleOpenEditWork(item)}
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
                          >
                            <Upload className="w-2.5 h-2.5" />
                            <span>+ {t.resume.mediaSourceLabel}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Certifications and Research Publications Registry */}
      {(activeSection === 'all' || activeSection === 'certs' || activeSection === 'pubs') && (
        <motion.div variants={fadeUp} className={`grid gap-5 w-full ${activeSection === 'all' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Certifications & Qualifications Registry */}
          {(activeSection === 'all' || activeSection === 'certs') && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-white uppercase tracking-wider">{t.resume.certHeader}</span>
                </div>
                <motion.button
                  id="btn-add-cert"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenAddCertification}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold transition-all shadow-sm"
                >
                  <Plus className="w-3 h-3" />
                  <span>{t.resume.addCertBtn}</span>
                </motion.button>
              </div>

              {/* Search & Filter Bar */}
              <div className="chassis-inset p-2.5 flex flex-col gap-2">
                <div className="relative w-full">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    placeholder={t.resume.searchCertPlaceholder}
                    className="w-full pl-8 pr-3 py-1.5 bg-black/40 border border-white/5 focus:border-amber-500/40 rounded text-xs font-mono text-white placeholder-zinc-600 outline-none transition-all"
                  />
                  {certSearch && (
                    <button
                      onClick={() => setCertSearch('')}
                      className="absolute right-2.5 top-2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Category filter pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 custom-scrollbar font-mono text-[9px]">
                  {allCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded whitespace-nowrap transition-all uppercase ${selectedCategory === cat
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                        : 'bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 border border-white/5'
                        }`}
                    >
                      {cat === 'all' ? t.resume.filterCategoryAll : cat}
                    </button>
                  ))}
                </div>
              </div>

              <motion.div
                className="flex flex-col gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                {filteredCertifications.length === 0 ? (
                  <div className="chassis-box p-6 text-center text-xs font-mono text-zinc-500">
                    {t.resume.searchCertPlaceholder} (0)
                  </div>
                ) : (
                  filteredCertifications.map((cert, index) => {
                    const cardId = `card-cert-${cert.id || index}`;
                    const photos = getItemPhotos(cert);

                    // Localized content resolution (Solves bilingual English logbook)
                    const loc = t.resumeData?.certifications?.[cert.id || ''];
                    const name = loc?.name || cert.name;
                    const issuer = loc?.issuer || cert.issuer;
                    const validUntil = loc?.validUntil || cert.validUntil;
                    const skills = loc?.skills || cert.skills;

                    return (
                      <motion.div id={cardId} key={cert.id || index} variants={fadeUp} className="chassis-box p-4 flex flex-col gap-2 group scroll-mt-24">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex flex-col gap-0.5 flex-1">
                            <h5 className="text-sm font-bold text-white font-display">
                              {name}
                            </h5>
                            <span className="text-[11px] font-mono text-zinc-400">
                              {t.resume.issuer} {issuer} // {t.resume.level} {cert.level}
                            </span>
                          </div>
                          {/* Action buttons (Edit & Delete) with auth gates */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleOpenEditCertification(cert)}
                              className="p-1 text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10 rounded border border-transparent hover:border-amber-500/30 transition-all"
                              title={t.resume.editCertBtn}
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handlePromptDelete({ type: 'cert', id: cert.id || `cert-${index}`, name })}
                              className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded border border-transparent hover:border-red-500/30 transition-all"
                              title={t.resume.deleteCertBtn}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Validity specs */}
                        <div className="chassis-inset p-2 grid grid-cols-2 gap-2 font-mono text-[9px] text-zinc-400">
                          <div>{t.resume.release} {cert.date}</div>
                          <div>{t.resume.validUntil} {validUntil}</div>
                        </div>

                        {cert.description && (
                          <p className="text-xs text-zinc-400/90 font-sans leading-relaxed">
                            {cert.description}
                          </p>
                        )}

                        {/* Skills tags */}
                        {skills && skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {skills.map((sk, si) => (
                              <span key={si} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-amber-400/90">
                                {sk}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Supporting Multiple Photos / Proof */}
                        {photos.length > 0 && (
                          <div className="pt-1">
                            <button
                              onClick={() => setPreviewGallery({
                                title: name,
                                subtitle: `${issuer} (${cert.date})`,
                                photos: photos,
                                activeIndex: 0,
                                verifyUrl: cert.verifyUrl
                              })}
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] transition-all"
                            >
                              <Images className="w-3.5 h-3.5 text-amber-400" />
                              <span>{t.resume.viewPhotos} ({photos.length})</span>
                            </button>
                          </div>
                        )}

                        {/* Credential ID & Verify Link */}
                        {(cert.credentialId || (cert.verifyUrl && cert.verifyUrl !== '-')) && (
                          <div className="flex items-center justify-between border-t border-white/[0.06] pt-2 mt-1 font-mono text-[10px]">
                            {cert.credentialId ? (
                              <span className="text-zinc-500 truncate max-w-[200px]" title={cert.credentialId}>
                                ID: {cert.credentialId}
                              </span>
                            ) : <span />}
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
                    );
                  })
                )}
              </motion.div>
            </div>
          )}

          {/* Research Publications (Now with Complete Add, Edit, Delete, Multi-Photo & i18n) */}
          {(activeSection === 'all' || activeSection === 'pubs') && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white uppercase tracking-wider">{t.resume.pubHeader}</span>
                </div>
                <motion.button
                  id="btn-add-pub"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenAddPublication}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-bold transition-all shadow-sm"
                >
                  <Plus className="w-3 h-3" />
                  <span>{t.resume.addPubBtn}</span>
                </motion.button>
              </div>

              <motion.div
                className="flex flex-col gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
              >
                {publicationsList.map((pub) => {
                  const cardId = `card-pub-${pub.id}`;
                  const photos = getItemPhotos(pub);

                  // Localized content resolution (Solves bilingual English logbook)
                  const loc = t.resumeData?.publications?.[pub.id];
                  const title = loc?.title || pub.title;
                  const journal = loc?.journal || pub.journal;
                  const author = loc?.author || pub.author;

                  return (
                    <motion.div id={cardId} key={pub.id} variants={fadeUp} className="chassis-box p-4 flex flex-col gap-2.5 group scroll-mt-24">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex flex-col gap-0.5 flex-1">
                          <h5 className="text-sm font-bold text-white font-display">
                            {title}
                          </h5>
                          <span className="font-mono text-[10px] text-zinc-400">
                            {t.resume.author} {author}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-[10px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                            {pub.year}
                          </span>
                          {/* Action buttons (Edit & Delete for Publication) */}
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenEditPublication(pub)}
                              className="p-1 text-zinc-500 hover:text-cyan-400 hover:bg-cyan-500/10 rounded border border-transparent hover:border-cyan-500/30 transition-all"
                              title={t.resume.editPubBtn}
                            >
                              <Pencil className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handlePromptDelete({ type: 'pub', id: pub.id, name: title })}
                              className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded border border-transparent hover:border-red-500/30 transition-all"
                              title={t.resume.deletePubBtn}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="chassis-inset p-2 font-mono text-[9px] text-zinc-400">
                        {t.resume.published} {journal}
                      </div>

                      {/* Supporting Multiple Photos for Publication */}
                      {photos.length > 0 && (
                        <div className="pt-0.5">
                          <button
                            onClick={() => setPreviewGallery({
                              title: title,
                              subtitle: `${journal} (${pub.year})`,
                              photos: photos,
                              activeIndex: 0,
                              verifyUrl: pub.url
                            })}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] transition-all"
                          >
                            <Images className="w-3 h-3 text-cyan-400" />
                            <span>{t.resume.viewPhotos} ({photos.length})</span>
                          </button>
                        </div>
                      )}

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
                  );
                })}
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 0: ADMIN PASSCODE VERIFICATION                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="chassis-box w-full max-w-md p-5 flex flex-col gap-4 border border-amber-500/50 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>{t.resume.adminAuthRequired}</span>
                </div>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                {t.resume.adminAuthPrompt}
              </p>

              <form onSubmit={handleVerifyPasscode} className="flex flex-col gap-3 font-mono text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 font-bold">{t.resume.enterPasscode}</label>
                  <input
                    type="password"
                    autoFocus
                    required
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      setPasscodeError('');
                    }}
                    placeholder={t.modal.passcodePlaceholder}
                    className="bg-black/70 border border-white/15 focus:border-amber-500 rounded px-3 py-2 text-xs font-mono text-white outline-none tracking-widest text-center text-sm"
                  />
                  {passcodeError && (
                    <span className="text-red-400 text-[11px] font-mono mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {passcodeError}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  >
                    {t.resume.cancel}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="px-5 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.modal.verify}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 4: MULTI-PHOTO GALLERY INSPECTOR (Interactive Carousel / Lightbox)  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {previewGallery && previewGallery.photos.length > 0 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="chassis-box w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden border border-amber-500/50 shadow-2xl relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3.5 border-b border-white/10 bg-zinc-950/80 font-mono text-xs">
                <div className="flex flex-col truncate pr-2">
                  <span className="text-amber-400 font-bold flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t.resume.docPreviewTitle}</span>
                  </span>
                  <span className="text-zinc-400 text-[11px] truncate">
                    {previewGallery.title} &bull; {previewGallery.subtitle}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10">
                    {previewGallery.activeIndex + 1} {t.resume.photoOf} {previewGallery.photos.length}
                  </span>
                  <button
                    onClick={() => setPreviewGallery(null)}
                    className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Viewer Body with navigation arrows & CRT scanline */}
              <div className="p-3 sm:p-5 flex items-center justify-center overflow-hidden max-h-[66vh] bg-black/80 relative select-none">
                <div className="scanner-line pointer-events-none" />

                {/* Left Arrow */}
                {previewGallery.photos.length > 1 && (
                  <button
                    onClick={() => setPreviewGallery(prev => prev ? ({
                      ...prev,
                      activeIndex: (prev.activeIndex - 1 + prev.photos.length) % prev.photos.length
                    }) : null)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 transition-all shadow-lg"
                    title={t.resume.prevPhoto}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <img
                  src={previewGallery.photos[previewGallery.activeIndex]}
                  alt={`${previewGallery.title} - ${previewGallery.activeIndex + 1}`}
                  className="max-h-[58vh] max-w-full object-contain rounded border border-white/10 shadow-2xl transition-all"
                />

                {/* Right Arrow */}
                {previewGallery.photos.length > 1 && (
                  <button
                    onClick={() => setPreviewGallery(prev => prev ? ({
                      ...prev,
                      activeIndex: (prev.activeIndex + 1) % prev.photos.length
                    }) : null)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-amber-500 text-white hover:text-black border border-white/20 transition-all shadow-lg"
                    title={t.resume.nextPhoto}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Thumbnail Strip Carousel */}
              {previewGallery.photos.length > 1 && (
                <div className="flex items-center gap-2 p-2 bg-black/90 border-t border-white/10 overflow-x-auto custom-scrollbar justify-center">
                  {previewGallery.photos.map((ph, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPreviewGallery(prev => prev ? ({ ...prev, activeIndex: idx }) : null)}
                      className={`relative rounded overflow-hidden w-12 h-12 border-2 transition-all shrink-0 ${idx === previewGallery.activeIndex
                        ? 'border-amber-400 scale-105 shadow-md'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img src={ph} alt={`nav-thumb-${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Footer specs & actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 border-t border-white/10 bg-zinc-950/80 font-mono text-xs">
                <span className="text-zinc-500 text-[10px]">
                  ACTIVE ASSET #{previewGallery.activeIndex + 1}
                </span>

                <div className="flex items-center gap-2">
                  {previewGallery.verifyUrl && (
                    <a
                      href={previewGallery.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 transition-all"
                    >
                      <span>{t.resume.verify}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={previewGallery.photos[previewGallery.activeIndex]}
                    target="_blank"
                    rel="noreferrer"
                    download={`doc-${previewGallery.activeIndex + 1}.jpg`}
                    className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white border border-white/20 text-[11px] font-bold flex items-center gap-1 transition-all"
                  >
                    <span>{t.resume.downloadDoc}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setPreviewGallery(null)}
                    className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] transition-colors"
                  >
                    {t.resume.closeModal}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 5: DELETE CONFIRMATION                                             */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="chassis-box w-full max-w-md p-5 flex flex-col gap-4 border border-red-500/40 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-400 font-mono text-xs font-bold border-b border-white/10 pb-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{t.resume.deleteConfirmTitle}</span>
              </div>
              <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                {t.resume.deleteConfirmPrompt}
              </p>
              <div className="chassis-inset p-2.5 font-mono text-xs text-amber-400 bg-black/60 border border-white/10 truncate">
                &gt; {deleteTarget.name}
              </div>
              <div className="flex items-center justify-end gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  {t.resume.cancel}
                </button>
                <button
                  onClick={handleExecuteDelete}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t.resume.deleteConfirmBtn}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 6: RESTORE FACTORY DEFAULTS CONFIRMATION                           */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="chassis-box w-full max-w-md p-5 flex flex-col gap-4 border border-amber-500/40 shadow-2xl"
            >
              <div className="flex items-center gap-3 text-amber-400 font-mono text-xs font-bold border-b border-white/10 pb-3">
                <RotateCcw className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t.resume.resetConfirmTitle}</span>
              </div>
              <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                {t.resume.resetConfirmDesc}
              </p>
              <div className="flex items-center justify-end gap-3 pt-2 font-mono text-xs">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  {t.resume.cancel}
                </button>
                <button
                  onClick={handleResetToDefaults}
                  className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-400 text-black font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t.resume.resetDefaultBtn}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
