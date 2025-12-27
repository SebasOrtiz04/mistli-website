import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type Language = 'ES' | 'EN';

interface ReportGenerationSectionProps {
  className?: string;
}

const ReportGenerationSection: React.FC<ReportGenerationSectionProps> = ({
  className = '',
}) => {
  const idioma = useSelector(
    (state: RootState) => state.locale.language as Language
  );

  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const copy: Record<
    Language,
    {
      badge: string;
      title: string;
      description: string;
      whatsappMsg: string;
      redirecting: string;
      cta: string;
      features: {
        icon: string;
        title: string;
        description: string;
      }[];
    }
  > = {
    ES: {
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
    EN: {
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
  };

  const t = copy[idioma];

  const handleRedirectWhatsApp = () => {
    setIsRedirecting(true);

    setTimeout(() => {
      window.open(
        `https://wa.me/5212212135220?text=${encodeURIComponent(
          t.whatsappMsg
        )}`,
        '_blank'
      );
      setIsRedirecting(false);
    }, 1200);
  };

  return (
    <section
      className={`w-full max-w-7xl mx-auto px-6 py-20 ${className}`}
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <div
            className="
              inline-flex items-center gap-2 px-4 py-2
              bg-gradient-to-r from-blue-50 to-indigo-50
              text-blue-700 rounded-full text-sm font-semibold
              border border-blue-100
            "
          >
            <Icon
              icon="solar:document-text-bold-duotone"
              className="w-4 h-4"
            />
            {t.badge}
          </div>

          <h2
            className="
              text-4xl md:text-5xl font-extrabold
              text-gray-900 leading-tight tracking-tight
            "
          >
            {t.title}
          </h2>

          <p className="text-lg text-gray-600 max-w-xl">
            {t.description}
          </p>

          {/* FEATURES */}
          <div className="space-y-5">
            {t.features.map((feature, index) => (
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
                    bg-gradient-to-br from-blue-500 to-indigo-500
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
          <button
            onClick={handleRedirectWhatsApp}
            disabled={isRedirecting}
            className={`
              inline-flex items-center justify-center gap-3
              px-8 py-4 rounded-xl font-semibold text-lg
              transition-all duration-300
              ${
                isRedirecting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.03] hover:shadow-xl'
              }
              text-white w-fit
            `}
          >
            {isRedirecting ? (
              <>
                <Icon
                  icon="svg-spinners:ring-resize"
                  className="w-5 h-5"
                />
                {t.redirecting}
              </>
            ) : (
              <>
                <Icon
                  icon="logos:whatsapp-icon"
                  className="w-5 h-5"
                />
                {t.cta}
              </>
            )}
          </button>
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
            <div className="h-10 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center px-3">
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
            <div className="h-10 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center px-3">
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
                      className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t w-full"
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
