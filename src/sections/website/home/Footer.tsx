import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

const Footer: React.FC = () => {
    const { t } = useTranslation();
      const links = t('home.footer.links', { returnObjects: true }) as { name: string }[];

  return (
    <footer className="bg-[#0b1a33] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Logo + descripción */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
              <Icon icon="mdi:cloud" className="w-6 h-6" />
              {t('home.footer.name')}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {t('home.footer.slogan')}
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-3 text-sm text-gray-400">
                {links.map((link) => (
              <li className="hover:text-white transition">{link.name}</li>))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Icon icon="mdi:email-outline" className="w-4 h-4" />
                hola@mistli.tech
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="mdi:map-marker-outline" className="w-4 h-4" />
                México / Remoto
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{t('home.footer.ley')}</p>
          
          <div className="flex gap-6">
            <span className="hover:text-white transition cursor-pointer">
              {t('home.footer.terms')}
            </span>
            <span className="hover:text-white transition cursor-pointer">
              {t('home.footer.privacy')}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;