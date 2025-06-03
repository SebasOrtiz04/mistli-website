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
            ES: "Automatización Empresarial",
            EN: "Business Automation",
        },
        description: {
            ES: "Automatización robusta con backend personalizado y análisis de datos.",
            EN: "Robust automation with custom backend and data analysis.",
        },
        cost: {
            ES: `${formatearDinero(4500)} MXN`,
            EN: `${formatearDinero(225)} USD`,
        },
        items: {
            EN: [
                "Custom Python/Flask automation scripts with async processing",
                "Database integration (MySQL, PostgreSQL, MongoDB) + Firebase",
                "Intelligent chatbots (Telegram, Slack integration)",
                "Email & notification automation with custom logic",
                "Data processing & automated reporting (Excel, PDF, CSV)",
                "Up to 3 automated workflows with error handling",
                "Basic web dashboard for monitoring (React/Next.js)"
            ],
            ES: [
                "Scripts de automatización personalizados en Python/Flask con procesamiento asíncrono",
                "Integración con bases de datos (MySQL, PostgreSQL, MongoDB) + Firebase",
                "Chatbots inteligentes (integración Telegram, Slack)",
                "Automatización de correos y notificaciones con lógica personalizada",
                "Procesamiento de datos y reportes automatizados (Excel, PDF, CSV)",
                "Hasta 3 flujos automatizados con manejo de errores",
                "Dashboard web básico para monitoreo (React/Next.js)"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan de automatización empresarial para mi negocio"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the business automation plan for my company."),
        },
    },
    standard: {
        popular: true,
        title: {
            ES: "Automatización con IA",
            EN: "AI-Powered Automation",
        },
        description: {
            ES: "Automatización inteligente con modelos de ML y sistemas completos.",
            EN: "Intelligent automation with ML models and complete systems.",
        },
        cost: {
            ES: `${formatearDinero(8500)} MXN`,
            EN: `${formatearDinero(425)} USD`,
        },
        items: {
            EN: [
                "Full-stack automation system (React/Next.js frontend + Python/Flask backend)",
                "Advanced chatbots (Telegram, Slack, Azure Teams integration)",
                "Custom ML models for classification/regression tasks",
                "Enterprise API integrations (CRM, ERP, external services)",
                "Real-time data processing with Firebase + traditional databases",
                "Intelligent document processing and data extraction",
                "Up to 7 complex automated workflows with async processing",
                "Professional web dashboard with analytics and bot management"
            ],
            ES: [
                "Sistema de automatización full-stack (React/Next.js frontend + Python/Flask backend)",
                "Chatbots avanzados (integración Telegram, Slack, Azure Teams)",
                "Modelos de ML personalizados para clasificación/regresión",
                "Integraciones avanzadas con APIs empresariales (CRM, ERP, servicios externos)",
                "Procesamiento de datos en tiempo real con Firebase + bases de datos tradicionales",
                "Procesamiento inteligente de documentos y extracción de datos",
                "Hasta 7 flujos de automatización complejos con procesamiento asíncrono",
                "Dashboard web profesional con analytics y gestión de bots"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan de automatización con IA para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the AI-powered automation plan for my company."),
        },
    },
    premium: {
        popular: false,
        title: {
            ES: "Automatización Empresarial Elite",
            EN: "Elite Enterprise Automation",
        },
        description: {
            ES: "Ecosistema completo de automatización con IA avanzada y aplicaciones móviles.",
            EN: "Complete automation ecosystem with advanced AI and mobile applications.",
        },
        cost: {
            ES: `${formatearDinero(18000)} MXN`,
            EN: `${formatearDinero(900)} USD`,
        },
        items: {
            EN: [
                "Enterprise automation platform (multi-technology: Next.js, Flask, aiohttp)",
                "Advanced AI system with LLM integration and custom training",
                "Multi-platform chatbot ecosystem (Telegram, Slack, Azure Teams)",
                "Full-stack web application + React Native mobile app",
                "Enterprise cloud architecture (Firebase, AWS Cognito, traditional DBs)",
                "Desktop application for advanced control (if needed)",
                "Unlimited automation workflows with ML optimization + async processing",
                "Professional LaTeX documentation, training, and 3-month support",
                "Cloud deployment with CI/CD pipeline and bot orchestration"
            ],
            ES: [
                "Plataforma de automatización empresarial (multi-tecnología: Next.js, Flask, aiohttp)",
                "Sistema de IA avanzado con integración LLM y entrenamiento personalizado",
                "Ecosistema multi-plataforma de chatbots (Telegram, Slack, Azure Teams)",
                "Aplicación web full-stack + app móvil React Native",
                "Arquitectura empresarial en la nube (Firebase, AWS Cognito, BDs tradicionales)",
                "Aplicación de escritorio para control avanzado (si se requiere)",
                "Flujos de automatización ilimitados con optimización ML + procesamiento asíncrono",
                "Documentación profesional (LaTeX), capacitación y soporte 3 meses",
                "Despliegue en la nube con pipeline CI/CD y orquestación de bots"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el plan de automatización empresarial elite para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the elite enterprise automation plan for my company."),
        },
    },
};

export const PLANSFULL: Plans = {
    basic: {
        popular: true,
        title: {
            ES: "Desarrollo Web Profesional",
            EN: "Professional Web Development",
        },
        description: {
            ES: "Sitio web dinámico con backend robusto y base de datos.",
            EN: "Dynamic website with robust backend and database.",
        },
        cost: {
            ES: `${formatearDinero(5500)} MXN`,
            EN: `${formatearDinero(275)} USD`,
        },
        items: {
            EN: [
                "Next.js/React frontend with responsive design",
                "Python Flask/aiohttp backend with async capabilities",
                "Database integration (MySQL/PostgreSQL/MongoDB) + Firebase",
                "AWS Cognito authentication + custom user management",
                "Contact forms with validation and email notifications",
                "Admin panel with role-based authentication",
                "Up to 5 dynamic pages + professional hosting setup"
            ],
            ES: [
                "Frontend en Next.js/React con diseño responsivo",
                "Backend en Python Flask/aiohttp con capacidades asíncronas",
                "Integración con base de datos (MySQL/PostgreSQL/MongoDB) + Firebase",
                "Autenticación AWS Cognito + gestión personalizada de usuarios",
                "Formularios de contacto con validación y notificaciones por email",
                "Panel administrativo con autenticación basada en roles",
                "Hasta 5 páginas dinámicas + configuración profesional de hosting"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el desarrollo web profesional para mi negocio"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring professional web development for my business."),
        },
    },
    standard: {
        popular: false,
        title: {
            ES: "Aplicación Web Completa",
            EN: "Complete Web Application",
        },
        description: {
            ES: "Sistema web full-stack con funcionalidades avanzadas y múltiples integraciones.",
            EN: "Full-stack web system with advanced features and multiple integrations.",
        },
        cost: {
            ES: `${formatearDinero(12000)} MXN`,
            EN: `${formatearDinero(600)} USD`,
        },
        items: {
            EN: [
                "Full-stack web application (Next.js + Python Flask/aiohttp backend)",
                "Multi-database support with Firebase + traditional databases",
                "Advanced authentication (AWS Cognito + custom role management)",
                "Multiple API integrations (payments, CRM, external services)",
                "Real-time features (WebSocket, notifications, live updates)",
                "Chatbot integration (Telegram, Slack for customer support)",
                "Advanced admin dashboard with analytics and async processing",
                "Professional deployment with SSL, CDN and monitoring"
            ],
            ES: [
                "Aplicación web full-stack (Next.js + backend Python Flask/aiohttp)",
                "Soporte multi-base de datos con Firebase + bases de datos tradicionales",
                "Autenticación avanzada (AWS Cognito + gestión personalizada de roles)",
                "Múltiples integraciones con APIs (pagos, CRM, servicios externos)",
                "Funcionalidades en tiempo real (WebSocket, notificaciones, actualizaciones live)",
                "Integración de chatbots (Telegram, Slack para soporte al cliente)",
                "Dashboard administrativo avanzado con analytics y procesamiento asíncrono",
                "Despliegue profesional con SSL, CDN y monitoreo"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar la aplicación web completa para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the complete web application for my company."),
        },
    },
    premium: {
        popular: false,
        title: {
            ES: "Ecosistema Digital Empresarial",
            EN: "Enterprise Digital Ecosystem",
        },
        description: {
            ES: "Plataforma empresarial completa con web, móvil, escritorio y documentación profesional.",
            EN: "Complete enterprise platform with web, mobile, desktop, and professional documentation.",
        },
        cost: {
            ES: `${formatearDinero(22000)} MXN`,
            EN: `${formatearDinero(1100)} USD`,
        },
        items: {
            EN: [
                "Enterprise web application (Next.js + advanced backend architecture)",
                "React Native mobile app with Firebase integration",
                "Desktop application for advanced management (if needed)",
                "Multi-cloud architecture (Firebase, AWS Cognito, traditional databases)",
                "Advanced integrations, custom APIs and chatbot ecosystem",
                "Professional LaTeX documentation and user manuals",
                "Enterprise cloud deployment with CI/CD, CDN and monitoring",
                "Multi-platform chatbots (Telegram, Slack, Azure Teams)",
                "3 months technical support and comprehensive training"
            ],
            ES: [
                "Aplicación web empresarial (Next.js + arquitectura backend avanzada)",
                "App móvil React Native con integración Firebase",
                "Aplicación de escritorio para gestión avanzada (si se requiere)",
                "Arquitectura multi-nube (Firebase, AWS Cognito, bases de datos tradicionales)",
                "Integraciones avanzadas, APIs personalizadas y ecosistema de chatbots",
                "Documentación profesional en LaTeX y manuales de usuario",
                "Despliegue empresarial en la nube con CI/CD, CDN y monitoreo",
                "Chatbots multi-plataforma (Telegram, Slack, Azure Teams)",
                "3 meses de soporte técnico y capacitación integral"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el ecosistema digital empresarial para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the enterprise digital ecosystem for my company."),
        },
    },
};

export const PLANSIA: Plans = {
    basic: {
        popular: false,
        title: {
            ES: "IA Aplicada al Negocio",
            EN: "Applied Business AI",
        },
        description: {
            ES: "Modelos de IA personalizados con entrenamiento específico para tu industria.",
            EN: "Custom AI models with industry-specific training.",
        },
        cost: {
            ES: `${formatearDinero(7500)} MXN`,
            EN: `${formatearDinero(375)} USD`,
        },
        items: {
            EN: [
                "Custom ML model (classification/regression) trained with your data",
                "Data preprocessing and feature engineering",
                "Model evaluation and performance optimization",
                "Python API for model integration",
                "Basic web interface for model interaction",
                "Training documentation and model interpretation"
            ],
            ES: [
                "Modelo de ML personalizado (clasificación/regresión) entrenado con tus datos",
                "Preprocesamiento de datos e ingeniería de características",
                "Evaluación del modelo y optimización de rendimiento",
                "API en Python para integración del modelo",
                "Interfaz web básica para interacción con el modelo",
                "Documentación de entrenamiento e interpretación del modelo"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar IA aplicada al negocio para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring applied business AI for my company."),
        },
    },
    standard: {
        popular: false,
        title: {
            ES: "Sistema IA Integrado",
            EN: "Integrated AI System",
        },
        description: {
            ES: "Plataforma completa con múltiples modelos de IA y sistema de gestión avanzado.",
            EN: "Complete platform with multiple AI models and advanced management system.",
        },
        cost: {
            ES: `${formatearDinero(15000)} MXN`,
            EN: `${formatearDinero(750)} USD`,
        },
        items: {
            EN: [
                "Multiple AI models (classification, regression, NLP)",
                "Full-stack application with React frontend",
                "Advanced data pipeline and model management",
                "LLM integration for intelligent text processing",
                "Real-time predictions and batch processing",
                "Advanced analytics dashboard",
                "Model versioning and A/B testing capabilities"
            ],
            ES: [
                "Múltiples modelos de IA (clasificación, regresión, NLP)",
                "Aplicación full-stack con frontend React",
                "Pipeline avanzado de datos y gestión de modelos",
                "Integración LLM para procesamiento inteligente de texto",
                "Predicciones en tiempo real y procesamiento por lotes",
                "Dashboard avanzado de analytics",
                "Versionado de modelos y capacidades de A/B testing"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el sistema IA integrado para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the integrated AI system for my company."),
        },
    },
    premium: {
        popular: true,
        title: {
            ES: "IA Empresarial Avanzada",
            EN: "Advanced Enterprise AI",
        },
        description: {
            ES: "Ecosistema completo de IA con modelos avanzados, aplicaciones multi-plataforma y soporte continuo.",
            EN: "Complete AI ecosystem with advanced models, multi-platform applications and continuous support.",
        },
        cost: {
            ES: `${formatearDinero(25000)} MXN`,
            EN: `${formatearDinero(1250)} USD`,
        },
        items: {
            EN: [
                "Advanced AI platform (computer vision, NLP, recommendation systems)",
                "Custom LLM fine-tuning for domain-specific tasks",
                "Multi-platform deployment (web, mobile, desktop)",
                "Advanced model monitoring and continuous learning",
                "Enterprise database integration (SQL Server, PostgreSQL, MongoDB)",
                "Professional LaTeX documentation and research reports",
                "6 months support with model updates and optimization",
                "Custom training workshops for your team"
            ],
            ES: [
                "Plataforma avanzada de IA (visión por computadora, NLP, sistemas de recomendación)",
                "Fine-tuning personalizado de LLM para tareas específicas del dominio",
                "Despliegue multi-plataforma (web, móvil, escritorio)",
                "Monitoreo avanzado de modelos y aprendizaje continuo",
                "Integración con bases de datos empresariales (SQL Server, PostgreSQL, MongoDB)",
                "Documentación profesional en LaTeX y reportes de investigación",
                "6 meses de soporte con actualizaciones y optimización de modelos",
                "Talleres de capacitación personalizados para tu equipo"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar IA empresarial avanzada para mi empresa"),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring advanced enterprise AI for my company."),
        },
    },
};

export const PLANSMOBILE: Plans = {
    basic: {
        popular: true,
        title: {
            ES: "App Móvil Profesional",
            EN: "Professional Mobile App",
        },
        description: {
            ES: "Aplicación React Native con backend y funcionalidades avanzadas.",
            EN: "React Native application with backend and advanced features.",
        },
        cost: {
            ES: `${formatearDinero(8500)} MXN`,
            EN: `${formatearDinero(425)} USD`,
        },
        items: {
            EN: [
                "React Native app with Firebase backend integration",
                "AWS Cognito authentication + custom user management",
                "Advanced offline capabilities with data synchronization",
                "Up to 8 screens with smooth navigation and async operations",
                "Multiple API integrations and real-time features",
                "Professional UI/UX design with modern patterns",
                "Push notifications and background processing"
            ],
            ES: [
                "App React Native con integración backend Firebase",
                "Autenticación AWS Cognito + gestión personalizada de usuarios",
                "Capacidades offline avanzadas con sincronización de datos",
                "Hasta 8 pantallas con navegación fluida y operaciones asíncronas",
                "Múltiples integraciones con APIs y funcionalidades en tiempo real",
                "Diseño UI/UX profesional con patrones modernos",
                "Notificaciones push y procesamiento en segundo plano"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el desarrollo de app móvil profesional."),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring professional mobile app development."),
        },
    },
    standard: {
        popular: false,
        title: {
            ES: "App Empresarial Completa",
            EN: "Complete Enterprise App",
        },
        description: {
            ES: "Aplicación móvil empresarial con funcionalidades avanzadas y publicación en tiendas.",
            EN: "Enterprise mobile application with advanced features and store publishing.",
        },
        cost: {
            ES: `${formatearDinero(15000)} MXN`,
            EN: `${formatearDinero(750)} USD`,
        },
        items: {
            EN: [
                "Advanced React Native app with Firebase + AWS Cognito",
                "Full Flask/aiohttp backend with async processing",
                "Real-time features (chat, notifications, live updates)",
                "Advanced integrations (payments, maps, camera, chatbots)",
                "Multi-database support (Firebase + traditional databases)",
                "Publishing in Google Play and App Store",
                "Admin web dashboard (Next.js) for comprehensive app management",
                "3 months post-launch support with feature updates"
            ],
            ES: [
                "App avanzada React Native con Firebase + AWS Cognito",
                "Backend completo Flask/aiohttp con procesamiento asíncrono",
                "Funcionalidades en tiempo real (chat, notificaciones, actualizaciones live)",
                "Integraciones avanzadas (pagos, mapas, cámara, chatbots)",
                "Soporte multi-base de datos (Firebase + bases de datos tradicionales)",
                "Publicación en Google Play y App Store",
                "Dashboard web administrativo (Next.js) para gestión integral de la app",
                "3 meses de soporte post-lanzamiento con actualizaciones de funcionalidades"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar la app empresarial completa."),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the complete enterprise app."),
        },
    },
    premium: {
        popular: false,
        title: {
            ES: "Ecosistema Móvil con IA",
            EN: "AI-Powered Mobile Ecosystem",
        },
        description: {
            ES: "Aplicación móvil avanzada con IA integrada, backend empresarial y ecosistema completo.",
            EN: "Advanced mobile app with integrated AI, enterprise backend and complete ecosystem.",
        },
        cost: {
            ES: `${formatearDinero(25000)} MXN`,
            EN: `${formatearDinero(1250)} USD`,
        },
        items: {
            EN: [
                "Advanced React Native app with AI integration + Firebase/Cognito",
                "Custom ML models for mobile-specific features",
                "Enterprise backend (Flask/aiohttp) with multi-database architecture",
                "Companion Next.js web application and desktop tools",
                "Multi-platform chatbot integration (Telegram, Slack, Azure Teams)",
                "Advanced real-time features and intelligent offline capabilities",
                "Professional LaTeX documentation and technical specifications",
                "Store publishing with marketing assets and ASO optimization",
                "6 months support with AI model updates and feature enhancements"
            ],
            ES: [
                "App avanzada React Native con integración de IA + Firebase/Cognito",
                "Modelos de ML personalizados para funcionalidades específicas móviles",
                "Backend empresarial (Flask/aiohttp) con arquitectura multi-base de datos",
                "Aplicación web complementaria Next.js y herramientas de escritorio",
                "Integración de chatbots multi-plataforma (Telegram, Slack, Azure Teams)",
                "Funcionalidades avanzadas en tiempo real y capacidades offline inteligentes",
                "Documentación profesional en LaTeX y especificaciones técnicas",
                "Publicación en tiendas con assets de marketing y optimización ASO",
                "6 meses de soporte con actualizaciones de modelos IA y mejoras de funcionalidades"
            ],
        },
        textButton: {
            EN: "WhatsApp",
            ES: "WhatsApp",
        },
        whatsAppText: {
            ES: baseWhats + encodeURIComponent("Hola, me interesa contratar el ecosistema móvil con IA."),
            EN: baseWhats + encodeURIComponent("Hello, I am interested in hiring the AI-powered mobile ecosystem."),
        },
    },
};