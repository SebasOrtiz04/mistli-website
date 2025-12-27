import { createReducer } from '@reduxjs/toolkit'
import { LocaleState } from '../types/languagetype'
import { setLanguage, toggleLanguage } from '../actions/languageactions'

const initialState: LocaleState = {
  language: 'ES',
}

export const localeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLanguage, (state, action) => {
      state.language = action.payload
    })
    .addCase(toggleLanguage, (state) => {
      state.language = state.language === 'ES' ? 'EN' : 'ES'
    })
})
