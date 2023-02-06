type TranslationPrams = Record<string, string | number>

export interface TranslationConfig {
  key: string
  params: TranslationPrams
}

export interface ValidationConfig {
  isValid: boolean
  translationConfig: TranslationConfig
}

export type ValidationFunc = (value: any, param1?: any) => ValidationConfig
export type ValidationsDic<Dic> = Partial<Record<keyof Dic, ValidationFunc[]>>
export type ValidationInfo<Dic> = Record<keyof Dic, ValidationConfig>
