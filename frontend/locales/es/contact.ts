const contact = {
  services: {
    ia: {
      label: "Inteligencia Artificial",
      description: "Chatbots, agentes, RAG y Machine Learning.",
    },
    web: {
      label: "Desarrollo Web",
      description: "Landing pages, e-commerce y sistemas web.",
    },
    backend: {
      label: "Backend & APIs",
      description: "APIs, bases de datos e integraciones.",
    },
    automatizacion: {
      label: "Automatización",
      description: "Procesos, workflows e integraciones.",
    },
    aplicaciones: {
      label: "Aplicaciones",
      description: "Software y plataformas a medida.",
    },
    documentos: {
      label: "Documentos",
      description: "Procesamiento y extracción inteligente.",
    },
    otro: {
      label: "Otro proyecto",
      description: "Cuéntanos qué tienes en mente.",
    },
  },

  whatsapp: {
    message: "Hola Mistli, me interesa",
    defaultService: "un servicio de software",
    need: "Necesito",
    direct: "¿Prefieres hablar directamente?",
    button: "Escríbenos por WhatsApp",
  },

  hero: {
    badge: "Hablemos",
    title: "Cuéntanos qué",
    titleHighlight: "quieres construir.",
    description:
      "Cuéntanos qué problema quieres resolver, qué tienes actualmente y qué te gustaría conseguir. Nosotros nos encargamos de convertirlo en una solución.",
  },

  project: {
    eyebrow: "Tu proyecto",
    title: "Empecemos por entenderlo.",
    description:
      "No necesitas tener todos los detalles definidos. Explícanos el problema y nosotros te ayudamos a encontrar el camino.",

    steps: [
      {
        icon: "mdi:message-text-outline",
        title: "Hablemos de tu proyecto",
        description:
          "Cuéntanos qué necesitas sin preocuparte por términos técnicos.",
      },
      {
        icon: "mdi:lightbulb-outline",
        title: "Analizamos la solución",
        description:
          "Revisamos tus necesidades antes de proponerte una solución.",
      },
      {
        icon: "mdi:rocket-launch-outline",
        title: "Pasamos a la acción",
        description:
          "Definimos alcance, tecnología y siguientes pasos.",
      },
    ],
  },

  success: {
    title: "Recibimos tu solicitud.",
    description:
      "Gracias por contactar a Mistli. Revisaremos la información y nos pondremos en contacto contigo.",
    backHome: "Volver al inicio",
  },

  form: {
    service: {
      eyebrow: "01 / Servicio",
      title: "¿Qué quieres construir?",
    },

    contact: {
      eyebrow: "02 / Contacto",
      title: "¿Cómo podemos encontrarte?",

      name: {
        label: "Nombre *",
        placeholder: "Tu nombre",
      },

      company: {
        label: "Empresa",
        placeholder: "Nombre de tu empresa",
      },

      email: {
        label: "Email *",
        placeholder: "tu@empresa.com",
      },

      phone: {
        label: "WhatsApp",
        placeholder: "+52 222...",
      },
    },

    project: {
      eyebrow: "03 / Proyecto",
      title: "Cuéntanos qué necesitas.",
      placeholder:
        "¿Qué quieres construir, automatizar o resolver?",
    },

    budget: {
      eyebrow: "04 / Opcional",
      title: "¿Tienes un presupuesto definido?",
      description:
        "No es obligatorio. Nos ayuda a plantear una solución acorde.",

      options: {
        flexible: "Prefiero hablarlo",
        low: "$5k – $15k",
        medium: "$15k – $30k",
        high: "$30k+",
      },
    },

    submit: {
      loading: "Enviando...",
      button: "Solicitar propuesta",
      privacy:
        "Tus datos se utilizarán únicamente para dar seguimiento a tu solicitud.",
    },
  },

  validation: {
    service: "Selecciona un servicio.",
    message: "Cuéntanos un poco más sobre tu proyecto.",
    submit: "No se pudo enviar el formulario.",
    error: "No pudimos enviar tu solicitud.",
  },

  serviceMessage: {
    interestedIn: "Me interesa",
    specifically: "y específicamente",
    yourServices: "sus servicios",
  },
};

export default contact;