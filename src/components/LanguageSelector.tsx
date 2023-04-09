import { Form } from 'react-bootstrap'
import { SUPPORTED_LANGUAGES } from '../helpers/constants'
import { SECTION_TYPES, type FromLanguage, type Language } from '../helpers/interfaces/translate.interface'

type LanguageSelectorProps =
  | { type: SECTION_TYPES.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SECTION_TYPES.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onChange, type, value }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }

  return (
    <Form.Select style={{ marginBottom: '15px', backgroundColor: 'rgb(17, 17, 17)', color: '#fff' }} aria-label="Select Language" onChange={ handleChange } value={ value }>
      { type === SECTION_TYPES.From && <option value='auto'>Autodetect Language</option> }
      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option key={key} value={key}>
            { literal }
          </option>
        ))
      }
    </Form.Select>
  )
}
