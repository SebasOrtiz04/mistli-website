export const home = {
  navbar: {
    // If your navbar uses these keys, you can reuse them from here.
    home: "Home",
    services: "Services",
    about: "About us",
    contact: "Contact",
  },

  hero: {
    badge: "Software · AI · Automation",
    title: "Software that",
    titleAccent: "works with you.",
    description:
      "We design and build software, artificial intelligence, and automation to turn real business problems into systems that work.",
    primaryCta: "Tell us about your project",
    secondaryCta: "Explore services",
    trust: {
      customDevelopment: "Custom development",
      appliedAi: "Applied AI",
      automation: "Automation",
      cloud: "Cloud",
      madeInMexico: "Made in Mexico",
    },
    workflow: {
      ariaLabel: "Example of an AI-powered automated workflow",
      title: "Workflow · document processing",
      status: "Running",
      steps: {
        received: {
          title: "Document received",
          meta: "Email · PDF · form",
        },
        extraction: {
          title: "AI extraction",
          meta: "Fields, amounts & context",
        },
        validation: {
          title: "Automatic validation",
          meta: "Business rules",
        },
        registration: {
          title: "Recorded in your system",
          meta: "ERP · CRM · API",
        },
      },
      floating: {
        aiAgent: "AI Agent",
        connectedApi: "Connected API",
      },
    },
  },

  outcomes: [
    {
      icon: "mdi:timer-sand",
      title: "Less manual work",
      text: "Repetitive processes that run on their own, with end-to-end traceability.",
      color: "var(--mistli-cyan)",
    },
    {
      icon: "mdi:chart-timeline-variant",
      title: "Informed decisions",
      text: "Your data connected and available when you need it, instead of being trapped in spreadsheets.",
      color: "var(--mistli-primary)",
    },
    {
      icon: "mdi:layers-outline",
      title: "Systems that scale",
      text: "Maintainable software that grows with your operation instead of holding it back.",
      color: "var(--mistli-magenta)",
    },
  ],

  services: {
    section: {
      eyebrow: "What we do",
      title: "One company.",
      muted: "Multiple capabilities.",
      description:
        "From a landing page to AI-powered systems. We build what your operation actually needs.",
    },

    items: [
      {
        title: "Artificial Intelligence",
        description:
          "Agents, RAG, intelligent automation, and AI solutions integrated into your processes.",
        path: "/ia",
        icon: "mdi:brain",
        tag: "AI",
        accent: "ia",
        highlights: ["Agents", "RAG", "LLMs"],
      },
      {
        title: "Web Development",
        description:
          "Landing pages, web platforms, and digital experiences designed to grow.",
        path: "/web",
        icon: "mdi:web",
        tag: "WEB",
        accent: "web",
        highlights: ["Landing pages", "Platforms", "Experiences"],
      },
      {
        title: "Backend & APIs",
        description:
          "APIs, internal systems, and robust integrations that connect your operation.",
        path: "/backend",
        icon: "mdi:server-outline",
        tag: "BACKEND",
        accent: "backend",
        highlights: ["APIs", "Internal systems", "Integrations"],
      },
      {
        title: "Automation",
        description:
          "Eliminate repetitive tasks by connecting tools, data, and processes.",
        path: "/automatizacion",
        icon: "mdi:lightning-bolt",
        tag: "AUTOMATION",
        accent: "automatizacion",
        highlights: ["Workflows", "Data", "Processes"],
      },
      {
        title: "Documents",
        description:
          "Intelligent document extraction, classification, and processing.",
        path: "/documentos",
        icon: "mdi:file-document-outline",
        tag: "DOCUMENTS",
        accent: "documentos",
        highlights: ["Extraction", "Classification", "Processing"],
      },
      {
        title: "Applications",
        description:
          "Custom software for your business's specific needs.",
        path: "/aplicaciones",
        icon: "mdi:application-brackets-outline",
        tag: "SOFTWARE",
        accent: "aplicaciones",
        highlights: ["Web", "Mobile", "Custom"],
      },
    ],

    cardCta: "Learn more",
  },

  approach: {
    eyebrow: "Our approach",
    title: "We don't start with",
    titleAccent: "technology.",
    description:
      "We start by understanding the problem. Then we choose the right technology to solve it.",

    steps: [
      {
        number: "01",
        title: "Understand",
        text: "We analyze your process, problem, and goals.",
        color: "var(--mistli-cyan)",
      },
      {
        number: "02",
        title: "Design",
        text: "We define the solution before building it.",
        color: "var(--mistli-primary)",
      },
      {
        number: "03",
        title: "Build",
        text: "We develop maintainable and scalable software.",
        color: "var(--mistli-primary)",
      },
      {
        number: "04",
        title: "Evolve",
        text: "We improve the solution as your business grows.",
        color: "var(--mistli-magenta)",
      },
    ],
  },

  technology: {
    eyebrow: "Stack & capabilities",
    description: "Technology chosen for each problem.",
    capabilities: [
      "Python",
      "FastAPI",
      "React",
      "Cloud",
      "LLMs",
      "RAG",
      "AI Agents",
      "APIs",
      "Automation",
      "Databases",
    ],
  },

  cta: {
    eyebrow: "Have an idea?",
    title: "Let's make it",
    titleAccent: "work.",
    description:
      "Tell us what you want to build, what problem you want to solve, or what process you want to automate.",
    button: "Talk to Mistli",
  },
} as const;

export default home;
