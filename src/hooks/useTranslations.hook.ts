import { useReducer } from 'react'
import { translateReducer } from '../reducers/translate.reducer'
import { type ITranslateState, type Language, type FromLanguage, TRANSLATION_TYPES } from '../helpers/interfaces/translate.interface'

const initialState: ITranslateState = {
  isLoading: false,
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: ''
}

export function useTranslation () {
  const [{
    isLoading,
    fromLanguage,
    toLanguage,
    fromText,
    result
  }, dispatch] = useReducer(translateReducer, initialState)

  const interchangeLanguages = () => { dispatch({ type: TRANSLATION_TYPES.INTERCHANGE_LANGUAGES }) }
  const setFromLanguage = (payload: FromLanguage) => { dispatch({ type: TRANSLATION_TYPES.SET_FROM_LANGUAGUE, payload }) }
  const setToLanguage = (payload: Language) => { dispatch({ type: TRANSLATION_TYPES.SET_TO_LANGUAGUE, payload }) }
  const setFromText = (payload: string) => { dispatch({ type: TRANSLATION_TYPES.SET_FROM_TEXT, payload }) }
  const setResult = (payload: string) => { dispatch({ type: TRANSLATION_TYPES.SET_TRANSLATION, payload }) }

  return {
    isLoading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
