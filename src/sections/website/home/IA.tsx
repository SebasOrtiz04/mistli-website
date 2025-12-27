import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface AISectionProps {
  className?: string;
}
type Language = 'ES' | 'EN';

const AISection: React.FC<AISectionProps> = ({ className = '' }) => {
    const idioma = useSelector(
    (state: RootState) => state.locale.language as Language
    );

  const copy = {
    ES: {
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
    EN: {
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
  }[idioma];

  const handleRequestQuote = () => {
    const message = encodeURIComponent(copy.whatsappMsg);
    window.open(`https://wa.me/5212212135220?text=${message}`, '_blank');
  };

  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-20 ${className}`}>
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold">{copy.header}</span>
            <Icon icon="mdi:brain" className="w-6 h-6 text-purple-400" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {copy.metrics.map((item, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 border border-white/10 p-4"
              >
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            {copy.pipeline.map((step, i) => (
              <div key={i} className="rounded-lg bg-white/10 py-3">
                {step}
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-400">
            {copy.techStack}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
            <Icon icon="mdi:chart-bell-curve" />
            {copy.badge}
          </span>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line">
            {copy.title}
          </h2>

          <p className="text-lg text-gray-600">{copy.description}</p>

          <div className="grid gap-4">
            {copy.services.map((item, i) => (
              <div key={i} className="flex gap-3">
                <Icon
                  icon="solar:check-circle-bold"
                  className="w-5 h-5 text-purple-600 mt-1"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRequestQuote}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
              bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg
              transition transform hover:scale-105 hover:shadow-lg"
          >
            <Icon icon="mdi:whatsapp" className="w-5 h-5" />
            {copy.cta}
          </button>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="text-purple-600" />
            {copy.footer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AISection;
