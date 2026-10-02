export const home = {
  navbar: {
    // Si tu navbar usa estas claves, puedes reutilizarlas desde aquí.
    home: "Inicio",
    services: "Servicios",
    about: "Nosotros",
    contact: "Contacto",
  },

  hero: {
    badge: "Software · IA · Automatización",
    title: "Software que",
    titleAccent: "trabaja contigo.",
    description:
      "Diseñamos y desarrollamos software, inteligencia artificial y automatización para convertir problemas reales de negocio en sistemas que funcionan.",
    primaryCta: "Cuéntanos tu proyecto",
    secondaryCta: "Explorar servicios",
    trust: {
      customDevelopment: "Desarrollo a medida",
      appliedAi: "IA aplicada",
      automation: "Automatización",
      cloud: "Cloud",
      madeInMexico: "Hecho en México",
    },
    workflow: {
      ariaLabel: "Ejemplo de flujo automatizado con IA",
      title: "Flujo · procesamiento de documentos",
      status: "En ejecución",
      steps: {
        received: {
          title: "Documento recibido",
          meta: "Correo · PDF · formulario",
        },
        extraction: {
          title: "Extracción con IA",
          meta: "Campos, montos y contexto",
        },
        validation: {
          title: "Validación automática",
          meta: "Reglas de negocio",
        },
        registration: {
          title: "Registro en tu sistema",
          meta: "ERP · CRM · API",
        },
      },
      floating: {
        aiAgent: "Agente IA",
        connectedApi: "API conectada",
      },
    },
  },

  outcomes: [
    {
      icon: "mdi:timer-sand",
      title: "Menos trabajo manual",
      text: "Procesos repetitivos que se ejecutan solos, con trazabilidad de principio a fin.",
      color: "var(--mistli-cyan)",
    },
    {
      icon: "mdi:chart-timeline-variant",
      title: "Decisiones con información",
      text: "Tus datos conectados y disponibles cuando los necesitas, no atrapados en hojas de cálculo.",
      color: "var(--mistli-primary)",
    },
    {
      icon: "mdi:layers-outline",
      title: "Sistemas que escalan",
      text: "Software mantenible que crece con tu operación en lugar de frenarla.",
      color: "var(--mistli-magenta)",
    },
  ],

  services: {
    section: {
      eyebrow: "Lo que hacemos",
      title: "Una sola empresa.",
      muted: "Múltiples capacidades.",
      description:
        "Desde una landing page hasta sistemas con inteligencia artificial. Construimos lo que tu operación realmente necesita.",
    },

    items: [
      {
        title: "Inteligencia Artificial",
        description:
          "Agentes, RAG, automatización inteligente y soluciones de IA integradas a tus procesos.",
        path: "/ia",
        icon: "mdi:brain",
        tag: "IA",
        accent: "ia",
        highlights: ["Agentes", "RAG", "LLMs"],
      },
      {
        title: "Desarrollo Web",
        description:
          "Landing pages, plataformas web y experiencias digitales diseñadas para crecer.",
        path: "/web",
        icon: "mdi:web",
        tag: "WEB",
        accent: "web",
        highlights: ["Landing pages", "Plataformas", "Experiencias"],
      },
      {
        title: "Backend & APIs",
        description:
          "APIs, sistemas internos e integraciones robustas para conectar tu operación.",
        path: "/backend",
        icon: "mdi:server-outline",
        tag: "BACKEND",
        accent: "backend",
        highlights: ["APIs", "Sistemas internos", "Integraciones"],
      },
      {
        title: "Automatización",
        description:
          "Elimina tareas repetitivas conectando herramientas, datos y procesos.",
        path: "/automatizacion",
        icon: "mdi:lightning-bolt",
        tag: "AUTOMATIZACIÓN",
        accent: "automatizacion",
        highlights: ["Flujos", "Datos", "Procesos"],
      },
      {
        title: "Documentos",
        description:
          "Extracción, clasificación y procesamiento inteligente de documentos.",
        path: "/documentos",
        icon: "mdi:file-document-outline",
        tag: "DOCUMENTOS",
        accent: "documentos",
        highlights: ["Extracción", "Clasificación", "Procesamiento"],
      },
      {
        title: "Aplicaciones",
        description:
          "Software a medida para necesidades específicas de tu negocio.",
        path: "/aplicaciones",
        icon: "mdi:application-brackets-outline",
        tag: "SOFTWARE",
        accent: "aplicaciones",
        highlights: ["Web", "Mobile", "A medida"],
      },
    ],

    cardCta: "Conocer servicio",
  },

  approach: {
    eyebrow: "Nuestro enfoque",
    title: "No empezamos por",
    titleAccent: "la tecnología.",
    description:
      "Empezamos entendiendo el problema. Después elegimos la tecnología adecuada para resolverlo.",

    steps: [
      {
        number: "01",
        title: "Entendemos",
        text: "Analizamos tu proceso, problema y objetivos.",
        color: "var(--mistli-cyan)",
      },
      {
        number: "02",
        title: "Diseñamos",
        text: "Definimos la solución antes de construirla.",
        color: "var(--mistli-primary)",
      },
      {
        number: "03",
        title: "Construimos",
        text: "Desarrollamos software mantenible y escalable.",
        color: "var(--mistli-primary)",
      },
      {
        number: "04",
        title: "Evolucionamos",
        text: "Mejoramos la solución conforme crece tu negocio.",
        color: "var(--mistli-magenta)",
      },
    ],
  },

  technology: {
    eyebrow: "Stack & capacidades",
    description: "Tecnología elegida para cada problema.",
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
    eyebrow: "¿Tienes una idea?",
    title: "Hagámosla",
    titleAccent: "funcionar.",
    description:
      "Cuéntanos qué quieres construir, qué problema quieres resolver o qué proceso quieres automatizar.",
    button: "Hablar con Mistli",
  },
} as const;

export default home;
