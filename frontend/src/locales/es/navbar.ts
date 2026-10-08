const navbar = {
  services: {
    label: "Servicios",
    subtitle: "Soluciones de software para tu negocio.",
    items: {
      ai: {
        label: "Inteligencia Artificial",
        description: "Agentes, RAG y soluciones con IA",
      },
      web: {
        label: "Desarrollo Web",
        description: "Sitios y plataformas web",
      },
      backend: {
        label: "Backend & APIs",
        description: "APIs, sistemas e integraciones",
      },
      automation: {
        label: "Automatización",
        description: "Procesos y flujos inteligentes",
      },
      documents: {
        label: "Documentos",
        description: "Procesamiento inteligente",
      },
      apps: {
        label: "Aplicaciones",
        description: "Web, mobile y software a medida",
      },
    },
  },

  documentation: "Documentación",
  support: "Soporte",

  menu: {
    open: "Abrir menú",
    close: "Cerrar menú",
  },
} as const;

export default navbar;

