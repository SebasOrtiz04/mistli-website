const ia = {
  hero: {
    badge: "Artificial Intelligence",
    titleLine1: "AI that understands",
    titleHighlight: "your business.",
    description:
      "We integrate artificial intelligence into real processes: assistants, agents, RAG, machine learning and automation connected to the systems you already use.",
  },

  chat: {
    assistantName: "Mistli Assistant",
    status: "AI available",
    demoBadge: "Demo",
    welcomeMessage:
      "Hi. I'm Mistli's assistant. I can help you explore how to apply AI, automation and machine learning to your business.",
    demoReply:
      "This chatbot is in demo mode. The next stage is connecting it to an AI model through your FastAPI backend, and then adding memory, RAG and tools.",
    inputPlaceholder: "Type your question...",
    sendLabel: "Send message",
    demoDisclaimer: "The assistant on this page is a demo.",
    suggestedPrompts: [
      "I want to improve my business with technology",
      "Which processes in my business can I automate?",
      "I'd like to schedule a consultation with Mistli"
    ],
    emptyTitle:"How can we help you today?",
    emptyText:"Ask about our services or choose one of these ideas to get started.",
    placeholder:"Write your question...",
    disclaimer:"Mistli IA can make mistakes. Verify the important information."
  },

  aside: {
    badge: "Applied AI",
    title: "It's not about adding a chatbot.",
    text: "It's about connecting intelligence with information, tools and processes to solve concrete problems.",
    capabilities: [
      {
        icon: "mdi:robot-outline",
        title: "AI Agents",
        text: "Systems able to reason, query information and take actions.",
      },
      {
        icon: "mdi:database-search-outline",
        title: "RAG",
        text: "Connect language models with your own documents and data.",
      },
      {
        icon: "mdi:brain",
        title: "Machine Learning",
        text: "Predictive and classification models tailored to real problems.",
      },
      {
        icon: "mdi:api",
        title: "Integrations",
        text: "We connect AI with your APIs, internal systems and tools.",
      },
    ],
  },

  cta: {
    eyebrow: "Have a process to improve?",
    titleLine1: "Let's make AI",
    titleHighlight: "work for you.",
    text: "Tell us what you want to automate, predict, classify or connect, and we'll design a solution around your problem.",
    button: "Talk to Mistli",
  },
} as const;

export default ia;