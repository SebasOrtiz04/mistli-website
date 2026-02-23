import React from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { baseWhats } from '../../../constants';
import CustomButton from '../../../components/utils/CustomButton';

interface FrontendDevSectionProps {
  className?: string;
}

const FrontendDevSection: React.FC<FrontendDevSectionProps> = ({ className = '' }) => {
  const { t } = useTranslation();

    const cards = t('home.frontend.cards', { returnObjects: true }) as { label: string; value: string,icon:string }[];
    const features = t('home.frontend.features', { returnObjects: true }) as { title: string; desc: string }[];


  return (
    <section className={`w-full max-w-6xl mx-auto flex md:h-[100vh] ${className}`}>
      <div className="grid md:grid-cols-2 gap-14 items-center">
        {/* Left – UI preview */}
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="font-semibold text-gray-800">Dashboard</div>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-red-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {cards.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 p-4 hover:shadow-md transition"
              >
                <Icon icon={item.icon} className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="h-28 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 flex items-end gap-2 p-4">
            {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-md bg-blue-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Right – Content */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Icon icon="solar:programming-bold-duotone" />
            {t('home.frontend.badge')}
          </span>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line">
            {t('home.frontend.title')}
          </h2>

          <p className="text-lg text-gray-600">{t('home.frontend.description')}</p>

          <div className="grid gap-4">
            {features.map((item, i) => (
              <div key={i} className="flex gap-3">
                <Icon
                  icon="solar:check-circle-bold"
                  className="w-5 h-5 text-blue-600 mt-1"
                />
                <div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <CustomButton href={baseWhats + encodeURIComponent(t('home.frontend.whatsappMsg'))} color='green'  icon="mdi:whatsapp" label={t('home.frontend.cta')} />

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="text-blue-600" />
            {t('home.frontend.footer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FrontendDevSection;
