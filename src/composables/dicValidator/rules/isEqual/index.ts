import type { TranslationConfig, ValidationConfig } from '../../types'

export function matchWith(value: string | number, valueToMatch: string | number): ValidationConfig {
  const isValid = value === valueToMatch

  let translationConfig: TranslationConfig = {
    key: '',
    params: {},
  }

  if (!isValid) {
    translationConfig = {
      key: 'invalidMatch',
      params: {},
    }
  }

  return {
    isValid,
    translationConfig,
  }
}
