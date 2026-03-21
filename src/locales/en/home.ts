import { formatearDinero } from "../../helpers/uiAmounts.ts";

export default {
    hero: {
        msgwhats1: "Hello, I'm interested in a customized solution for my company.",
        title: "An engineering solution of the future for businesses of the future",
        subtitle: "Creamos soluciones a medida",
        descripcion: "Cloud-based, scalable, and customized software development to propel your business to the next technological level..",
        contacto: "Contact Us",
        servicios: "View Services"
    },
    backend: {
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
    excel: {
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
                    'PDF or text documents generated dinamically.',
            },
            {
                icon: 'solar:chart-2-bold-duotone',
                title: 'Interactive dashboards',
                description:
                    'Real-time visualization with key metrics.',
            },
        ],
    },
    frontend: {
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
    ia: {
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
    scripts:{
        badge: 'Task Automation',
        title: 'Scripts to automate repetitive tasks',
        description:
          'We build custom Python scripts that automate time-consuming tasks. From file organization to data processing, we eliminate manual work.',
        features: [
          {
            title: 'Automatic file organization',
            desc: 'Automatically classify, rename and organize documents',
          },
          {
            title: 'Data processing',
            desc: 'Extract, transform and analyze data from multiple sources',
          },
          {
            title: 'Easy to run',
            desc: 'Simple scripts that work with a single click',
          },
        ],
        cta: 'Get a Quote on WhatsApp',
        footer: 'Efficient and easy-to-use scripts',
        terminal: 'Writing automation...',
        waMessage:
          'Hi! I am interested in an automation script. My process is the following: ',
        code: [
          '# Task Automation Script',
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
          '        """Automatically process Excel reports"""',
          '        df = pd.read_excel(file_path)',
          '        df_filtered = df[df["status"] == "active"]',
          '        return df_filtered.groupby("category").sum()',
          '        ',
          '    def send_notifications(self, data):',
          '        """Send automatic notifications"""',
          '        for item in data:',
          '            message = f"Task completed: {item}"',
          '            self.notify_user(message)',
          '',
          'if __name__ == "__main__":',
          '    automation = TaskAutomation()',
          '    report = automation.process_excel_reports("data.xlsx")',
          '    automation.send_notifications(report)',
        ],
      },
    pricing: {
        disclaimer: "*Development price only. Additional costs billed separately: AI APIs, cloud services, specialized hardware (GPU), integration with your existing APIs/services (CRM, ERP, payment systems, etc.) and technical maintenance based on actual usage.",
        areas: {
            IA: "AI",
            Automation: "Automation",
            Fullstack: "FullStack",
            Mobile: "Mobile"
        },
        plansauto: {
            basic: {
                title: "Essential Automation",
                description: "Reduce manual tasks and errors so your business runs smoothly.",
                cost: `${formatearDinero(6500)} MXN`,
                items: [
                    "Up to 2 automated processes",
                    "Connection to 1 system or database",
                    "Automatic reports (Excel or PDF)",
                    "Failure alerts",
                    "Basic monitoring dashboard",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in the Essential Automation plan."

            },
            standard: {
                title: "Intelligent Automation",
                description: "Automate key processes and save hours of human work every day.",
                cost: `${formatearDinero(725)} USD`,
                items: [
                    "Up to 5 automation workflows",
                    "CRM / ERP integrations",
                    "Intelligent document processing",
                    "Professional dashboard",
                    "First-month support and adjustments",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in the Intelligent Automation plan."
            },
            premium: {
                title: "Advanced Enterprise Automation",
                description: "Transform your entire business operation with custom automation and AI.",
                cost: "From $1,750 USD",
                items: [
                    "Custom enterprise automation",
                    "AI trained with business data",
                    "Full system integration",
                    "Web and/or mobile applications",
                    "Scalable infrastructure",
                    "Training and continuous support",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'd like a quote for Advanced Enterprise Automation."
            }
        },
        plansfull: {
            basic: {
                title: "Professional Website",
                description: "Functional digital presence ready to operate.",
                cost: `${formatearDinero(300)} USD`,
                items: [
                    "Responsive website",
                    "Functional contact forms",
                    "Basic admin panel",
                    "Hosting setup",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in the Professional Website plan.",
            },

            standard: {
                title: "Business Web System",
                description: "Complete web system to operate and scale.",
                cost: `${formatearDinero(800)} USD`,
                items: [
                    "Full-stack web system",
                    "User and role management",
                    "API and payment integrations",
                    "Real-time features",
                    "Admin dashboard",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in the Business Web System.",
            },

            premium: {
                title: "Enterprise Platform",
                description: "Enterprise-grade platform built to scale.",
                cost: "From $2,000 USD",
                items: [
                    "Web + mobile",
                    "Enterprise architecture",
                    "Security and monitoring",
                    "CI/CD and scalability",
                    "Continuous support",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'd like a quote for an Enterprise Platform.",
            },
        },

        plansia: {
            basic: {
                title: "Targeted Business AI",
                description: "One AI model solving a real problem.",
                cost: `${formatearDinero(475)} USD`,
                items: [
                    "One AI model",
                    "Training with your data",
                    "Integration API",
                    "Basic documentation",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in targeted business AI.",
            },

            standard: {
                title: "Operational AI System",
                description: "AI fully integrated into business operations.",
                cost: `${formatearDinero(1100)} USD`,
                items: [
                    "Multiple AI models",
                    "Dashboard and metrics",
                    "System integration",
                    "Model monitoring",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in the Operational AI System.",
            },

            premium: {
                title: "Strategic Enterprise AI",
                description: "AI as a true competitive advantage.",
                cost: "From $3,000 USD",
                items: [
                    "Advanced AI (LLM, vision, NLP)",
                    "Continuous learning",
                    "Full integration",
                    "6 months support",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'd like a quote for Strategic Enterprise AI.",
            },
        },

        plansmobile: {
            basic: {
                title: "Professional Mobile App",
                description: "Mobile application ready to operate.",
                cost: `${formatearDinero(500)} USD`,
                items: [
                    "React Native app",
                    "Authentication and backend",
                    "Up to 6 screens",
                    "Push notifications",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in the Professional Mobile App.",
            },

            standard: {
                title: "Complete Enterprise App",
                description: "Mobile app fully integrated with the business.",
                cost: `${formatearDinero(900)} USD`,
                items: [
                    "Advanced app",
                    "Enterprise backend",
                    "Real-time features",
                    "Admin web dashboard",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'm interested in the Complete Enterprise App.",
            },

            premium: {
                title: "AI-Powered Mobile Ecosystem",
                description: "Advanced mobile ecosystem with integrated AI.",
                cost: "From $2,250 USD",
                items: [
                    "AI-powered app",
                    "Enterprise backend",
                    "Companion web app",
                    "6 months support",
                ],
                textButton: "Request Quote",
                whatsAppText: "Hello, I'd like a quote for the AI Mobile Ecosystem.",
            },
        },

    },
    reviews:{
        title:"Real Customer Reviews",
        text1: "I loved the website they built for my business.",
        text2: "The AI they built to classify my data exceeded my expectations.",
        text3: "The algorithm they developed was exactly what I needed to reach my professional goals.",
    },
    footer:{
    name:"Mistli",
    slogan:"Taking software engineering to the next level with solutions in AI, Cloud, and automation.",
    links:[
    {"name":"Artificial Intelligence"},
    {"name":"Cloud Computing"},
    {"name":"Fullstack Development"},
    {"name":"IT Consulting"}
    ],
    ley:"© 2024 Mistli Software Agency. All rights reserved.",
    terms:"Terms",
    privacy:"Privacy"
}
};
