'use client'

import firebase, { FirebaseContext } from "../lib/firebase/index.js";
import useAutenticacion from "../hooks/useAutenticacion.js";
import { ReactNode } from 'react';

export function Providers({children}: {children: ReactNode}) {
    const usuario = useAutenticacion()
  return (
    <FirebaseContext.Provider value={{
          firebase,
          usuario
        } as any}>
          {children}
        </FirebaseContext.Provider>
  )
}