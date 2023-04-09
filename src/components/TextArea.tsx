import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

import { Form } from 'react-bootstrap'
import { SECTION_TYPES } from '../helpers/interfaces/translate.interface'

interface ITextArea {
  type: SECTION_TYPES
  isLoading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = {
  border: 0,
  color: '#ffffff',
  backgroundColor: '#000000',
  resize: 'none',
  height: '200px'
}

const getPlaceHolder = ({ type, isLoading }: { type: SECTION_TYPES, isLoading?: boolean }) => {
  if (type === SECTION_TYPES.From) return 'Enter Text...'
  if (isLoading === true) return 'Loading...'
  return 'Traduction...'
}

export const TextArea: React.FC<ITextArea> = ({ type, isLoading, value, onChange }) => {
  const fromStyles = type === SECTION_TYPES.To
    ? { ...commonStyles, backgroundColor: 'rgb(10, 10, 10)' }
    : commonStyles

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Form.Control
      as="textarea"
      value={ value }
      style={ fromStyles }
      disabled={ type === SECTION_TYPES.To }
      autoFocus={ type === SECTION_TYPES.From }
      placeholder={ getPlaceHolder({ type, isLoading }) }
      onChange={ handleChange }
    />
  )
}
