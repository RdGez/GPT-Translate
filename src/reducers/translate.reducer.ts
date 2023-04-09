import { type ITranslateState, type IActionTranslate, TRANSLATION_TYPES } from '../helpers/interfaces/translate.interface'

export function translateReducer (state: ITranslateState, action: IActionTranslate) {
  switch (action.type) {
    case TRANSLATION_TYPES.INTERCHANGE_LANGUAGES:
      if (state.fromLanguage === 'auto') return state

      return {
        ...state,
        isLoading: state.fromText !== '',
        result: '',
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    case TRANSLATION_TYPES.SET_FROM_LANGUAGUE:
      if (state.fromLanguage === action.payload) return state

      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        isLoading: state.fromText !== ''
      }
    case TRANSLATION_TYPES.SET_TO_LANGUAGUE:
      if (state.toLanguage === action.payload) return state

      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        isLoading: state.fromText !== ''
      }
    case TRANSLATION_TYPES.SET_FROM_TEXT:
      return {
        ...state,
        isLoading: action.payload !== '',
        fromText: action.payload,
        result: ''
      }
    case TRANSLATION_TYPES.SET_TRANSLATION:
      return {
        ...state,
        isLoading: false,
        result: action.payload
      }
    default:
      return state
  }
}
