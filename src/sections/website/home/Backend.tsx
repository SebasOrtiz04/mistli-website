import React from 'react';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { baseWhats } from '../../../constants';
import CustomButton from '../../../components/utils/CustomButton';
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

  const { t } = useTranslation();
  const features = t('home.backend.features', { returnObjects: true }) as { title: string; description: string,icon:string }[];

  return (
    <section
      className={`w-full bg-gray-100 max-w-7xl mx-auto px-6 py-20 ${className}`}
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
            <Icon icon="solar:server-bold-duotone" className="w-4 h-4" />
            {t('home.backend.badge')}
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            {t('home.backend.title')}
          </h2>

          <p className="text-lg text-gray-600 max-w-xl">
            {t('home.backend.description')}
          </p>

          {/* FEATURES */}
          <div className="space-y-5">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start bg-white gap-4 border-l-4 rounded-2xl p-5">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Icon
                    icon={feature.icon}
                    className="w-6 h-6 text-blue-600"
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
          <CustomButton href={baseWhats + encodeURIComponent(t('home.backend.whatsappMsg'))} color='green' icon="mdi:whatsapp" label={t('home.backend.cta')} />
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
              <span className="ml-2 text-xs ytext-gray-400 font-mono">
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
            <div className="h-10 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center px-3 gap-2">
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
                  <span className="text-blue-600 font-medium">
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
