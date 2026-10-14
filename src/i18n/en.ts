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

    // Project Admin Controls & CRUD
    addProjectBtn: '+ ADD PROJECT',
    editProjectBtn: 'EDIT PROJECT',
    deleteProjectBtn: 'DELETE',
    projectTitleLabel: 'PROJECT TITLE:',
    projectCategoryLabel: 'PROJECT CATEGORY:',
    projectDescriptionLabel: 'PROJECT DESCRIPTION:',
    projectTechLabel: 'TECH STACK (COMMA-SEPARATED):',
    projectDemoLabel: 'DEMO / LIVE URL:',
    projectGithubLabel: 'GITHUB REPOSITORY URL:',
    projectImagesLabel: 'PROJECT PHOTOS / IMAGES:',
    projectVideoLabel: 'DEMO VIDEO URL (YOUTUBE / TIKTOK / MP4):',
    projectSavedToast: 'Project successfully saved to rack!',
    projectDeletedToast: 'Project successfully deleted from rack.',
    resetProjectsBtn: 'RESET DEFAULT PROJECTS',
    resetProjectsPrompt: 'Restore all projects to system defaults?',
    authProjectsPrompt: 'Enter admin passcode to manage project rack.',
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

    // Education & Qualification Actions & Modals
    addEduBtn: '+ ADD EDUCATION',
    editEduBtn: 'EDIT EDUCATION',
    deleteEduBtn: 'DELETE',
    addCertBtn: '+ ADD QUALIFICATION / CERTIFICATION',
    editCertBtn: 'EDIT CERTIFICATION',
    deleteCertBtn: 'DELETE',
    resetDefaultBtn: 'RESET TO DEFAULTS',
    resetConfirmTitle: 'RESTORE FACTORY DEFAULTS?',
    resetConfirmDesc: 'All academic education & certification records will be reverted to initial system values.',
    viewDocBtn: 'VIEW DOCUMENT / PHOTO',
    viewCertDocBtn: 'VIEW CERTIFICATE PROOF',
    noDocAttached: 'No document attached',
    docPreviewTitle: 'DOCUMENT INSPECTION // OFFICIAL ATTACHMENT',
    downloadDoc: 'OPEN ORIGINAL LINK / FILE',
    closeModal: 'CLOSE',
    cancel: 'CANCEL',
    saveEntry: 'SAVE ENTRY',
    saving: 'SAVING...',
    fieldOfStudy: 'FIELD OF STUDY / MAJOR:',
    degreeLabel: 'DEGREE / ACADEMIC LEVEL:',
    schoolLabel: 'INSTITUTION / UNIVERSITY / SCHOOL:',
    locationLabel: 'LOCATION:',
    periodLabel: 'PERIOD (START YR - END YR):',
    gpaFormLabel: 'GRADE / GPA (E.G. 3.66/4.0):',
    statusLabel: 'GRADUATION STATUS:',
    achievementsLabel: 'ACTIVITIES & ACHIEVEMENTS (ONE PER LINE):',
    descriptionLabel: 'DESCRIPTION / SUMMARY:',
    mediaSourceLabel: 'SUPPORTING DOCUMENT OR PHOTO (CERTIFICATE / ACTIVITIES):',
    uploadMethodFile: 'UPLOAD IMAGE FILE (JPG, PNG, WEBP)',
    uploadMethodUrl: 'USE DOCUMENT URL LINK',
    dropOrClickToUpload: 'Click or drop document file here',
    pasteDocUrlPlaceholder: 'https://...',
    docNameLabel: 'DOCUMENT LABEL / NAME:',
    deleteConfirmTitle: 'CONFIRM ENTRY DELETION',
    deleteConfirmPrompt: 'Are you sure you want to delete this entry from the system?',
    deleteConfirmBtn: 'YES, DELETE PERMANENTLY',
    certNameLabel: 'QUALIFICATION / CERTIFICATION NAME:',
    issuerLabel: 'ISSUING ORGANIZATION / ISSUER:',
    issueDateLabel: 'ISSUE DATE (E.G. 12 September 2025):',
    validUntilLabel: 'EXPIRATION DATE / VALIDITY:',
    noExpiration: 'Does not expire',
    credentialIdLabel: 'CREDENTIAL ID / CERTIFICATE NO:',
    verifyUrlLabel: 'OFFICIAL VERIFICATION URL:',
    skillsLabel: 'ASSOCIATED SKILLS (COMMA-SEPARATED):',
    categoryLabel: 'SPECIALIZATION CATEGORY:',
    levelLabel: 'TIER / LEVEL:',
    filterCategoryAll: 'ALL CATEGORIES',
    searchCertPlaceholder: 'Search certification name, issuer, or skills...',
    toastAdded: 'Entry successfully added to logbook.',
    toastUpdated: 'Entry successfully updated.',
    toastDeleted: 'Entry successfully deleted.',
    toastReset: 'Data successfully restored to factory defaults.',

    // Section Filters / Navigation
    sectionAll: 'ALL LOGBOOK',
    sectionEdu: 'EDUCATION',
    sectionWork: 'WORK EXPERIENCE',
    sectionCerts: 'QUALIFICATIONS & CERTS',
    sectionPubs: 'PUBLICATIONS',

    // Modal Tabs (Compact Zero-Scroll Architecture)
    tabBasicInfo: '1. GENERAL INFO',
    tabDetailsMedia: '2. ACHIEVEMENTS & MEDIA',
    tabCertGeneral: '1. CERTIFICATION INFO',
    tabCertCredentials: '2. CREDENTIALS & MEDIA',
    nextTab: 'NEXT TO MEDIA >',
    prevTab: '< BACK TO GENERAL',

    // Security & Admin Passcode
    adminLocked: 'ACCESS LOCKED',
    adminUnlocked: 'ADMIN UNLOCKED',
    adminAuthRequired: 'ADMIN AUTHENTICATION REQUIRED',
    adminAuthPrompt: 'Adding, modifying, or deleting logbook records requires portfolio owner passcode verification.',
    adminLockBtn: 'LOCK ADMIN',
    adminUnlockBtn: 'UNLOCK ADMIN',
    enterPasscode: 'ENTER ADMIN PASSCODE',
    authSuccessToast: 'Admin authenticated successfully. Modification access active.',
    authFailedToast: 'Incorrect passcode. Access denied.',
    adminStatusTitle: 'LOGBOOK SECURITY STATUS:',

    // Track 02 Work Experience CRUD
    addWorkBtn: '+ ADD WORK EXPERIENCE',
    editWorkBtn: 'EDIT EXPERIENCE',
    deleteWorkBtn: 'DELETE',
    roleLabel: 'ROLE / POSITION:',
    companyLabel: 'COMPANY / ORGANIZATION:',
    badgeLabel: 'TYPE / BADGE (E.G. INTERNSHIP / FULL-TIME):',
    responsibilitiesLabel: 'RESPONSIBILITIES & ACHIEVEMENTS (ONE PER LINE):',
    tabWorkGeneral: '1. WORK DETAILS',
    tabWorkMedia: '2. TASKS & PHOTO DOCUMENTATION',

    // Multi-Photo Support
    multiPhotoNotice: 'SELECT 1 OR MULTIPLE PHOTOS AT ONCE',
    photosAttached: 'PHOTOS RECORDED',
    noPhotosAttached: 'No supporting photos/documents',
    viewPhotos: 'VIEW DOCUMENTS / PHOTOS',
    photoOf: 'OF',
    prevPhoto: 'PREVIOUS PHOTO',
    addMorePhotos: '+ Add More Photos',

    // AI Translation & Multilingual Inputs
    aiTranslateBtn: '⚡ AI AUTO-TRANSLATE (ID ➔ EN)',
    aiTranslating: 'TRANSLATING VIA AI...',
    aiTranslateSuccess: 'Successfully auto-translated to English!',
    langTabId: '🇮🇩 INDONESIA',
    langTabEn: '🇬🇧 ENGLISH',
    enInputNotice: 'English text will be displayed when English mode is active.',

    // Publications CRUD
    addPubBtn: '+ ADD PUBLICATION',
    editPubBtn: 'EDIT PUBLICATION',
    deletePubBtn: 'DELETE',
    pubTitleLabel: 'RESEARCH / JOURNAL ARTICLE TITLE:',
    journalLabel: 'JOURNAL / PUBLISHING OUTLET:',
    pubYearLabel: 'PUBLICATION YEAR:',
    authorLabel: 'AUTHOR(S) / CONTRIBUTORS:',
    doiLabel: 'DOI IDENTIFIER (OPTIONAL):',
    pubUrlLabel: 'OFFICIAL JOURNAL ACCESS URL:',
    tabPubGeneral: '1. PUBLICATION DATA',
    tabPubMedia: '2. RESEARCH DOCUMENTS & COVER',
  },

  // Localized Content for Logbook Data (EN)
  resumeData: {
    education: {
      'edu-uin-malang-s1': {
        degree: 'Bachelor of Computer Science (S1)',
        school: 'State Islamic University of Maulana Malik Ibrahim Malang',
        location: 'Malang, Indonesia',
        achievements: [
          'Graduated with Cum Laude Honors',
          "Published scientific journal paper on 'Rice Plant Disease Classification Using Convolutional Neural Network (CNN) Based on Leaf Images' in 'UGM National Journal of Electrical Engineering and Information Technology (JNTETI)'"
        ]
      }
    },
    experiences: {
      'e1': {
        role: 'Information Technology (IT) Intern',
        company: 'Class IIA Narcotics Penitentiary',
        badge: 'Internship',
        description: [
          'Developed and maintained tailored web-based management applications fulfilling organizational workflows.',
          'Handled incident troubleshooting and fixed bugs across institutional websites, apps, and internal IT systems.',
          'Conducted routine preventive maintenance and hardware repairs on workstations, printers, and LAN network nodes.',
          'Delivered continuous end-user IT support ensuring maximum operational uptime.'
        ]
      },
      'e2': {
        role: 'Natural Language Processing Intern',
        company: 'PT. Arion Indonesia',
        badge: 'Internship',
        description: [
          'Successfully scraped and collected public commentary data across online news portals and social media via APIs.',
          'Conducted full-pipeline text preprocessing (tokenization, regex cleaning, lemmatization) for sentiment classification.',
          'Trained and evaluated machine learning classifiers across positive, negative, and neutral sentiment labels.',
          'Tested model performance metrics on unseen evaluation sets and refined annotations to improve precision.',
          'Composed comprehensive final analytical report summarizing sentiment trends and business implications.'
        ]
      },
      'e3': {
        role: 'Agricultural Data Analyst',
        company: 'PT. Arion Indonesia',
        badge: 'Internship',
        description: [
          'Executed high-precision aerial drone photogrammetry across 2 project survey zones (facility perimeter and paddy sectors).',
          'Processed multi-angle drone captures into 3D topographical terrain models and GIS orthomosaics.',
          'Assessed soil moisture levels and crop fertility patterns using multispectral vegetation index color gradients.'
        ]
      }
    },
    certifications: {
      'cert-ai-milenial-2025': {
        name: 'AI Engineer For Millennials',
        issuer: 'Center for Digital Literacy Development',
        category: 'Artificial Intelligence',
        validUntil: 'Does not expire',
        skills: ['Prompt Engineering Fundamentals', 'Productivity Enhancement with AI', 'Prompt Optimization']
      },
      'cert-azure-prompt-2025': {
        name: 'Applying Prompt Engineering with Azure OpenAI Service',
        issuer: 'DTS Kominfo & ElevAlte',
        category: 'Generative AI',
        validUntil: 'Does not expire',
        skills: ['Prompt Engineering', 'Prompt Design & Optimization', 'Azure OpenAI Service', 'Advanced Prompting Techniques']
      },
      'cert-linear-ml-2025': {
        name: 'Linear Models in Machine Learning: Fundamentals',
        issuer: 'DTS Kominfo & Yandex (Fresh Graduate Academy)',
        category: 'Machine Learning',
        validUntil: 'Does not expire',
        skills: ['Machine Learning Core Concepts', 'Data Preprocessing (Imputation & Outlier Handling)', 'Data Splitting & Feature Scaling', 'Linear Regression & Gradient Descent', 'Regularization (L1 & L2)', 'Scikit-learn Pipelines', 'Model Evaluation (R² & MSE)']
      },
      'cert-intro-datascience-2025': {
        name: 'Introduction to Data Science and Multi-Sector Applications',
        issuer: 'DTS Kominfo',
        category: 'Data Analytics',
        validUntil: 'Does not expire',
        skills: ['Data Science Fundamentals', 'Applied Data Science (Cross-Sector Case Studies)']
      },
      'cert-career-data-analytics-2025': {
        name: 'Career Insights in Data Analytics',
        issuer: 'DTS Kominfo',
        category: 'Data Analytics',
        validUntil: 'Does not expire',
        skills: ['Data Analytics Fundamentals', 'Analytics Workflows', 'Data Visualization & Insight Interpretation']
      },
      'cert-ai-security-2025': {
        name: 'AI Security Fundamentals',
        issuer: 'DTS Kominfo & ElevAlte',
        category: 'AI Security',
        validUntil: 'Does not expire',
        skills: ['AI Security Concepts', 'AI Threat & Adversarial Attack Analysis', 'AI Risk Governance', 'Security Architecture Inspection']
      },
      'cert-pdp-privacy-2025': {
        name: 'Personal Data Protection (PDP) and Privacy Compliance',
        issuer: 'DTS Kominfo',
        category: 'Information Security Management',
        validUntil: 'Does not expire',
        skills: ['Personal Data Protection', 'Regulatory Policy Frameworks', 'Privacy Principles', 'Case Studies in Compliance Implementation']
      },
      'cert-ai-implementation-2025': {
        name: 'Fundamentals of Artificial Intelligence Implementation',
        issuer: 'DTS Kominfo',
        category: 'Artificial Intelligence',
        validUntil: 'Does not expire',
        skills: ['AI Technology Introduction', 'Privacy Safeguard Enforcement', 'AI Ethics & Responsible Use']
      },
      'cert-alibaba-bigdata-2023': {
        name: 'Alibaba Cloud: Big Data Fundamentals',
        issuer: 'DTS Kominfo & Alibaba Cloud',
        category: 'Cloud Computing',
        validUntil: 'Does not expire',
        skills: ['Big Data Fundamentals', 'Data Warehousing & Distributed Processing', 'Advanced ETL Data Tools', 'Visualization, Machine Learning, & Cloud AI']
      }
    },
    publications: {
      'pub1': {
        title: 'Rice Plant Disease Classification Using Convolutional Neural Network (CNN) Based on Leaf Images',
        journal: 'UGM National Journal of Electrical Engineering and Information Technology (JNTETI)',
        author: 'Moh. Heri Susanto'
      }
    }
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
