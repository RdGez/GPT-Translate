import { type SUPPORTED_LANGUAGES } from '../constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type FromLanguage = Language | 'auto'

export enum TRANSLATION_TYPES {
  'INTERCHANGE_LANGUAGES',
  'SET_FROM_LANGUAGUE',
  'SET_TO_LANGUAGUE',
  'SET_FROM_TEXT',
  'SET_TRANSLATION'
}

export enum SECTION_TYPES {
  From = 'from',
  To = 'to'
}

export interface ITranslateState {
  isLoading: boolean
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
}

export type IActionTranslate =
  | { type: TRANSLATION_TYPES.INTERCHANGE_LANGUAGES }
  | { type: TRANSLATION_TYPES.SET_FROM_LANGUAGUE, payload: FromLanguage }
  | { type: TRANSLATION_TYPES.SET_TO_LANGUAGUE, payload: Language }
  | { type: TRANSLATION_TYPES.SET_FROM_TEXT, payload: string }
  | { type: TRANSLATION_TYPES.SET_TRANSLATION, payload: string }
