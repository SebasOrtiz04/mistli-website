import React from 'react';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type Language = 'ES' | 'EN';

interface FrontendDevSectionProps {
  className?: string;
}

const FrontendDevSection: React.FC<FrontendDevSectionProps> = ({ className = '' }) => {
  const idioma = useSelector(
    (state: RootState) => state.locale.language as Language
  );

  const copy: Record<Language, {
    whatsappMsg: string;
    badge: string;
    title: string;
    description: string;
    cards: { label: string; value: string; icon: string }[];
    features: { title: string; desc: string }[];
    cta: string;
    footer: string;
  }> = {
    ES: {
      whatsappMsg: 'Hola! Me interesa desarrollar una interfaz web. Mi proyecto es: ',
      badge: 'UX / UI & Frontend',
      title: 'Interfaces web modernas\nque sí convierten',
      description:
        'Diseñamos y desarrollamos interfaces enfocadas en experiencia de usuario, rendimiento y resultados reales de negocio.',
      cards: [
        { label: 'Usuarios activos', value: '2,430', icon: 'mdi:account' },
        { label: 'Conversiones', value: '18.2%', icon: 'mdi:chart-line' },
        { label: 'Ventas', value: '$124K', icon: 'mdi:cash' },
        { label: 'Performance', value: '99.9%', icon: 'mdi:speedometer' },
      ],
      features: [
        {
          title: 'UX orientado a conversión',
          desc: 'Diseño pensado para guiar al usuario y aumentar ventas',
        },
        {
          title: 'UI limpia y profesional',
          desc: 'Estética moderna, clara y alineada a tu marca',
        },
        {
          title: 'Responsive y accesible',
          desc: 'Perfecto en móvil, tablet y desktop',
        },
        {
          title: 'Stack moderno',
          desc: 'React, Next.js, Tailwind, performance first',
        },
      ],
      cta: 'Cotizar en WhatsApp',
      footer: 'Diseño escalable y listo para producción',
    },
    EN: {
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
  };

  const t = copy[idioma];

  const handleRequestQuote = () => {
    const message = encodeURIComponent(t.whatsappMsg);
    window.open(`https://wa.me/5212212135220?text=${message}`, '_blank');
  };

  return (
    <section className={`w-full max-w-6xl mx-auto px-4 py-20 ${className}`}>
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
            {t.cards.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 p-4 hover:shadow-md transition"
              >
                <Icon icon={item.icon} className="w-6 h-6 text-cyan-600 mb-2" />
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="h-28 rounded-xl bg-gradient-to-r from-cyan-100 to-blue-100 flex items-end gap-2 p-4">
            {[40, 60, 35, 80, 55, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-md bg-cyan-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Right – Content */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
            <Icon icon="solar:programming-bold-duotone" />
            {t.badge}
          </span>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight whitespace-pre-line">
            {t.title}
          </h2>

          <p className="text-lg text-gray-600">{t.description}</p>

          <div className="grid gap-4">
            {t.features.map((item, i) => (
              <div key={i} className="flex gap-3">
                <Icon
                  icon="solar:check-circle-bold"
                  className="w-5 h-5 text-cyan-600 mt-1"
                />
                <div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRequestQuote}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl
              bg-green-600 hover:bg-green-700 text-white font-semibold text-lg
              transition transform hover:scale-105 hover:shadow-lg"
          >
            <Icon icon="mdi:whatsapp" className="w-5 h-5" />
            {t.cta}
          </button>

          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Icon icon="solar:shield-check-bold" className="text-cyan-600" />
            {t.footer}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FrontendDevSection;
