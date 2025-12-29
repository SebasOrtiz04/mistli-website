// locales/es/home.ts
export default {
  hero:{
    msgwhats1:"Hola, me interesa una solución personalizada para mi empresa",
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
    excel:{
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
    frontend:{
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
    ia:{
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
    pricing:{
      disclaimer:"*Precio de desarrollo únicamente. Costos adicionales por separado: APIs de IA, servicios cloud, hardware especializado (GPU), integración con tus APIs/servicios existentes (CRM, ERP, sistemas de pago, etc.) y mantenimiento técnico según uso real.",
      areas: {
        IA: "IA",
        Automation: "Automatización",
        Fullstack: "FullStack",
        Mobile: "Móvil"}
    }
};
