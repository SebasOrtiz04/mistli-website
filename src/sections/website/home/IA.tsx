import React from 'react';
import { Icon } from '@iconify/react';
import { baseWhats } from '../../../constants';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/utils/CustomButton';


interface AISectionProps {
  className?: string;
}

const AISection: React.FC<AISectionProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const metrics = t('home.ia.metrics', { returnObjects: true }) as { label: string; value: string }[];
  const services = t('home.ia.services', { returnObjects: true }) as { title: string; desc: string }[];
  const pipeline = t('home.ia.pipeline', { returnObjects: true }) as string[];

  return (
    <section className={`w-full max-w-7xl mx-auto px-6 py-28 ${className}`}>
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* Left */}
        <div className="relative bg-[#0f172a] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-400 tracking-wide">{t('home.ia.header')}</span>
            <Icon icon="mdi:brain" className="w-5 h-5 text-purple-500" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {metrics.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur"              >
                  <div className={`text-2xl font-semibold 
                    ${item.label.includes('Precisión')
                      ? 'text-green-400'
                      : item.label.includes('Latencia')
                        ? 'text-blue-400'
                        : item.label.includes('Ahorro')
                          ? 'text-purple-400'
                          : 'text-white'
                    }
                    `}>
                    {item.value}
                  </div>                
                <div className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-center mt-6">
            {pipeline.map((step, i) => (
              <div key={i} className="rounded-md bg-white/10 py-2 text-gray-300 p-3">
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">            <Icon icon="mdi:chart-bell-curve" />
            {t('home.ia.badge')}
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {t('home.ia.title')}
          </h2>

          <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">{t('home.ia.description')}</p>

          <div className="grid gap-4">
            {services.map((item, i) => (
              <div key={i} className="flex gap-3">
                <Icon
                  icon="solar:check-circle-bold"
                  className="w-5 h-5 text-purple-500 mt-1"
                />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRequestQuote}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl
            bg-green-500 hover:bg-green-600 text-white font-semibold text-sm
            transition-all shadow-md hover:shadow-lg"
          >
            <Icon icon="mdi:whatsapp" className="w-5 h-5" />
            {t('home.ia.cta')}
          </button>

          <p className="text-xs text-gray-500 flex items-center gap-2 mt-4">
            <Icon icon="solar:shield-check-bold" className="text-purple-600" />
            {t('home.ia.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AISection;
