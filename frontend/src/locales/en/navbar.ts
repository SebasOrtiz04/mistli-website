const navbar = {
  services: {
    label: "Services",
    subtitle: "Software solutions for your business.",
    items: {
      ai: {
        label: "Artificial Intelligence",
        description: "Agents, RAG and AI solutions",
      },
      web: {
        label: "Web Development",
        description: "Websites and web platforms",
      },
      backend: {
        label: "Backend & APIs",
        description: "APIs, systems and integrations",
      },
      automation: {
        label: "Automation",
        description: "Smart processes and workflows",
      },
      documents: {
        label: "Documents",
        description: "Intelligent processing",
      },
      apps: {
        label: "Applications",
        description: "Web, mobile and custom software",
      },
    },
  },

  documentation: "Documentation",
  support: "Support",

  menu: {
    open: "Open menu",
    close: "Close menu",
  },
} as const;

export default navbar;