import React from 'react';
import { Icon } from '@iconify/react';
import { baseWhats } from '../../../constants';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../../components/utils/CustomButton';

interface ReportGenerationSectionProps {
  className?: string;
}

const ReportGenerationSection: React.FC<ReportGenerationSectionProps> = ({
  className = '',
}) => {
  const { t } = useTranslation();
  const features = t('home.excel.features', { returnObjects: true }) as { title: string; description: string,icon:string }[];


  return (
    <section
      className={`w-full max-w-6xl mx-auto flex md:h-[100vh] ${className}`}
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <div
            className="
              inline-flex items-center gap-2 px-4 py-2
              bg-gradient-to-r from-blue-50 to-purple-50
              text-blue-700 rounded-full text-sm font-semibold
              border border-blue-100
            "
          >
            <Icon
              icon="solar:document-text-bold-duotone"
              className="w-4 h-4"
            />
            {t('home.excel.badge')}
          </div>

          <h2
            className="
              text-4xl md:text-5xl font-extrabold
              text-gray-900 leading-tight tracking-tight
            "
          >
            {t('home.excel.title')}
          </h2>

          <p className="text-lg text-gray-600 max-w-xl">
            {t('home.excel.description')}
          </p>

          {/* FEATURES */}
          <div className="space-y-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="
                  flex items-start gap-4 p-4
                  bg-white/70 backdrop-blur
                  rounded-xl border border-gray-100
                  shadow-sm hover:shadow-md transition
                "
              >
                <div
                  className="
                    flex-shrink-0 w-11 h-11
                    bg-gradient-to-br from-blue-500 to-purple-500
                    rounded-lg flex items-center justify-center
                  "
                >
                  <Icon
                    icon={feature.icon}
                    className="w-5 h-5 text-white"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <CustomButton href={baseWhats + encodeURIComponent(t('home.excel.whatsappMsg'))}  icon="mdi:whatsapp" label={t('home.excel.cta')} />
        </div>

        {/* RIGHT - VISUAL */}
        <div className="relative h-[420px] flex items-center justify-center">
          {/* Report */}
          <div
            className="
              absolute left-4 top-12 w-56 h-72
              bg-white/80 backdrop-blur
              rounded-xl shadow-xl overflow-hidden
              transform -rotate-3 hover:rotate-0
              transition-all duration-300
            "
          >
            <div className="h-10 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center px-3">
              <Icon
                icon="solar:document-add-bold"
                className="w-5 h-5 text-white"
              />
              <span className="ml-2 text-xs text-white font-medium">
                Reporte.pdf
              </span>
            </div>
            <div className="p-3 space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-2 bg-gray-200 rounded"
                  style={{
                    width: `${Math.random() * 30 + 70}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Dashboard */}
          <div
            className="
              absolute right-4 top-0 w-72 h-80
              bg-white rounded-2xl shadow-2xl
              overflow-hidden transform rotate-3
              hover:rotate-0 transition-all duration-300
            "
          >
            <div className="h-10 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center px-3">
              <Icon
                icon="solar:chart-bold"
                className="w-5 h-5 text-white"
              />
              <span className="ml-2 text-xs text-white font-medium">
                Dashboard
              </span>
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-xs text-blue-600 font-medium">
                    Ventas
                  </div>
                  <div className="text-lg font-bold text-blue-900">
                    $45K
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-green-600 font-medium">
                    Usuarios
                  </div>
                  <div className="text-lg font-bold text-green-900">
                    1.2K
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 h-36 flex items-end justify-between gap-1">
                {[40, 70, 45, 85, 60, 90, 75].map(
                  (height, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-t from-purple-500 to-blue-500 rounded-t w-full"
                      style={{ height: `${height}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportGenerationSection;
