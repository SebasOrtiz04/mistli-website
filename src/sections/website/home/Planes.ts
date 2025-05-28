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

export const PLANSAUTO: Plans = {
    basic: {
        popular: false,
        title: {
            ES: "Automatización Básica",
            EN: "Basic Automation",
        },
        description: {
            ES: "Automatización de tareas repetitivas con herramientas simples.",
            EN: "Automation of repetitive tasks with simple tools.",
        },
        cost: {
            ES: `${formatearDinero(2000)} MXN`,
            EN: `${formatearDinero(100)} USD`,
        },
        items: {
            EN: [
                "Automated reports (Excel, PDFs)",
                "Email automations (Gmail/Outlook)",
                "Scheduling tasks with cron or Zapier",
                "2 automated processes included"
            ],
            ES: [
                "Reportes automatizados (Excel, PDFs)",
                "Automatización de correos (Gmail/Outlook)",
                "Programación de tareas con cron o Zapier",
                "2 procesos automatizados incluidos"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan básico de automatización para mi negocio"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the basic automation plan for my business."),
        },
    },
    standard: {
        popular: true,
        title: {
            ES: "Automatización Estándar",
            EN: "Standard Automation",
        },
        description: {
            ES: "Automatización de procesos clave usando herramientas avanzadas.",
            EN: "Automation of key processes using advanced tools.",
        },
        cost: {
            ES: `${formatearDinero(5000)} MXN`,
            EN: `${formatearDinero(250)} USD`,
        },
        items: {
            EN: [
                "Automations with APIs (Freshdesk, Google, etc.)",
                "Form and data processing (Google Sheets, Airtable)",
                "Automated notifications (Telegram, Slack)",
                "Up to 5 automated flows"
            ],
            ES: [
                "Automatizaciones con APIs (Freshdesk, Google, etc.)",
                "Procesamiento de formularios y datos (Google Sheets, Airtable)",
                "Notificaciones automatizadas (Telegram, Slack)",
                "Hasta 5 flujos automatizados"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan estándar de automatización para mi negocio"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the standard automation plan for my business."),
        },
    },
    premium: {
        popular: false,
        title: {
            ES: "Automatización Premium",
            EN: "Premium Automation",
        },
        description: {
            ES: "Automatización completa e integrada para escalar tu negocio.",
            EN: "Complete and integrated automation to scale your business.",
        },
        cost: {
            ES: `${formatearDinero(12000)} MXN`,
            EN: `${formatearDinero(500)} USD`,
        },
        items: {
            EN: [
                "Custom-built automation systems",
                "ERP or CRM integration (HubSpot, Zoho, etc.)",
                "Real-time dashboards and reports",
                "Unlimited automation flows + training"
            ],
            ES: [
                "Sistemas de automatización personalizados",
                "Integración con ERP o CRM (HubSpot, Zoho, etc.)",
                "Dashboards y reportes en tiempo real",
                "Flujos de automatización ilimitados + capacitación"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan premium de automatización para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the premium automation plan for my company."),
        },
    },
};

export const PLANSFULL = {
    basic: {
        popular: false,
        title: {
            ES: "Paquete Básico",
            EN: "Basic Package",
        },
        description: {
            ES: "Ideal para negocios que comienzan su presencia digital.",
            EN: "Ideal for businesses starting their digital presence.",
        },
        cost: {
            ES: `${formatearDinero(2000)} MXN`,
            EN: `${formatearDinero(100)} USD`,
        },
        items: {
            EN: [
                "Responsive static website (up to 3 sections)",
                "Basic contact form with validations",
                "Basic personalized design using company colors",
                "Basic hosting + .com domain for 1 year"
            ],
            ES: [
                "Sitio web estático responsivo (hasta 3 secciones)",
                "Formulario de contacto con validaciones",
                "Diseño personalizado básico usando colores de la empresa",
                "Hosting básico + dominio .com por 1 año"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el paquete básico fullstack para mi negocio"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the basic fullstack package for my business."),
        },
    },
    standard: {
        popular: true,
        title: {
            ES: "Paquete Estándar",
            EN: "Standard Package",
        },
        description: {
            ES: "Para negocios en crecimiento que requieren herramientas dinámicas.",
            EN: "For growing businesses needing dynamic tools.",
        },
        cost: {
            ES: `${formatearDinero(7000)} MXN`,
            EN: `${formatearDinero(250)} USD`,
        },
        items: {
            EN: [
                "Dynamic website with backend (up to 6 pages)",
                "Simple admin panel with login/logout",
                "Database integration (MongoDB or PostgreSQL)",
                "1 API integration (e.g. WhatsApp, payments)"
            ],
            ES: [
                "Sitio web dinámico con backend (hasta 6 páginas)",
                "Panel administrativo sencillo con login/logout",
                "Integración con base de datos (MongoDB o PostgreSQL)",
                "1 integración con API (ej. WhatsApp, pagos)"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el paquete estándar fullstack para mi negocio"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the standard fullstack package for my business."),
        },
    },
    premium: {
        popular: false,
        title: {
            ES: "Paquete Premium",
            EN: "Premium Package",
        },
        description: {
            ES: "Solución fullstack completa y escalable para empresas consolidadas.",
            EN: "Complete and scalable fullstack solution for established companies.",
        },
        cost: {
            ES: `${formatearDinero(12000)} MXN`,
            EN: `${formatearDinero(500)} USD`,
        },
        items: {
            EN: [
                "Complete fullstack web app with advanced dashboard",
                "Robust backend with JWT authentication",
                "Multiple external integrations (payments, CRM, etc.)",
                "Professional deployment with CI/CD"
            ],
            ES: [
                "Aplicación web fullstack con dashboard avanzado",
                "Backend robusto con autenticación JWT",
                "Múltiples integraciones externas (pagos, CRM, etc.)",
                "Despliegue profesional con CI/CD"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el paquete premium fullstack para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the premium fullstack package for my company."),
        },
    },
};
``

export const PLANSIA: Plans = {
    basic: {
        popular: false,
        title: {
            ES: "IA Básica",
            EN: "Basic AI",
        },
        description: {
            ES: "Solución sencilla de automatización con inteligencia artificial.",
            EN: "Simple automation solution with artificial intelligence.",
        },
        cost: {
            ES: `${formatearDinero(3500)} MXN`,
            EN: `${formatearDinero(100)} USD`,
        },
        items: {
            EN: [
                "Simple data processing AI model",
                "Custom rule-based chatbot (FAQs)",
                "Integration with website or WhatsApp",
                "Basic training on use and results"
            ],
            ES: [
                "Modelo de IA para procesamiento de datos simple",
                "Chatbot personalizado basado en reglas (FAQs)",
                "Integración con sitio web o WhatsApp",
                "Capacitación básica sobre uso y resultados"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el paquete básico de inteligencia artificial para mi negocio"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the basic AI package for my business."),
        },
    },
    standard: {
        popular: true,
        title: {
            ES: "IA Estándar",
            EN: "Standard AI",
        },
        description: {
            ES: "Automatización con modelos de IA entrenados con datos específicos.",
            EN: "Automation with AI models trained on specific data.",
        },
        cost: {
            ES: `${formatearDinero(8000)} MXN`,
            EN: `${formatearDinero(250)} USD`,
        },
        items: {
            EN: [
                "Custom-trained ML model (text or images)",
                "Data preprocessing and analysis",
                "Integration with web or internal system",
                "Dashboard to monitor AI results"
            ],
            ES: [
                "Modelo de machine learning entrenado con datos personalizados",
                "Preprocesamiento y análisis de datos",
                "Integración con sistema web o interno",
                "Dashboard para monitorear resultados de IA"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el paquete estándar de inteligencia artificial para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the standard AI package for my company."),
        },
    },
    premium: {
        popular: false,
        title: {
            ES: "IA Premium",
            EN: "Premium AI",
        },
        description: {
            ES: "Solución de inteligencia artificial avanzada para procesos críticos.",
            EN: "Advanced AI solution for critical processes.",
        },
        cost: {
            ES: `${formatearDinero(15000)} MXN`,
            EN: `${formatearDinero(500)} USD`,
        },
        items: {
            EN: [
                "Advanced AI solution (NLP, CV or recommendation system)",
                "Fine-tuned model with continuous learning support",
                "Cloud deployment with API access",
                "Ongoing support and result optimization"
            ],
            ES: [
                "Solución avanzada de IA (NLP, visión por computadora o sistema de recomendación)",
                "Modelo ajustado con soporte para aprendizaje continuo",
                "Despliegue en la nube con acceso por API",
                "Soporte continuo y optimización de resultados"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el paquete premium de inteligencia artificial para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the premium AI package for my company."),
        },
    },
};
export const PLANSMOBILE: Plans = {
    basic: {
        popular: false,
        title: {
            ES: "App Móvil Básica",
            EN: "Basic Mobile App",
        },
        description: {
            ES: "Aplicación móvil sencilla con diseño personalizado",
            EN: "Simple mobile application with custom design",
        },
        cost: {
            ES: `${formatearDinero(3000)} MXN`,
            EN: `${formatearDinero(150)} USD`,
        },
        items: {
            EN: [
                "Custom UI design",
                "1 main screen + 2 extra screens",
                "Static data or local storage",
                "Android build (APK)",
            ],
            ES: [
                "Diseño UI personalizado",
                "1 pantalla principal + 2 pantallas extra",
                "Datos estáticos o almacenamiento local",
                "Compilación para Android (APK)",
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan básico de desarrollo móvil."),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the basic mobile development plan."),
        },
    },
    standard: {
        popular: true,
        title: {
            ES: "App Móvil Estándar",
            EN: "Standard Mobile App",
        },
        description: {
            ES: "Aplicación móvil funcional conectada a una API",
            EN: "Functional mobile application connected to an API",
        },
        cost: {
            ES: `${formatearDinero(7000)} MXN`,
            EN: `${formatearDinero(350)} USD`,
        },
        items: {
            EN: [
                "Up to 6 screens",
                "API integration (REST or GraphQL)",
                "Firebase or custom backend connection",
                "Android or iOS builds",
            ],
            ES: [
                "Hasta 6 pantallas",
                "Integración con API (REST o GraphQL)",
                "Conexión con Firebase o backend personalizado",
                "Compilación para Android o iOS",
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan estándar de desarrollo móvil."),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the standard mobile development plan."),
        },
    },
    premium: {
        popular: false,
        title: {
            ES: "App Móvil Premium",
            EN: "Premium Mobile App",
        },
        description: {
            ES: "Aplicación avanzada con funciones personalizadas y publicación en tiendas",
            EN: "Advanced mobile app with custom features and store publishing",
        },
        cost: {
            ES: `${formatearDinero(12000)} MXN`,
            EN: `${formatearDinero(600)} USD`,
        },
        items: {
            EN: [
                "Unlimited screens",
                "Advanced features (auth, camera, payments, etc.)",
                "Custom backend/API included",
                "Publication in Google Play or App Store",
            ],
            ES: [
                "Pantallas ilimitadas",
                "Funciones avanzadas (auth, cámara, pagos, etc.)",
                "Backend/API personalizada incluida",
                "Publicación en Google Play o App Store",
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan premium de desarrollo móvil."),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the premium mobile development plan."),
        },
    },
};
