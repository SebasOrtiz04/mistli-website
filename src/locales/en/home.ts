// locales/es/home.ts
export default {
    hero: {
        msgwhats1: "Hello, I'm interested in a customized solution for my company.",
        title: "An engineering solution of the future for businesses of the future",
        subtitle: "Creamos soluciones a medida",
        descripcion: "Cloud-based, scalable, and custom software development to boost your company.",
        contacto: "Contact Us",
        servicios: "View Services"
    },
      backend:{
    badge: 'Digital infrastructure development',
          title: 'Scalable backends and APIs for your business',
          description:
            'We build the backbone of your application with modern architectures, optimized databases and secure APIs that connect all your services.',
          whatsappMsg:
            'Hi, I would like information about backend and API development',
          redirecting: 'Redirecting…',
          cta: 'Contact us on WhatsApp',
          features: [
            {
              icon: 'solar:server-bold-duotone',
              title: 'Robust backends',
              description:
                'Scalable, secure architectures built for high traffic.',
            },
            {
              icon: 'solar:code-bold-duotone',
              title: 'Custom APIs',
              description:
                'REST or GraphQL endpoints tailored to your product.',
            },
          ]
  },
  excel:{
      badge: 'Report & dashboard automation',
      title: 'Reports and dashboards from your data',
      description:
        'We process your data from CSV, Excel or databases to generate professional documents and interactive dashboards.',
      whatsappMsg:
        'Hi, I would like information about report and dashboard generation',
      redirecting: 'Redirecting…',
      cta: 'Contact us on WhatsApp',
      features: [
        {
          icon: 'solar:document-text-bold-duotone',
          title: 'Automated reports',
          description:
            'PDF or Word documents generated automatically from your data.',
        },
        {
          icon: 'solar:chart-2-bold-duotone',
          title: 'Interactive dashboards',
          description:
            'Real-time visualization with key metrics and charts.',
        },
      ],
    },
    frontend:{
          whatsappMsg: 'Hi! I am interested in developing a web interface. My project is: ',
          badge: 'UX / UI & Frontend',
          title: 'Modern web interfaces\nthat actually convert',
          description:
            'We design and develop interfaces focused on user experience, performance and real business results.',
          cards: [
            { label: 'Active users', value: '2,430', icon: 'mdi:account' },
            { label: 'Conversions', value: '18.2%', icon: 'mdi:chart-line' },
            { label: 'Sales', value: '$124K', icon: 'mdi:cash' },
            { label: 'Performance', value: '99.9%', icon: 'mdi:speedometer' },
          ],
          features: [
            {
              title: 'Conversion-oriented UX',
              desc: 'Design focused on guiding users and increasing sales',
            },
            {
              title: 'Clean & professional UI',
              desc: 'Modern, clear aesthetics aligned with your brand',
            },
            {
              title: 'Responsive & accessible',
              desc: 'Perfect on mobile, tablet and desktop',
            },
            {
              title: 'Modern stack',
              desc: 'React, Next.js, Tailwind, performance first',
            },
          ],
          cta: 'Get a WhatsApp quote',
          footer: 'Scalable design ready for production',
        },
    ia:{
          whatsappMsg:
            'Hi! I am interested in implementing AI and Machine Learning solutions in my project: ',
          badge: 'Artificial Intelligence & Machine Learning',
          title: 'Predictive models\nand real intelligent systems',
          description:
            'We design and implement Machine Learning and Deep Learning models tailored to the problem, from classical algorithms to state-of-the-art LLMs.',
          metrics: [
            { label: 'Trained models', value: '47' },
            { label: 'Average accuracy', value: '97.1%' },
            { label: 'Latency', value: '120ms' },
            { label: 'Operational savings', value: '-38%' },
          ],
          pipeline: ['Data', 'Features', 'Model', 'Production'],
          techStack:
            'Neural networks · Decision trees · SVM · Ensembles · LLM',
          services: [
            {
              title: 'Neural networks',
              desc: 'MLP, CNN, RNN and deep models for classification, vision and time series',
            },
            {
              title: 'Decision trees & ensembles',
              desc: 'Random Forest, Gradient Boosting, XGBoost, LightGBM',
            },
            {
              title: 'Support Vector Machines (SVM)',
              desc: 'Robust classification and regression in complex spaces',
            },
            {
              title: 'Statistical & classical models',
              desc: 'Regression, clustering, dimensionality reduction',
            },
            {
              title: 'Advanced LLM & NLP',
              desc: 'Natural language processing, agents and chatbots',
            },
          ],
          cta: 'Get AI / ML solution quote',
          footer: 'Explainable, optimized and production-ready models',
          header: 'AI / ML Analytics',
        },
    pricing:{
        disclaimer:"*Development price only. Additional costs billed separately: AI APIs, cloud services, specialized hardware (GPU), integration with your existing APIs/services (CRM, ERP, payment systems, etc.) and technical maintenance based on actual usage.",
        areas: {
        IA: "AI",
        Automation: "Automation" ,
        Fullstack: "FullStack" ,
        Mobile: "Mobile" 
    }
    }
};
