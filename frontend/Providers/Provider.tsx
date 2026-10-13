"use client";

import "@/i18n"; // inicializa i18next (side effect)
import { I18nextProvider } from "react-i18next";
import i18n from "i18next";
import firebase, { FirebaseContext } from "@/lib/firebase/index";
import useAutenticacion from "@/hooks/useAutenticacion";
import { Provider } from 'react-redux'
import { store } from "@/redux/store";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = useAutenticacion()
  return <>
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <FirebaseContext.Provider value={{
          firebase,
          usuario
        } as any}>
          {children}
        </FirebaseContext.Provider>
    </I18nextProvider>
    </Provider>
    </>;
}