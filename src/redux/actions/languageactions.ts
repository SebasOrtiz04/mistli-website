import { createAction } from '@reduxjs/toolkit'
import { Locale } from '../types/languagetype'

export const setLanguage = createAction<Locale>('locale/setLanguage')
export const toggleLanguage = createAction('locale/toggleLanguage')
