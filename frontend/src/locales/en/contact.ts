const contact = {
  services: {
    ia: {
      label: "Artificial Intelligence",
      description: "Chatbots, agents, RAG, and Machine Learning.",
    },
    web: {
      label: "Web Development",
      description: "Landing pages, e-commerce, and web systems.",
    },
    backend: {
      label: "Backend & APIs",
      description: "APIs, databases, and integrations.",
    },
    automatizacion: {
      label: "Automation",
      description: "Processes, workflows, and integrations.",
    },
    aplicaciones: {
      label: "Applications",
      description: "Custom software and platforms.",
    },
    documentos: {
      label: "Documents",
      description: "Intelligent document processing and extraction.",
    },
    otro: {
      label: "Other Project",
      description: "Tell us what you have in mind.",
    },
  },

  whatsapp: {
    message: "Hello Mistli, I'm interested in",
    defaultService: "a software service",
    need: "I need",
    direct: "Prefer to talk directly?",
    button: "Message us on WhatsApp",
  },

  hero: {
    badge: "Let's talk",
    title: "Tell us what",
    titleHighlight: "you want to build.",
    description:
      "Tell us what problem you want to solve, what you have today, and what you would like to achieve. We'll turn it into a solution.",
  },

  project: {
    eyebrow: "Your project",
    title: "Let's start by understanding it.",
    description:
      "You don't need to have every detail figured out. Explain the problem and we'll help you find the right path.",

    steps: [
      {
        icon: "mdi:message-text-outline",
        title: "Let's talk about your project",
        description:
          "Tell us what you need without worrying about technical terms.",
      },
      {
        icon: "mdi:lightbulb-outline",
        title: "We analyze the solution",
        description:
          "We review your needs before proposing a solution.",
      },
      {
        icon: "mdi:rocket-launch-outline",
        title: "We take action",
        description:
          "We define scope, technology, and next steps.",
      },
    ],
  },

  success: {
    title: "We received your request.",
    description:
      "Thank you for contacting Mistli. We'll review the information and get back to you.",
    backHome: "Back to home",
  },

  form: {
    service: {
      eyebrow: "01 / Service",
      title: "What do you want to build?",
    },

    contact: {
      eyebrow: "02 / Contact",
      title: "How can we reach you?",

      name: {
        label: "Name *",
        placeholder: "Your name",
      },

      company: {
        label: "Company",
        placeholder: "Your company name",
      },

      email: {
        label: "Email *",
        placeholder: "you@company.com",
      },

      phone: {
        label: "WhatsApp",
        placeholder: "+52 222...",
      },
    },

    project: {
      eyebrow: "03 / Project",
      title: "Tell us what you need.",
      placeholder:
        "What do you want to build, automate, or solve?",
    },

    budget: {
      eyebrow: "04 / Optional",
      title: "Do you have a defined budget?",
      description:
        "It's not required. It helps us propose a solution that fits.",

      options: {
        flexible: "I'd rather discuss it",
        low: "$5k – $15k",
        medium: "$15k – $30k",
        high: "$30k+",
      },
    },

    submit: {
      loading: "Sending...",
      button: "Request a proposal",
      privacy:
        "Your information will only be used to follow up on your request.",
    },
  },

  validation: {
    service: "Please select a service.",
    message: "Tell us a little more about your project.",
    submit: "The form could not be submitted.",
    error: "We couldn't submit your request.",
  },

  serviceMessage: {
    interestedIn: "I'm interested in",
    specifically: "and specifically",
    yourServices: "your services",
  },
};


export default contact;