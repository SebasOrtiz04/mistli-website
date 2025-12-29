import React from 'react';
import { Icon } from '@iconify/react';
import { baseWhats } from '../../../constants';
import { useTranslation } from 'react-i18next';


interface AISectionProps {
  className?: string;
}
const AISection: React.FC<AISectionProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const metrics = t('home.ia.metrics', { returnObjects: true }) as { label: string; value: string }[];
  const services = t('home.ia.services', { returnObjects: true }) as { title: string; desc: string }[];
  const pipeline = t('home.ia.pipeline', { returnObjects: true }) as string[];
  const handleRequestQuote = () => {
    const message = encodeURIComponent(t('home.ia.whatsappMsg'));
    window.open(`${baseWhats}${message}`, '_blank');
  };

  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-20 ${className}`}>
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold">{t('home.ia.header')}</span>
            <Icon icon="mdi:brain" className="w-6 h-6 text-purple-400" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {metrics.map((item, i) => (
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
            {pipeline.map((step, i) => (
              <div key={i} className="rounded-lg bg-white/10 py-3">
                {step}
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-400">
            {t('home.ia.techStack')}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
            <Icon icon="mdi:chart-bell-curve" />
            {t('home.ia.badge')}
          </span>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line">
            {t('home.ia.title')}
          </h2>

          <p className="text-lg text-gray-600">{t('home.ia.description')}</p>

          <div className="grid gap-4">
            {services.map((item, i) => (
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
            {t('home.ia.cta')}
          </button>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="text-purple-600" />
            {t('home.ia.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AISection;
