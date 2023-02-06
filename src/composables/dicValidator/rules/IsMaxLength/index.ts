import type { TranslationConfig, ValidationConfig } from '../../types'

export function isMaxLength(text: string, max: number): ValidationConfig {
  const isValid = text.length <= max
  let translationConfig: TranslationConfig = {
    key: '',
    params: {},
  }

  if (!isValid) {
    translationConfig = {
      key: 'invalidMaxLength',
      params: { max },
    }
  }

  return {
    isValid,
    translationConfig,
  }
}
