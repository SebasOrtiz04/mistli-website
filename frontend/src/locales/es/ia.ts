const ia = {
  hero: {
    badge: "Inteligencia Artificial",
    titleLine1: "IA que entiende",
    titleHighlight: "tu negocio.",
    description:
      "Integramos inteligencia artificial en procesos reales: asistentes, agentes, RAG, machine learning y automatización conectados con los sistemas que ya utilizas.",
  },

  chat: {
    assistantName: "Asistente Mistli",
    status: "IA disponible",
    demoBadge: "Demo",
    welcomeMessage:
      "Hola. Soy el asistente de Mistli. Puedo ayudarte a explorar cómo aplicar IA, automatización y machine learning a tu negocio.",
    demoReply:
      "Este chatbot está en modo demostración. La siguiente etapa será conectarlo con un modelo de IA mediante tu backend FastAPI y, posteriormente, agregar memoria, RAG y herramientas.",
    inputPlaceholder: "Escribe tu pregunta...",
    sendLabel: "Enviar mensaje",
    demoDisclaimer: "El asistente de esta página es una demostración.",
    suggestedPrompts: [
      "¿Qué puede automatizar la IA en mi empresa?",
      "Quiero conectar un chatbot con mis documentos",
      "¿Qué es un agente de IA?",
    ],
  },

  aside: {
    badge: "IA aplicada",
    title: "No se trata de poner un chatbot.",
    text: "Se trata de conectar inteligencia con información, herramientas y procesos para resolver problemas concretos.",
    capabilities: [
      {
        icon: "mdi:robot-outline",
        title: "Agentes de IA",
        text: "Sistemas capaces de razonar, consultar información y ejecutar acciones.",
      },
      {
        icon: "mdi:database-search-outline",
        title: "RAG",
        text: "Conecta modelos de lenguaje con tus propios documentos y datos.",
      },
      {
        icon: "mdi:brain",
        title: "Machine Learning",
        text: "Modelos predictivos y de clasificación adaptados a problemas reales.",
      },
      {
        icon: "mdi:api",
        title: "Integraciones",
        text: "Conectamos la IA con tus APIs, sistemas internos y herramientas.",
      },
    ],
  },

  cta: {
    eyebrow: "¿Tienes un proceso que mejorar?",
    titleLine1: "Hagamos que la IA",
    titleHighlight: "trabaje para ti.",
    text: "Cuéntanos qué quieres automatizar, predecir, clasificar o conectar y diseñemos una solución alrededor de tu problema.",
    button: "Hablar con Mistli",
  },
} as const;


export default ia;