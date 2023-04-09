import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import CopyIcon from './assets/copy-icon.svg'
import SpeakerIcon from './assets/speaker-icon.svg'
import ExchangeIcon from './assets/exchange-icon.svg'
import { SECTION_TYPES } from './helpers/interfaces/translate.interface'
import { useTranslation } from './hooks/useTranslations.hook'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce.hook'
import { VOICE_FOR_LANGUAGE } from './helpers/constants'
import { Translate } from './services/translate'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    isLoading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useTranslation()

  const dbFromText = useDebounce(fromText)

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    if (dbFromText === '') return
    Translate({ fromLanguage, toLanguage, text: dbFromText.trim() })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Errot at trying to translate, try again...') })
  }, [dbFromText, fromLanguage, toLanguage])

  return (
    <div className='App'>
      <main className='main-container'>
        <section className="hero-title">
          <img src="https://ph-files.imgix.net/b739ac93-2899-4cc1-a893-40ea8afde77e.png?auto=format" alt="OpenIA-Logo" />
          <h1 className='main-title'>Translate</h1>
        </section>
        <section className='traduction-container'>
          <div className="select-language">
            <LanguageSelector
              type={ SECTION_TYPES.From }
              value={ fromLanguage }
              onChange={ setFromLanguage }
            />
            <TextArea
              type={ SECTION_TYPES.From }
              value={ fromText }
              onChange={ setFromText }
            />
          </div>
          <div className="change-language">
            <img className={ `change-icon ${fromLanguage === 'auto' ? 'disabled' : ''}` }
                 onClick={ () => { if (fromLanguage !== 'auto') interchangeLanguages() }}
                 src={ ExchangeIcon }
                 alt="exchange"
            />
          </div>
          <div className="select-language">
            <LanguageSelector
              type={ SECTION_TYPES.To }
              value={ toLanguage }
              onChange={ setToLanguage }
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                isLoading={ isLoading }
                type={ SECTION_TYPES.To }
                value={ result }
                onChange={ setResult }
              />
              {
                result !== ''
                  ? <div style={{ backgroundColor: 'rgb(10, 10, 10)', height: '45px', position: 'absolute', left: 10, bottom: 0, display: 'flex', alignItems: 'center' }}>
                  <img
                     className={ `${result === '' ? 'disabled' : ''}` }
                     style={{ cursor: 'pointer', height: '24px' }}
                     onClick={ handleClipboard }
                     src={ CopyIcon }
                     alt="Copy"
                  />
                  <img
                     className={ `${result === '' ? 'disabled' : ''}` }
                     style={{ cursor: 'pointer', height: '24px', marginLeft: '20px' }}
                     onClick={ handleSpeak }
                     src={ SpeakerIcon }
                     alt="Copy"
                  />
                </div>
                  : null
              }
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
