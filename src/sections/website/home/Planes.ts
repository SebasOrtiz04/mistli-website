import { formatearDinero } from "../../../helpers/uiAmounts.ts";

type idiomaString = {
  ES: string;
  EN: string;
};

type Language = "EN" | "ES";

type Items = {
  [key in Language]: string[];
};

type Plan = {
  title: idiomaString;
  description: idiomaString;
  cost: idiomaString;
  items: Items;
  textButton: idiomaString;
  whatsAppText: idiomaString;
  popular: boolean;
};

type Plans = {
  basic: Plan;
  standard: Plan;
  premium: Plan;
};

const baseWhats = "https://wa.me/2213295628?text=";

/* ======================================================
   AUTOMATIZACIÓN EMPRESARIAL
====================================================== */
export const PLANSAUTO: Plans = {
  basic: {
    popular: false,
    title: { ES: "Automatización Esencial", EN: "Essential Automation" },
    description: {
      ES: "Reduce tareas manuales y errores para que tu negocio opere sin fricción.",
      EN: "Reduce manual tasks and errors so your business runs smoothly.",
    },
    cost: {
      ES: `${formatearDinero(6500)} MXN`,
      EN: `${formatearDinero(325)} USD`,
    },
    items: {
      ES: [
        "Hasta 2 procesos automatizados",
        "Conexión con 1 sistema o base de datos",
        "Reportes automáticos (Excel o PDF)",
        "Panel básico de monitoreo",
      ],
      EN: [
        "Up to 2 automated processes",
        "Connection to 1 system or database",
        "Automatic reports (Excel or PDF)",
        "Failure alerts",
        "Basic monitoring dashboard",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa el plan de Automatización Esencial."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in the Essential Automation plan."),
    },
  },

  standard: {
    popular: true,
    title: { ES: "Automatización Inteligente", EN: "Intelligent Automation" },
    description: {
      ES: "Automatiza procesos clave y ahorra horas de trabajo humano todos los días.",
      EN: "Automate key processes and save hours of human work every day.",
    },
    cost: {
      ES: `${formatearDinero(14500)} MXN`,
      EN: `${formatearDinero(725)} USD`,
    },
    items: {
      ES: [
        "Hasta 5 flujos de automatización",
        "Integración con CRM / ERP",
        "Procesamiento inteligente de documentos",
        "Dashboard profesional",
        "Soporte y ajustes el primer mes",
      ],
      EN: [
        "Up to 5 automation workflows",
        "CRM / ERP integrations",
        "Intelligent document processing",
        "Professional dashboard",
        "First-month support and adjustments",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa el plan de Automatización Inteligente."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in the Intelligent Automation plan."),
    },
  },

  premium: {
    popular: false,
    title: { ES: "Automatización Empresarial Avanzada", EN: "Advanced Enterprise Automation" },
    description: {
      ES: "Transforma la operación completa de tu empresa con automatización e IA a medida.",
      EN: "Transform your entire business operation with custom automation and AI.",
    },
    cost: { ES: "Desde $35,000 MXN", EN: "From $1,750 USD" },
    items: {
      ES: [
        "Automatización empresarial personalizada",
        "IA entrenada con datos del negocio",
        "Integración total de sistemas",
        "Aplicación web y/o móvil",
        "Infraestructura escalable",
        "Capacitación y soporte continuo",
      ],
      EN: [
        "Custom enterprise automation",
        "AI trained with business data",
        "Full system integration",
        "Web and/or mobile applications",
        "Scalable infrastructure",
        "Training and continuous support",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, quiero cotizar Automatización Empresarial Avanzada."),
      EN: baseWhats + encodeURIComponent("Hello, I'd like a quote for Advanced Enterprise Automation."),
    },
  },
};

/* ======================================================
   DESARROLLO WEB
====================================================== */
export const PLANSFULL: Plans = {
  basic: {
    popular: false,
    title: { ES: "Web Profesional", EN: "Professional Website" },
    description: {
      ES: "Presencia digital funcional lista para operar.",
      EN: "Functional digital presence ready to operate.",
    },
    cost: {
      ES: `${formatearDinero(6000)} MXN`,
      EN: `${formatearDinero(300)} USD`,
    },
    items: {
      ES: [
        "Sitio web responsivo",
        "Formularios funcionales",
        "Panel básico",
        "Configuración de hosting",
      ],
      EN: [
        "Responsive website",
        "Functional contact forms",
        "Basic admin panel",
        "Hosting setup",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa el plan Web Profesional."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in the Professional Website plan."),
    },
  },

  standard: {
    popular: true,
    title: { ES: "Sistema Web de Negocio", EN: "Business Web System" },
    description: {
      ES: "Sistema web completo para operar y escalar.",
      EN: "Complete web system to operate and scale.",
    },
    cost: {
      ES: `${formatearDinero(16000)} MXN`,
      EN: `${formatearDinero(800)} USD`,
    },
    items: {
      ES: [
        "Sistema web full-stack",
        "Usuarios y roles",
        "Integraciones (pagos, APIs)",
        "Funciones en tiempo real",
        "Dashboard administrativo",
      ],
      EN: [
        "Full-stack web system",
        "User and role management",
        "API and payment integrations",
        "Real-time features",
        "Admin dashboard",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa el Sistema Web de Negocio."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in the Business Web System."),
    },
  },

  premium: {
    popular: false,
    title: { ES: "Plataforma Empresarial", EN: "Enterprise Platform" },
    description: {
      ES: "Plataforma digital lista para crecer a nivel empresa.",
      EN: "Enterprise-grade platform built to scale.",
    },
    cost: { ES: "Desde $40,000 MXN", EN: "From $2,000 USD" },
    items: {
      ES: [
        "Web + móvil",
        "Arquitectura empresarial",
        "Seguridad y monitoreo",
        "CI/CD y escalabilidad",
        "Soporte continuo",
      ],
      EN: [
        "Web + mobile",
        "Enterprise architecture",
        "Security and monitoring",
        "CI/CD and scalability",
        "Continuous support",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, quiero cotizar una Plataforma Empresarial."),
      EN: baseWhats + encodeURIComponent("Hello, I'd like a quote for an Enterprise Platform."),
    },
  },
};

/* ======================================================
   IA APLICADA AL NEGOCIO
====================================================== */
export const PLANSIA: Plans = {
  basic: {
    popular: false,
    title: { ES: "IA para un Problema Específico", EN: "Targeted Business AI" },
    description: {
      ES: "Un modelo de IA resolviendo un problema real.",
      EN: "One AI model solving a real problem.",
    },
    cost: {
      ES: `${formatearDinero(9500)} MXN`,
      EN: `${formatearDinero(475)} USD`,
    },
    items: {
      ES: [
        "Un modelo de IA",
        "Entrenamiento con tus datos",
        "API para integración",
        "Documentación básica",
      ],
      EN: [
        "One AI model",
        "Training with your data",
        "Integration API",
        "Basic documentation",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa IA para un problema específico."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in targeted business AI."),
    },
  },

  standard: {
    popular: true,
    title: { ES: "Sistema de IA Operativo", EN: "Operational AI System" },
    description: {
      ES: "IA integrada directamente en la operación del negocio.",
      EN: "AI fully integrated into business operations.",
    },
    cost: {
      ES: `${formatearDinero(22000)} MXN`,
      EN: `${formatearDinero(1100)} USD`,
    },
    items: {
      ES: [
        "Múltiples modelos de IA",
        "Dashboard y métricas",
        "Integración en sistemas",
        "Versionado y monitoreo",
      ],
      EN: [
        "Multiple AI models",
        "Dashboard and metrics",
        "System integration",
        "Model monitoring",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa el Sistema de IA Operativo."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in the Operational AI System."),
    },
  },

  premium: {
    popular: false,
    title: { ES: "IA Empresarial Estratégica", EN: "Strategic Enterprise AI" },
    description: {
      ES: "IA como ventaja competitiva real.",
      EN: "AI as a true competitive advantage.",
    },
    cost: { ES: "Desde $60,000 MXN", EN: "From $3,000 USD" },
    items: {
      ES: [
        "IA avanzada (LLM, visión, NLP)",
        "Aprendizaje continuo",
        "Soporte 6 meses",
      ],
      EN: [
        "Advanced AI (LLM, vision, NLP)",
        "Continuous learning",
        "Full integration",
        "6 months support",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, quiero cotizar IA Empresarial Estratégica."),
      EN: baseWhats + encodeURIComponent("Hello, I'd like a quote for Strategic Enterprise AI."),
    },
  },
};

/* ======================================================
   DESARROLLO MÓVIL
====================================================== */
export const PLANSMOBILE: Plans = {
  basic: {
    popular: true,
    title: { ES: "App Móvil Profesional", EN: "Professional Mobile App" },
    description: {
      ES: "Aplicación móvil lista para operar.",
      EN: "Mobile application ready to operate.",
    },
    cost: {
      ES: `${formatearDinero(10000)} MXN`,
      EN: `${formatearDinero(500)} USD`,
    },
    items: {
      ES: [
        "App React Native",
        "Autenticación y backend",
        "Hasta 6 pantallas",
        "Notificaciones push",
      ],
      EN: [
        "React Native app",
        "Authentication and backend",
        "Up to 6 screens",
        "Push notifications",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa el plan App Móvil Profesional."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in the Professional Mobile App."),
    },
  },

  standard: {
    popular: false,
    title: { ES: "App Empresarial Completa", EN: "Complete Enterprise App" },
    description: {
      ES: "Aplicación móvil integrada al negocio.",
      EN: "Mobile app fully integrated with the business.",
    },
    cost: {
      ES: `${formatearDinero(18000)} MXN`,
      EN: `${formatearDinero(900)} USD`,
    },
    items: {
      ES: [
        "App avanzada",
        "Backend empresarial",
        "Funciones en tiempo real",
        "Dashboard web administrativo",
      ],
      EN: [
        "Advanced app",
        "Enterprise backend",
        "Real-time features",
        "Admin web dashboard",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, me interesa la App Empresarial Completa."),
      EN: baseWhats + encodeURIComponent("Hello, I'm interested in the Complete Enterprise App."),
    },
  },

  premium: {
    popular: false,
    title: { ES: "Ecosistema Móvil con IA", EN: "AI-Powered Mobile Ecosystem" },
    description: {
      ES: "Ecosistema móvil avanzado con IA integrada.",
      EN: "Advanced mobile ecosystem with integrated AI.",
    },
    cost: { ES: "Desde $45,000 MXN", EN: "From $2,250 USD" },
    items: {
      ES: [
        "App con IA",
        "Backend empresarial",
        "Web complementaria",
        "Soporte 6 meses",
      ],
      EN: [
        "AI-powered app",
        "Enterprise backend",
        "Companion web app",
        "6 months support",
      ],
    },
    textButton: { ES: "Cotizar", EN: "Request Quote" },
    whatsAppText: {
      ES: baseWhats + encodeURIComponent("Hola, quiero cotizar el Ecosistema Móvil con IA."),
      EN: baseWhats + encodeURIComponent("Hello, I'd like a quote for the AI Mobile Ecosystem."),
    },
  },
};
