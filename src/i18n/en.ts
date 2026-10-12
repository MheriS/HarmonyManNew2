// English translations
import { Translations } from './id';

export const en: Translations = {
  // Navigation
  nav: {
    overview: 'OVERVIEW',
    overviewSub: 'System Summary',
    projects: 'MODULES',
    projectsSub: 'Project Collection',
    resume: 'DOSSIER',
    resumeSub: 'Qualifications & Edu',
    contact: 'COMMS',
    contactSub: 'Contact Channels',
    channel: 'CHANNEL',
  },

  // Header
  header: {
    brand: 'MHS.INSTRUMENT // ARCHITECTURE v2.6',
    brandSub: 'AI SYSTEMS & FULL-STACK ENGINE',
    status: 'SYS_ONLINE: DEPLOYMENT READY',
    homeTitle: 'Unit Home',
    waTitle: 'Direct WhatsApp',
    emailTitle: 'Direct Email',
  },

  // Language Switcher
  lang: {
    id: 'ID',
    en: 'EN',
    switchTo: 'Switch Language',
    ariaLabel: 'Pilih Bahasa / Language Selector',
  },

  // Overview Tab
  overview: {
    headerLabel: 'UNIT CONSOLE // CORE ARCHITECTURE',
    serial: 'SERIAL: MHS-2026-ENG',
    operationalLabel: 'OPERATIONAL // AI ENGINEERING & WEB SPECIALIST',
    headline: 'Intelligent Systems, Clean Architecture, and Efficient Computing.',
    modulesLabel: 'INSTALLED MODULES:',
    modules: ['VISION: CNN MANUAL', 'NLP: LSTM + FASTTEXT', 'FULLSTACK: REACT + LARAVEL/FLASK', 'STORAGE: POSTGRES & SQLITE'],
    strengthsHeader: 'ENGINEERING COMPETENCY PILLARS',
    strengthsCount: '4 COPROCESSOR UNITS',
    skillsHeader: 'TECHNOLOGY & TOOLS MATRIX',
    skillsCount: '21 VERIFIED TOOLS',
    skillsItemCount: 'ITEMS',
    categoryLabels: {
      core: 'BAY 01 // PROGRAMMING LANGUAGES & CORE',
      framework: 'BAY 02 // FRAMEWORKS & WEB RUNTIMES',
      db: 'BAY 03 // DATABASES & RELATIONAL STORAGE',
      tool: 'BAY 04 // DEVELOPMENT INSTRUMENTS & CLOUD',
    },
    unitLabel: 'UNIT_0',
  },

  // Strengths (English versions)
  strengths: {
    s1: {
      title: 'Writing Quality Code',
      description: 'Structuring code with best-practice architecture, well-documented, and prioritizing modularity for maintainability and scalability.',
    },
    s2: {
      title: 'Problem-Solving',
      description: 'Ability to analyze complex problems, systematically identify root causes, and implement accurate technical solutions.',
    },
    s3: {
      title: 'Continuous Learning',
      description: 'Always keeping up with the latest developments in AI and Web, from custom language models to the newest frontend architecture frameworks.',
    },
    s4: {
      title: 'Attention to Detail',
      description: 'Highly meticulous about application performance, system security, user experience (UX), and the smallest functional accuracy.',
    },
  },

  // Projects Tab
  projects: {
    header: 'PRODUCT & RESEARCH MODULE RACK',
    total: 'TOTAL',
    modul: 'MODULES',
    filterLabel: 'FILTER:',
    categories: ['All', 'AI Project', 'AI & Web Project', 'Web Project', 'Frontend Web Project'],
    allLabel: 'All',
    verified: 'VERIFIED',
    noFeed: 'NO_OPTICAL_FEED',
    prevFrame: 'Previous',
    nextFrame: 'Next',
    frame: 'FRAME',
    playVideo: 'PLAY DEMO VIDEO',
    likeLabel: 'LIKES',
    logLabel: 'LOG',
    commentPlaceholder: 'Write a transmission log...',
    namePlaceholder: 'SENDER NAME (OPTIONAL)',
    sendButton: 'SEND',
    noComments: 'No transmission logs yet.',
    demoButton: 'VIEW LIVE DEMO',
    playButton: 'PLAY DEMO',
    closePlayer: 'CLOSE PLAYER',
    // Project descriptions
    p1: {
      title: 'Rice Doctor AI',
      description: 'AI web application for classifying rice plant diseases. Frontend built with React + Tailwind, backend using Flask run from Jupyter Notebook, with a custom CNN model built manually without standard CNN libraries, saved in Pickle format.',
    },
    p2: {
      title: 'Kris Image Classification (KNN & HOG)',
      description: 'A classification system to identify the type (dapur) of traditional kris based on images. Uses Histogram of Oriented Gradients (HOG) feature extraction and K-Nearest Neighbors (KNN) algorithm implemented fully from scratch in Jupyter Notebook. A simple GUI built with Tkinter for image upload.',
    },
    p3: {
      title: 'Hospital Assistant Chatbot - Part 1',
      description: 'For this chatbot project, I built an NLU model using LSTM architecture. To gain deep semantic understanding of Bahasa Indonesia, I utilized a pre-trained word embedding model from fastText (cc.id.300.vec), which significantly improved intent detection accuracy on a limited dataset.',
    },
    p4: {
      title: 'Hospital Assistant Chatbot - Part 2',
      description: 'Frontend improvement using React and Laravel as the backend framework.',
    },
    p5: {
      title: 'Government Agency Profile Website Redesign (Joomla)',
      description: 'Redesign of a Joomla-based website including navbar configuration, menu structure, and layout consistency across multiple pages for a cleaner, more informative, and accessible experience.',
    },
    p6: {
      title: 'Job Application Tracker',
      description: 'Used to track job applications — recording which positions I have and have not applied for, so nothing gets forgotten.',
    },
    p7: {
      title: 'PAS Assistant',
      description: 'PAS Assistant is a self-service information system application designed to facilitate public service access (particularly within the correctional/penitentiary scope). Features include a Dashboard recap, Visit List management, Status Check, Information panel, and integrated Chatbot for interactive Q&A.',
    },
    p8: {
      title: 'Si-Aris',
      description: 'Si-Aris is a women\'s social savings group (arisan) management platform with online lottery drawing and offline name printing features.',
    },
  },

  // Resume Tab
  resume: {
    header: 'QUALIFICATION & WORK HISTORY LOGBOOK',
    status: 'STATUS: VERIFIED CADRE',
    educationTrack: 'TRACK 01 // ACADEMIC EDUCATION',
    educationLevel: 'BACHELOR\'S',
    workTrack: 'TRACK 02 // INDUSTRIAL EXPERIENCE & INTERNSHIP',
    workLevel: 'PROFESSIONAL',
    period: 'PERIOD:',
    certHeader: 'OFFICIAL COMPETENCY CERTIFICATIONS',
    pubHeader: 'RESEARCH & JOURNAL PUBLICATIONS',
    issuer: 'ISSUER:',
    level: 'LEVEL:',
    release: 'ISSUED:',
    validUntil: 'VALID UNTIL:',
    author: 'AUTHOR:',
    published: 'PUBLISHED IN:',
    verify: 'VERIFY',
    openJournal: 'OPEN JOURNAL',
    gpaLabel: 'GPA',
  },

  // Contact Tab
  contact: {
    header: 'TRANSMISSION & COMMUNICATION TERMINAL',
    status: 'STATUS: DUPLEX CHANNEL READY',
    primaryChannelLabel: 'PRIMARY ELECTRONIC CHANNEL:',
    copyEmail: 'COPY EMAIL ADDRESS',
    emailCopied: 'ADDRESS COPIED SUCCESSFULLY',
    whatsappLabel: 'FAST CHANNEL // WHATSAPP:',
    whatsappButton: 'CONTACT VIA WA',
    responseTime: 'RESPONSE TIME:',
    responseValue: '< 24 BUSINESS HOURS',
    timezone: 'TIMEZONE:',
    timezoneValue: 'INDONESIA (WIB // GMT+7)',
    protocolStatus: 'PROTOCOL STATUS:',
    protocolValue: 'ACTIVE & OPEN',
    consoleTitle: 'DISPATCH CONSOLE // TRANSMIT MESSAGE',
    consolePort: 'INPUT PORT 80',
    nameLabel: 'FULL NAME *',
    namePlaceholder: 'e.g. John Doe',
    emailLabel: 'EMAIL ADDRESS *',
    subjectLabel: 'MESSAGE SUBJECT',
    subjectPlaceholder: 'Project Offer / AI Discussion',
    messageLabel: 'TRANSMISSION MESSAGE *',
    messagePlaceholder: 'Describe your project requirements, timeline, or technical questions...',
    submitButton: 'SEND TRANSMISSION NOW',
    submittingButton: 'TRANSMITTING...',
    successTitle: '[TRANSMISSION RECEIVED SUCCESSFULLY]',
    successMessage: 'Thank you. Your message has entered my inbox queue.',
    errorPrefix: '[ERROR]',
    validationError: 'Please fill in all required fields marked *',
    emailError: 'Email address format is not valid',
    networkError: 'Internet connection failed. Please try again.',
    serverError: 'Server connection failed.',
    genericError: 'Failed to send transmission. Please try again.',
  },

  // Sidebar
  sidebar: {
    unitStamp: 'UNIT_MHS // MOD-01',
    systemOnline: 'SYS_ONLINE',
    biometricRaw: 'BIOMETRIC RAW',
    changePhoto: 'CHANGE PHOTO',
    syncCloud: 'SYNC CLOUD...',
    ccdSpec: 'CCD_360PX',
    calibrated: 'CALIBRATED',
    location: 'GMT+7',
    downloadCV: 'DOWNLOAD CV DOCUMENT',
    statusReady: 'STATUS: READY FOR PROJECTS & CONTRACTS',
    externalPorts: 'EXTERNAL COMMUNICATION PORTS:',
    cloudError: '[SYS_WARN] Cloud database permission limited. Photo active in local cache.',
    viewfinderCorners: ['┌', '┐', '└', '┘'],
  },

  // Floating Transceiver
  transceiver: {
    title: 'TRANSCEIVER // QUICK MESSAGE',
    openTitle: 'Open Quick Transceiver',
    nameLabel: 'NAME *',
    namePlaceholder: 'Your Name',
    emailLabel: 'EMAIL *',
    messagePlaceholder: 'Type a quick message...',
    messageLabel: 'MESSAGE *',
    sendButton: 'TRANSMIT PING',
    sending: 'SENDING...',
    successTitle: '[TRANSMISSION RECEIVED]',
    successMessage: 'Thank you. Your instant message has entered the system.',
    validationError: 'Please fill in all required fields marked *',
    sendError: 'Failed to send transmission.',
    subjectPrefix: 'Quick Transceiver Message',
  },

  // Passcode Modal
  modal: {
    authTitle: 'ADMIN ACCESS AUTHENTICATION',
    authDesc: 'Enter the unit owner passcode to upload a profile photo.',
    passcodePlaceholder: 'PASSCODE',
    cancel: 'CANCEL',
    verify: 'VERIFY',
    forgotPassword: 'Forgot password? Send reset link to email',
    wrongPasscode: 'Authentication key incorrect.',
    resetTitle: 'RESET PASSWORD',
    resetDesc: 'A reset link will be sent to the admin email:',
    resetNote: 'Password changes require approval via email.',
    back: 'BACK',
    sendEmail: 'SEND EMAIL',
    sending: 'SENDING...',
    emailSentTitle: 'EMAIL SENT',
    emailSentDesc: 'Password reset link has been sent to:',
    emailSentNote: 'Check your inbox or spam folder. Link valid for 1 hour.',
    close: 'CLOSE',
    emailConfigError: 'EmailJS not configured. See setup guide in console.',
    emailSendError: 'Failed to send email. Check EmailJS configuration.',
  },

  // Personal Info (bilingual)
  personal: {
    bio: 'Informatics Engineering graduate with a strong passion for Artificial Intelligence and Web Development. I focus on building application solutions that are not only intelligent, but also efficient and modern in usability.',
    stats: {
      year: 'Years',
      project: 'Projects',
      cert: 'Certs',
    },
  },

  // Background
  background: {
    coords: '+ LAT: -07.1523° // LON: 112.7521°',
    calibration: 'SYS_CALIBRATION // STABLE',
    clock: 'CLK: 3.20 GHz // SAMPLING: 96kHz',
    brand: '+ TE-INSTRUMENTATION CHASSIS',
  },
};
