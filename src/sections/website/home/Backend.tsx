import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type Language = 'ES' | 'EN';

interface BackendAPIsSectionProps {
  className?: string;
}

const methodColors: Record<string, string> = {
  GET: 'bg-green-500',
  POST: 'bg-blue-500',
  PUT: 'bg-yellow-500',
  DELETE: 'bg-red-500',
};

const BackendAPIsSection: React.FC<BackendAPIsSectionProps> = ({
  className = '',
}) => {
  const idioma = useSelector(
    (state: RootState) => state.locale.language as Language
  );

  const [isRedirecting, setIsRedirecting] = useState(false);

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
      ],
    },
    EN: {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
            <Icon icon="solar:server-bold-duotone" className="w-4 h-4" />
            {t.badge}
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {t.title}
          </h2>

          <p className="text-lg text-gray-600 max-w-xl">
            {t.description}
          </p>

          {/* FEATURES */}
          <div className="space-y-5">
            {t.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Icon
                    icon={feature.icon}
                    className="w-6 h-6 text-indigo-600"
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
              inline-flex items-center gap-3 px-8 py-4 rounded-xl
              font-semibold text-lg transition-all duration-300
              ${
                isRedirecting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 hover:scale-[1.03] shadow-lg hover:shadow-green-500/30'
              }
              text-white
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

        {/* RIGHT – VISUAL (hidden mobile) */}
        <div className="relative hidden md:flex items-center justify-center h-[420px]">
          {/* TERMINAL */}
          <div className="absolute left-6 top-16 w-60 h-72 bg-gray-900 rounded-xl shadow-2xl overflow-hidden -rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="h-8 bg-gray-800 flex items-center px-3 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-2 text-xs text-gray-400 font-mono">
                server.js
              </span>
            </div>

            <div className="p-3 font-mono text-xs space-y-2">
              <div className="text-purple-400">
                const <span className="text-blue-400">express</span> =
                <span className="text-green-400"> require</span>()
              </div>
              <div className="text-purple-400">
                const <span className="text-blue-400">app</span> =
                <span className="text-yellow-400"> express</span>()
              </div>
              <div className="h-2" />
              <div className="text-blue-400">
                app.<span className="text-yellow-400">get</span>(
                <span className="text-green-400">'/api'</span>)
              </div>
              <div className="text-blue-400">
                app.<span className="text-yellow-400">post</span>(
                <span className="text-green-400">'/data'</span>)
              </div>
              <div className="h-2" />
              <div className="text-gray-500">
                // Database connection
              </div>
              <div className="text-purple-400">
                await <span className="text-blue-400">db</span>.
                <span className="text-yellow-400">connect</span>()
              </div>
            </div>
          </div>

          {/* API PANEL */}
          <div className="absolute right-6 top-0 w-72 h-80 bg-white rounded-xl shadow-2xl overflow-hidden rotate-6 hover:rotate-0 transition-transform duration-300">
            <div className="h-10 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center px-3 gap-2">
              <Icon
                icon="solar:routing-2-bold"
                className="w-5 h-5 text-white"
              />
              <span className="text-xs text-white font-medium">
                API Endpoints
              </span>
            </div>

            <div className="p-3 space-y-2">
              {[
                { method: 'GET', endpoint: '/api/users' },
                { method: 'POST', endpoint: '/api/auth' },
                { method: 'PUT', endpoint: '/api/products' },
                { method: 'DELETE', endpoint: '/api/items' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-md border border-gray-200"
                >
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold text-white ${methodColors[item.method]}`}
                  >
                    {item.method}
                  </span>
                  <span className="text-xs font-mono text-gray-700">
                    {item.endpoint}
                  </span>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Server Status
                  </span>
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Response Time
                  </span>
                  <span className="text-indigo-600 font-medium">
                    45ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Requests/min
                  </span>
                  <span className="text-purple-600 font-medium">
                    1,247
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackendAPIsSection;
