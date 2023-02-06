import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import type { ValidationInfo } from '../..'
import { useDicValidator } from '..'
import type { TestForm } from './mocks'
import { validationsDic } from './mocks'

describe.concurrent('useDicValidator isValid attribute', () => {
  it('returns right error config on change the dictionary attributes', () => {
    const form = ref<TestForm>({
      name: 'christian',
      email: 'cris@mail.co',
      password: 'password',
    })

    let expectedErrors: ValidationInfo<TestForm> = {
      name: {
        isValid: true,
        translationConfig: {
          key: '',
          params: {},
        },
      },
      email: {
        isValid: true,
        translationConfig: {
          key: '',
          params: {},
        },
      },
      password: {
        isValid: true,
        translationConfig: {
          key: '',
          params: {},
        },
      },
    }

    const { validationInfo } = useDicValidator(form.value, validationsDic)
    expect(validationInfo.value).toEqual(expectedErrors)

    form.value.name = 'this is a very log name'
    expectedErrors.name = {
      isValid: false,
      translationConfig: {
        key: 'invalidMaxLength',
        params: {
          max: 20,
        },
      },
    }
    expect(validationInfo.value).toEqual(expectedErrors)

    form.value.email = 'this is a very log email'
    expectedErrors.email = {
      isValid: false,
      translationConfig: {
        key: 'invalidEmail',
        params: {},
      },
    }
    expect(validationInfo.value).toEqual(expectedErrors)

    form.value.password = 'a'
    expectedErrors.password = {
      isValid: false,
      translationConfig: {
        key: 'invalidMinLength',
        params: {
          min: 5,
        },
      },
    }
    expect(validationInfo.value).toEqual(expectedErrors)

    form.value.password = 'valid pass'
    form.value.email = 'valid@email.com'
    form.value.name = 'valid name'
    expectedErrors = {
      name: {
        isValid: true,
        translationConfig: {
          key: '',
          params: {},
        },
      },
      email: {
        isValid: true,
        translationConfig: {
          key: '',
          params: {},
        },
      },
      password: {
        isValid: true,
        translationConfig: {
          key: '',
          params: {},
        },
      },
    }
    expect(validationInfo.value).toEqual(expectedErrors)
  })
})
