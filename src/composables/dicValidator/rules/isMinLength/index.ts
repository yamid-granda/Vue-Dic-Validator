import type { TranslationConfig, ValidationConfig } from '../../types'

export function isMinLength(text: string, min: number): ValidationConfig {
  const isValid = text.length >= min
  let translationConfig: TranslationConfig = {
    key: '',
    params: {},
  }

  if (!isValid) {
    translationConfig = {
      key: 'invalidMinLength',
      params: { min },
    }
  }

  return {
    isValid,
    translationConfig,
  }
}
