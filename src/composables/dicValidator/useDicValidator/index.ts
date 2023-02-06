import type { ReactiveVariable } from 'vue/macros'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import type { ValidationConfig, ValidationFunc, ValidationInfo, ValidationsDic } from '../types'

interface UseDicValidator<Form> {
  validationInfo: Ref<ValidationInfo<Form>>
  isValid: ComputedRef<boolean>
  validate: () => void
}

export function useDicValidator<Dic>(
  dic: ReactiveVariable<Dic>,
  validationsDic: ValidationsDic<Dic>,
): UseDicValidator<Dic> {
  type DicKey = keyof Dic
  type ValidationEntries = [DicKey, ValidationFunc[]][]
  type ChangedAttrsDic = Record<DicKey, boolean>

  const startedValue: Dic = { ...dic }
  const changedAttrsDic = ref<ChangedAttrsDic>(getChangedAttrsDicStartValues(dic))

  watch(dic, (newDic) => {
    updateChangedAttrs(newDic)
  })

  function updateChangedAttrs(newDic: ReactiveVariable<Dic>): void {
    const newDicEntries = Object.entries(newDic) as [DicKey, unknown][]

    newDicEntries.forEach(([key, value]) => {
      if (!changedAttrsDic.value[key])
        changedAttrsDic.value[key] = value !== startedValue[key]
    })
  }

  const validationInfo = computed<ValidationInfo<Dic>>(() => {
    const validationEntries = Object.entries(validationsDic) as ValidationEntries
    const errorsDic: ValidationInfo<Dic> = {} as ValidationInfo<Dic>

    validationEntries.forEach(([attr, functionsArray]) => {
      return functionsArray.some((func) => {
        const value = dic[attr]
        const errorConfig = func(value)
        errorsDic[attr] = errorConfig

        if (!changedAttrsDic.value[attr]) {
          errorsDic[attr] = {
            isValid: true,
            translationConfig: {
              key: '',
              params: {},
            },
          }
        }

        return !errorConfig.isValid
      })
    })

    return errorsDic
  })

  const isValid = computed<boolean>(() => {
    return Object
      .entries<ValidationConfig>(validationInfo.value)
      .every(([key, error]) => {
        if (!changedAttrsDic.value[key])
          return false

        return error.isValid
      })
  })

  function validate(): void {
    const keys = Object.keys(changedAttrsDic.value)
    keys.forEach((key) => {
      changedAttrsDic.value[key] = true
    })
  }

  return {
    validationInfo,
    isValid,
    validate,
  }
}

/**
 * For each dictionary attribute check as boolean is this attribute has changes
 * @param dic useDicValidator reactive dictionary
 * @returns ChangedAttrsDic: Record<DicKey, boolean>
 */
function getChangedAttrsDicStartValues<Dic>(dic: ReactiveVariable<Dic>) {
  type DicKey = keyof Dic
  type ChangedAttrsDic = Record<DicKey, boolean>

  const dicKeys = Object.keys(dic) as DicKey[]

  return dicKeys.reduce((changedAttrs, key) => {
    changedAttrs[key] = Boolean(dic[key])

    return changedAttrs
  }, {} as ChangedAttrsDic)
}
