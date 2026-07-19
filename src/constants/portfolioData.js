export const personalInfo = {
  name: "Dharmik Patel",
  title: "Software Engineer & Creative Developer",
  subtitles: [
    "Software Engineer",
    "Computer Science Student",
    "Full Stack Developer",
    "React Specialist",
    "AI Enthusiast",
    "Open Source Contributor"
  ],
  description: "A passionate Computer Science student and Software Engineer specializing in building highly scalable web applications, distributed systems, and creative interactive interfaces. I craft digital experiences that combine technical excellence with cutting-edge visual design.",
  email: "dharmikpatel2006msu@gmail.com",
  phone: "+91 98765 43210",
  location: "Gujarat, India",
  resumeUrl: "#", // Mock resume link
  socials: {
    github: "https://github.com/dharmikpatel2006msu",
    linkedin: "https://linkedin.com/in/dharmikpatel",
    twitter: "https://twitter.com/dharmik_patel",
    leetcode: "https://leetcode.com/dharmikpatel",
  }
};

export const aboutData = {
  journey: "My programming journey started with curiosity about how complex algorithms power the products we use daily. As a Computer Science and Engineering student at MSU, I've dived deep into systems architecture, data structures, and state-of-the-art frontend development. I enjoy bridging the gap between rigorous backends and high-performance, beautiful user interfaces.",
  objective: "To secure a challenging Software Engineer role at a top-tier technology company where I can apply my deep understanding of full-stack engineering, interactive design, and AI integrations to build products that impact millions.",
  learning: "Currently deep-diving into WebGPU, advanced GSAP animation structures, Next.js 15, and optimization patterns for large language model interfaces.",
  passion: "I am deeply passionate about creative development, animations that feel organic, high-performance UI engineering, and open-source software.",
  funFacts: [
    { emoji: "🚀", text: "Built my first full-stack application at age 17." },
    { emoji: "⚡", text: "Solved 800+ algorithmic problems across LeetCode & Codeforces." },
    { emoji: "☕", text: "Powered by specialty coffee and synthwave playlists." },
    { emoji: "🎨", text: "Possess a keen eye for motion graphics, typography, and micro-interactions." }
  ]
};

export const educationData = [
  {
    institution: "The Maharaja Sayajirao University of Baroda",
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    duration: "2023 - 2027",
    cgpa: "9.28 / 10.0",
    details: "Specializing in Software Engineering, Advanced DBMS, Design and Analysis of Algorithms, and Distributed Systems. Active lead at the Developer Student Club."
  },
  {
    institution: "Senior Secondary School",
    degree: "HSC (Science stream, CBSE)",
    duration: "2021 - 2023",
    cgpa: "95.4%",
    details: "Focused on Mathematics, Physics, and Computer Science."
  }
];

export const experienceData = [
  {
    company: "CampusConnect Lab",
    role: "Full Stack Engineer Intern",
    duration: "Jun 2025 - Present",
    responsibilities: [
      "Architected and deployed a smart student portal and collaboration hub, scaling to over 1,500 active campus users.",
      "Implemented secure, real-time sync with Supabase and complex Row Level Security (RLS) policies for user comments and events.",
      "Optimized query performance by 40% using database indexing and structured PostgreSQL migration schemas.",
      "Built beautiful, responsive frontend features utilizing React, TailwindCSS, and custom context hooks."
    ],
    achievements: "Reduced server response times by 35% and designed a scalable comment moderation pipeline."
  },
  {
    company: "MSU CSE Department",
    role: "Undergraduate Research Assistant & Developer",
    duration: "Nov 2024 - May 2025",
    responsibilities: [
      "Co-developed an AI-driven attendance monitoring application utilizing OpenCV face recognition algorithms and Python backend.",
      "Designed and integrated real-time analytical dashboards for faculty and administration using React and Chart.js.",
      "Refactored legacy MySQL schemas to support high-concurrency requests during peak campus hours."
    ],
    achievements: "Successfully piloted the AI attendance system in 4 department classrooms with 98.2% face detection accuracy."
  }
];

export const skillsData = [
  {
    category: "Programming",
    items: [
      { name: "C++", level: 90, icon: "Code" },
      { name: "Java", level: 85, icon: "Code" },
      { name: "Python", level: 88, icon: "Terminal" },
      { name: "JavaScript", level: 92, icon: "Cpu" },
      { name: "TypeScript", level: 87, icon: "Cpu" },
      { name: "C", level: 80, icon: "Code" }
    ]
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95, icon: "Layers" },
      { name: "Tailwind CSS", level: 93, icon: "Palette" },
      { name: "Next.js", level: 85, icon: "Globe" },
      { name: "Framer Motion", level: 90, icon: "Zap" },
      { name: "HTML5/CSS3", level: 95, icon: "Layout" }
    ]
  },
  {
    category: "Backend & Database",
    items: [
      { name: "Node.js", level: 88, icon: "Server" },
      { name: "Express.js", level: 85, icon: "Server" },
      { name: "MongoDB", level: 86, icon: "Database" },
      { name: "PostgreSQL", level: 84, icon: "Database" },
      { name: "Supabase / Firebase", level: 90, icon: "Cloud" }
    ]
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git & GitHub", level: 92, icon: "GitBranch" },
      { name: "Docker", level: 75, icon: "HardDrive" },
      { name: "Postman", level: 88, icon: "Sliders" },
      { name: "Linux / Bash", level: 80, icon: "Terminal" },
      { name: "VS Code", level: 95, icon: "Edit3" }
    ]
  }
];

export const projectsData = [
  {
    id: "campus-connect",
    title: "CampusConnect",
    category: "Web",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    description: "A premium student portal and collaboration hub featuring real-time group chats, peer mentoring networks, academic event sharing, and custom Supabase migrations.",
    features: [
      "Real-time communication using Supabase WebSockets and channels.",
      "Strict Row Level Security (RLS) configuration verifying user identities.",
      "Dynamic event manager featuring calendar views and automatic email reminders.",
      "Interactive forums with nested commenting systems and upvoting capability."
    ],
    techStack: ["React", "TailwindCSS", "Supabase", "React Context", "Lucide React"],
    githubUrl: "https://github.com/dharmikpatel2006msu/CampusConnect",
    liveUrl: "#",
    architecture: "React Single Page Application backed by Supabase PostgreSQL database. Authentication and database updates occur via real-time RLS schemas.",
    challenges: "Handling real-time state merges for nested comment updates while maintaining instant page responsiveness during heavy load.",
    learnings: "Deep understanding of PostgreSQL triggers, row-level policy enforcement, and Vite asset optimization bundle sizes."
  },
  {
    id: "ai-attendance",
    title: "AI Face Attendance System",
    category: "AI",
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=800&auto=format&fit=crop",
    description: "An automated real-time classroom attendance tracking system powered by OpenCV facial recognition and deep learning algorithms.",
    features: [
      "Live multi-face tracking and match matching with 98.2% accuracy.",
      "Automatic CSV/Excel export system for professors.",
      "Admin dashboard depicting attendance rate trends and outliers.",
      "Camera feed optimization ensuring high-speed processing on CPU."
    ],
    techStack: ["Python", "OpenCV", "Tkinter", "SQLite", "Face Recognition API"],
    githubUrl: "https://github.com/dharmikpatel2006msu/AI-Attendance",
    liveUrl: "#",
    architecture: "Python OpenCV pipeline capturing frame data, feeding it to deep learning embeddings, matching against local database templates, and registering entries.",
    challenges: "Adapting facial landmarks recognition in variable lighting conditions and handling fast movement distortions.",
    learnings: "Implementing efficient face encoding matrices comparison utilizing NumPy vectorized operations to boost speed."
  },
  {
    id: "expense-tracker",
    title: "FinVue: Premium Expense Tracker",
    category: "React",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    description: "A highly elegant, interactive personal financial planner with visual budgeting charts, transaction records, and AI spending reports.",
    features: [
      "Advanced canvas-based interactive area and donut charts.",
      "Multiple bank account integrations and monthly limits warnings.",
      "AI spending analyzer suggesting budget trims and forecasting next month expenses.",
      "Excel exports and multi-currency conversion support."
    ],
    techStack: ["React", "TailwindCSS", "Chart.js", "React Hook Form", "LocalForage"],
    githubUrl: "https://github.com/dharmikpatel2006msu/FinVue-Tracker",
    liveUrl: "#",
    architecture: "React state architecture utilizing context APIs, persisted using localized IndexedDB storage and analyzed via serverless GPT integrations.",
    challenges: "Syncing asynchronous database loads without causing visual component re-renders or charts flashing.",
    learnings: "Mastering custom CSS transitions and hooks to animate numerical count increases smoothly."
  },
  {
    id: "developer-portfolio",
    title: "Awwwards Portfolio Website",
    category: "Web",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800&auto=format&fit=crop",
    description: "This portfolio itself. Designed with Apple, Linear and Stripe UI philosophies. Features high-end custom cursors, noise styling, and elaborate physics-based motion.",
    features: [
      "Interactive 3D hover effects on cards and mouse spotlight cursor.",
      "Animated background grids with particle floating systems.",
      "Lenis smooth scroll integration coupled with scroll-spy navbar tracking.",
      "Complex Framer Motion page loading and component entering presets."
    ],
    techStack: ["React", "TailwindCSS", "Framer Motion", "Lenis Scroll", "Lucide React"],
    githubUrl: "https://github.com/dharmikpatel2006msu/Dharmik__Portfolio",
    liveUrl: "#",
    architecture: "Single Page App using modular layout structures, managed hooks for hardware-accelerated animations, and optimized layout render passes.",
    challenges: "Combining particles rendering on HTML5 canvas with Framer Motion animations to run consistently at 60+ FPS.",
    learnings: "Optimizing canvas paints using requestAnimationFrame and offscreen canvases, minimizing DOM layouts reflow."
  }
];

export const certificatesData = [
  {
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (Coursera)",
    date: "May 2025",
    credentialUrl: "https://coursera.org",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Feb 2025",
    credentialUrl: "https://aws.amazon.com",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop"
  },
  {
    title: "Google Cloud Certified: Cloud Digital Leader",
    issuer: "Google Cloud",
    date: "Nov 2024",
    credentialUrl: "https://cloud.google.com",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=400&auto=format&fit=crop"
  }
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    rating: "2158 (Knight)",
    solved: "824 / 2400+",
    badge: "Guardian / Top 2%",
    color: "from-yellow-500 to-amber-600",
    url: "https://leetcode.com"
  },
  {
    platform: "CodeChef",
    rating: "1874 (4-Star)",
    solved: "242 problems",
    badge: "Division 1",
    color: "from-blue-500 to-indigo-600",
    url: "https://codechef.com"
  },
  {
    platform: "Codeforces",
    rating: "1486 (Specialist)",
    solved: "168 problems",
    badge: "Specialist",
    color: "from-cyan-500 to-blue-600",
    url: "https://codeforces.com"
  },
  {
    platform: "HackerRank",
    rating: "Problem Solving (6-Star)",
    solved: "120+ gold badge",
    badge: "Gold Badge",
    color: "from-emerald-500 to-green-600",
    url: "https://hackerrank.com"
  }
];

export const achievementsData = [
  {
    category: "Hackathons",
    title: "Smart India Hackathon Finalist",
    description: "Proposed and built a prototype for automated student mental health tracking using sentiment analytics in communication portals.",
    date: "2024"
  },
  {
    category: "Coding Contests",
    title: "Rank 14 in MSU Annual Tech Contest",
    description: "Competed against 400+ students in a 3-hour algorithmic competitive coding event.",
    date: "2024"
  },
  {
    category: "Leadership",
    title: "Tech Lead - DSC MSU",
    description: "Led the development branch, guiding junior developers in frontend React design systems and API architectures.",
    date: "2024 - Present"
  },
  {
    category: "Awards",
    title: "Outstanding Student Scholar Award",
    description: "Awarded by MSU Engineering Department for maintaining a top CGPA in the CSE batch.",
    date: "2025"
  }
];

export const testimonialsData = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Professor & Head, CSE Dept at MSU",
    text: "Dharmik stands out for his exceptional technical acumen and project management skills. His work on CampusConnect was outstanding, showing engineering rigor that matches senior developers.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Aman Gupta",
    role: "Senior Software Engineer at Meta (Alumni Mentor)",
    text: "Dharmik possesses a rare blend of aesthetic design sense and solid programming foundations. He writes clean, decoupled React code and is constantly eager to explore performance optimizations.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop"
  }
];

export const blogsData = [
  {
    title: "Mastering Framer Motion for Immersive Web Experiences",
    excerpt: "Learn how to use complex custom transition springs, layouts changes, and scroll animations to create web pages that feel alive and responsive.",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    link: "#"
  },
  {
    title: "Building Secure Apps with React and Supabase RLS",
    excerpt: "Row Level Security is vital. We walk through creating, testing, and verifying PostgreSQL security policies within modern React apps.",
    date: "May 28, 2026",
    readTime: "8 min read",
    link: "#"
  },
  {
    title: "Leveraging AI for Next-Generation Web Architectures",
    excerpt: "Exploring methods to run lightweight neural network inference on client devices and integrating serverless APIs for real-time recommendations.",
    date: "Apr 15, 2026",
    readTime: "5 min read",
    link: "#"
  }
];
