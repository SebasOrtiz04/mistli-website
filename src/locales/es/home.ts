import { formatearDinero } from "../../helpers/uiAmounts.ts";

export default {
  hero: {
    msgwhats1: "Hola, me interesa una solución personalizada para mi empresa",
    title: "Una solución de ingeniería del futuro para negocios del futuro",
    descripcion: "Desarrollo de software en la nube, escalable y a medida para impulsar tu empresa.",
    contacto: "Contáctanos",
    servicios: "Ver Servicios"
  },
  backend: {
    badge: 'Desarrollo de infraestructura digital',
    title: 'Backends y APIs escalables para tu negocio',
    description:
      'Construimos la columna vertebral de tu aplicación con arquitecturas modernas, bases de datos optimizadas y APIs seguras que conectan todos tus servicios.',
    whatsappMsg:
      'Hola, quiero información sobre desarrollo de backends y APIs',
    redirecting: 'Redirigiendo…',
    cta: 'Contáctanos por WhatsApp',
    features: [
      {
        icon: 'solar:server-bold-duotone',
        title: 'Backends robustos',
        description:
          'Arquitecturas escalables, seguras y listas para alto tráfico.',
      },
      {
        icon: 'solar:code-bold-duotone',
        title: 'APIs personalizadas',
        description:
          'REST o GraphQL diseñadas exactamente para tu producto.',
      },
    ]
  },
  excel: {
    badge: 'Automatización de reportes y dashboards',
    title: 'Reportes y dashboards a partir de tus datos',
    description:
      'Procesamos tus datos desde CSV, Excel o bases de datos para generar documentos profesionales y dashboards interactivos que impulsan decisiones claras.',
    whatsappMsg:
      'Hola, quiero información sobre la generación de reportes y dashboards',
    redirecting: 'Redirigiendo…',
    cta: 'Contáctanos por WhatsApp',
    features: [
      {
        icon: 'solar:document-text-bold-duotone',
        title: 'Reportes automatizados',
        description:
          'Documentos PDF o Word generados automáticamente desde tus datos.',
      },
      {
        icon: 'solar:chart-2-bold-duotone',
        title: 'Dashboards interactivos',
        description:
          'Visualización en tiempo real con métricas clave y gráficas claras.',
      },
    ],
  },
  frontend: {
    whatsappMsg: 'Hola! Me interesa desarrollar una interfaz web. Mi proyecto es: ',
    badge: 'UX / UI & Frontend',
    title: 'Interfaces web modernas\nque sí convierten',
    description:
      'Diseñamos y desarrollamos interfaces enfocadas en experiencia de usuario, rendimiento y resultados reales de negocio.',
    cards: [
      { label: 'Usuarios activos', value: '2,430', icon: 'mdi:account' },
      { label: 'Conversiones', value: '18.2%', icon: 'mdi:chart-line' },
      { label: 'Ventas', value: '$124K', icon: 'mdi:cash' },
      { label: 'Performance', value: '99.9%', icon: 'mdi:speedometer' },
    ],
    features: [
      {
        title: 'UX orientado a conversión',
        desc: 'Diseño pensado para guiar al usuario y aumentar ventas',
      },
      {
        title: 'UI limpia y profesional',
        desc: 'Estética moderna, clara y alineada a tu marca',
      },
      {
        title: 'Responsive y accesible',
        desc: 'Perfecto en móvil, tablet y desktop',
      },
      {
        title: 'Stack moderno',
        desc: 'React, Next.js, Tailwind, performance first',
      },
    ],
    cta: 'Cotizar en WhatsApp',
    footer: 'Diseño escalable y listo para producción',
  },
  ia: {
    whatsappMsg:
      'Hola! Me interesa implementar soluciones de IA y Machine Learning en mi proyecto: ',
    badge: 'Inteligencia Artificial & Machine Learning',
    title: 'Modelos predictivos\ny sistemas inteligentes reales',
    description:
      'Diseñamos e implementamos modelos de Machine Learning y Deep Learning adaptados al problema, usando desde algoritmos clásicos hasta LLMs de última generación.',
    metrics: [
      { label: 'Modelos entrenados', value: '47' },
      { label: 'Precisión promedio', value: '97.1%' },
      { label: 'Latencia', value: '120ms' },
      { label: 'Ahorro operativo', value: '-38%' },
    ],
    pipeline: ['Datos', 'Features', 'Modelo', 'Producción'],
    techStack:
      'Redes neuronales · Árboles de decisión · SVM · Ensembles · LLM',
    services: [
      {
        title: 'Redes neuronales',
        desc: 'MLP, CNN, RNN y modelos profundos para clasificación, visión y series temporales',
      },
      {
        title: 'Árboles de decisión y ensembles',
        desc: 'Random Forest, Gradient Boosting, XGBoost, LightGBM',
      },
      {
        title: 'Support Vector Machines (SVM)',
        desc: 'Clasificación y regresión robusta en espacios complejos',
      },
      {
        title: 'Modelos estadísticos y clásicos',
        desc: 'Regresión, clustering, reducción de dimensionalidad',
      },
      {
        title: 'LLM & NLP avanzado',
        desc: 'Procesamiento de lenguaje natural, agentes y chatbots',
      },
    ],
    cta: 'Cotizar solución de IA / ML',
    footer: 'Modelos explicables, optimizados y listos para producción',
    header: 'AI / ML Analytics',
  },
  scripts:{
    badge: 'Automatización de Tareas',
    title: 'Scripts para automatizar tus tareas repetitivas',
    description:
      'Desarrollamos scripts personalizados en Python que automatizan las tareas que consumen tu tiempo. Desde organización de archivos hasta procesamiento de datos, eliminamos el trabajo manual.',
    features: [
      {
        title: 'Organización automática de archivos',
        desc: 'Clasifica, renombra y ordena documentos automáticamente',
      },
      {
        title: 'Procesamiento de datos',
        desc: 'Extrae, transforma y analiza información de múltiples fuentes',
      },
      {
        title: 'Fácil de ejecutar',
        desc: 'Scripts simples que funcionan con un solo clic',
      },
    ],
    cta: 'Cotizar en WhatsApp',
    footer: 'Scripts eficientes y fáciles de usar',
    terminal: 'Escribiendo automatización...',
    waMessage:
      'Hola! Me interesa un script de automatización. Mi proceso es el siguiente: ',
    code: [
      '# Script de Automatización de Tareas',
      'import pandas as pd',
      'import requests',
      'from datetime import datetime',
      'from pathlib import Path',
      '',
      'class TaskAutomation:',
      '    def __init__(self):',
      '        self.today = datetime.now()',
      '        ',
      '    def process_excel_reports(self, file_path):',
      '        """Procesa reportes de Excel automáticamente"""',
      '        df = pd.read_excel(file_path)',
      '        df_filtered = df[df["status"] == "active"]',
      '        return df_filtered.groupby("category").sum()',
      '        ',
      '    def send_notifications(self, data):',
      '        """Envía notificaciones automáticas"""',
      '        for item in data:',
      '            message = f"Tarea completada: {item}"',
      '            self.notify_user(message)',
      '',
      'if __name__ == "__main__":',
      '    automation = TaskAutomation()',
      '    report = automation.process_excel_reports("data.xlsx")',
      '    automation.send_notifications(report)',
    ],
  },
  pricing: {
    disclaimer: "*Precio de desarrollo únicamente. Costos adicionales por separado: APIs de IA, servicios cloud, hardware especializado (GPU), integración con tus APIs/servicios existentes (CRM, ERP, sistemas de pago, etc.) y mantenimiento técnico según uso real.",
    areas: {
      IA: "IA",
      Automation: "Automatización",
      Fullstack: "FullStack",
      Mobile: "Móvil"
    },
    plansauto: {
      basic: {
        title: "Automatización Esencial",
        description: "Reduce tareas manuales y errores para que tu negocio opere sin fricción.",
        cost: `${formatearDinero(325)} USD`,
        items: [
          "Hasta 2 procesos automatizados",
          "Conexión con 1 sistema o base de datos",
          "Reportes automáticos (Excel o PDF)",
          "Panel básico de monitoreo",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa el plan de Automatización Esencial."
      },
      standard: {
        title: "Automatización Inteligente",
        description: "Automatiza procesos clave y ahorra horas de trabajo humano todos los días.",
        cost: `${formatearDinero(14500)} MXN`,
        items: [
          "Hasta 5 flujos de automatización",
          "Integración con CRM / ERP",
          "Procesamiento inteligente de documentos",
          "Dashboard profesional",
          "Soporte y ajustes el primer mes",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa el plan de Automatización Inteligente."
      },
      premium: {
        title: "Automatización Empresarial Avanzada",
        description: "Transforma la operación completa de tu empresa con automatización e IA a medida.",
        cost: "Desde $35,000 MXN",
        items: [
          "Automatización empresarial personalizada",
          "IA entrenada con datos del negocio",
          "Integración total de sistemas",
          "Aplicación web y/o móvil",
          "Infraestructura escalable",
          "Capacitación y soporte continuo",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, quiero cotizar Automatización Empresarial Avanzada."
      }
    },
    plansfull: {
      basic: {
        title: "Web Profesional",
        description: "Presencia digital funcional lista para operar.",
        cost: `${formatearDinero(6000)} MXN`,
        items: [
          "Sitio web responsivo",
          "Formularios funcionales",
          "Panel básico",
          "Configuración de hosting",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa el plan Web Profesional.",
      },

      standard: {
        title: "Sistema Web de Negocio",
        description: "Sistema web completo para operar y escalar.",
        cost: `${formatearDinero(16000)} MXN`,
        items: [
          "Sistema web full-stack",
          "Usuarios y roles",
          "Integraciones (pagos, APIs)",
          "Funciones en tiempo real",
          "Dashboard administrativo",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa el Sistema Web de Negocio.",
      },

      premium: {
        title: "Plataforma Empresarial",
        description: "Plataforma digital lista para crecer a nivel empresa.",
        cost: "Desde $40,000 MXN",
        items: [
          "Web + móvil",
          "Arquitectura empresarial",
          "Seguridad y monitoreo",
          "CI/CD y escalabilidad",
          "Soporte continuo",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, quiero cotizar una Plataforma Empresarial.",
      },
    },

    plansia: {
      basic: {
        title: "IA para un Problema Específico",
        description: "Un modelo de IA resolviendo un problema real.",
        cost: `${formatearDinero(9500)} MXN`,
        items: [
          "Un modelo de IA",
          "Entrenamiento con tus datos",
          "API para integración",
          "Documentación básica",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa IA para un problema específico.",
      },

      standard: {
        title: "Sistema de IA Operativo",
        description: "IA integrada directamente en la operación del negocio.",
        cost: `${formatearDinero(22000)} MXN`,
        items: [
          "Múltiples modelos de IA",
          "Dashboard y métricas",
          "Integración en sistemas",
          "Versionado y monitoreo",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa el Sistema de IA Operativo.",
      },

      premium: {
        title: "IA Empresarial Estratégica",
        description: "IA como ventaja competitiva real.",
        cost: "Desde $60,000 MXN",
        items: [
          "IA avanzada (LLM, visión, NLP)",
          "Aprendizaje continuo",
          "Soporte 6 meses",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, quiero cotizar IA Empresarial Estratégica.",
      },
    },

    plansmobile: {
      basic: {
        title: "App Móvil Profesional",
        description: "Aplicación móvil lista para operar.",
        cost: `${formatearDinero(10000)} MXN`,
        items: [
          "App React Native",
          "Autenticación y backend",
          "Hasta 6 pantallas",
          "Notificaciones push",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa el plan App Móvil Profesional.",
      },

      standard: {
        title: "App Empresarial Completa",
        description: "Aplicación móvil integrada al negocio.",
        cost: `${formatearDinero(18000)} MXN`,
        items: [
          "App avanzada",
          "Backend empresarial",
          "Funciones en tiempo real",
          "Dashboard web administrativo",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, me interesa la App Empresarial Completa.",
      },

      premium: {
        title: "Ecosistema Móvil con IA",
        description: "Ecosistema móvil avanzado con IA integrada.",
        cost: "Desde $45,000 MXN",
        items: [
          "App con IA",
          "Backend empresarial",
          "Web complementaria",
          "Soporte 6 meses",
        ],
        textButton: "Cotizar",
        whatsAppText: "Hola, quiero cotizar el Ecosistema Móvil con IA.",
      },
    },

  },
  reviews:{
    title:"Reseñas de Clientes Reales",
    text1: "Me encantó mi página web orientada a mi negocio.",
    text2: "La inteligencia artificial que hicieron para poder clasificar mis datos sobrepasó mis expectativas.",
    text3: "El algoritmo que desarrollaron para mi trabajo es exactamente lo que necesitaba para cumplir mi meta laboral."
  }
};
