const support = {
  hero: {
    badge: "Soporte Mistli",
    title: "¿Cómo podemos",
    titleHighlight: "ayudarte?",
    description:
      "Encuentra respuestas a preguntas frecuentes o envíanos un mensaje. Nuestro equipo te responderá lo antes posible.",
  },

  categories: {
    account: "Cuenta y acceso",
    security: "Seguridad",
    billing: "Facturación",
    integrations: "Integraciones",
  },

  faq: {
    sectionLabel: "Centro de ayuda",
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Cómo puedo restablecer mi contraseña?",
        answer:
          "Ve a la página de inicio de sesión y selecciona la opción para recuperar tu contraseña. Recibirás un enlace en tu correo para crear una nueva.",
      },
      {
        question: "¿Puedo pagar un software en varios pagos?",
        answer:
          "Sí. Puedes pagar en 2, 3 o hasta 12 pagos dependiendo del software que adquieras. Para más información, contáctanos.",
      },
      {
        question: "¿Puedo exportar mis datos?",
        answer:
          "Sí, si desarrollamos con anterioridad para ti o tu negocio un módulo que lo haga, puedes hacerlo. De no ser así, no podrás. En caso de que tengas un módulo desarrollado para eso y esté fallando, ponte en contacto con nosotros.",
      },
      {
        question: "¿Cómo cancelo mi suscripción?",
        answer:
          "Puedes solicitar la cancelación desde el formulario de soporte.",
      },
    ],
  },

  contact: {
    sectionLabel: "Contacto",
    title: "Contactar a soporte",
    description:
      "¿No encontraste la respuesta? Envíanos un mensaje y te ayudaremos con tu caso.",

    success: {
      title: "Mensaje enviado.",
      description: "Recibimos tu solicitud y responderemos a",
      asap: "lo antes posible.",
      newMessage: "Enviar otro mensaje",
    },

    form: {
      name: {
        label: "Nombre *",
        placeholder: "Tu nombre",
      },
      email: {
        label: "Email *",
        placeholder: "tu@empresa.com",
      },
      subject: {
        label: "Asunto",
        placeholder: "¿En qué podemos ayudarte?",
      },
      message: {
        label: "Mensaje *",
        placeholder: "Cuéntanos qué está ocurriendo o qué necesitas...",
      },

      submit: {
        sending: "Enviando...",
        send: "Enviar mensaje",
      },

      privacy:
        "Tu información se utilizará únicamente para atender tu solicitud.",
    },
  },

  validation: {
    required: "Completa tu nombre, correo y mensaje.",
    shortMessage: "Cuéntanos un poco más sobre el problema.",
    sendError: "No se pudo enviar tu mensaje.",
  },
} as const;


export default support;