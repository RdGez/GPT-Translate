import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { SYSTEM_TRAIN } from './system.train'
import { SUPPORTED_LANGUAGES } from '../helpers/constants'
import type { FromLanguage, Language } from '../helpers/interfaces/translate.interface'

// This code is just for easy GPT testing, it should be moved to an API
const API_KEY = import.meta.env.VITE_OPENIA_API_KEY

const configuration = new Configuration({ apiKey: API_KEY })
const openAI = new OpenAIApi(configuration)

export async function Translate ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openAI.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...SYSTEM_TRAIN,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  return completion.data.choices[0]?.message?.content
}
