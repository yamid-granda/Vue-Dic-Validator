import type { ValidationConfig } from '../types'

export function translateError(
  config: ValidationConfig,
  translationFunc: (text: string, config: object) => string,
): string {
  if (!config.translationConfig.key)
    return ''

  return translationFunc(config.translationConfig.key, config.translationConfig.params)
}
