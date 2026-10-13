// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {store} from '@/redux/store'

import es from '@/locales/es/index'
import en from '@/locales/en/index'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ES: { translation: es },
      EN: { translation: en },
    },
    lng: store.getState().locale.language,
    fallbackLng: 'ES',
    interpolation: {
      escapeValue: false,
    },
  })

// 🔥 sincroniza Redux → i18n
store.subscribe(() => {
  const currentLang = store.getState().locale.language
  if (i18n.language !== currentLang) {
    i18n.changeLanguage(currentLang)
  }
})

export default i18n
