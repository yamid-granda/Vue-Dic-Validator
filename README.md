# Vue Dic Validator

Vue object (dictionary) validator composable

## Usage

```vue
<script lang="ts" setup>
import { useDicValidator } from '~/composables/dicValidator'
import { isEmail, isMaxLength, isMinLength } from '~/composables/dicValidator/rules'
import type { ValidationsDic } from '~/composables/dicValidator/types'

interface LoginFormData {
  email: string
  password: string
}

const { t } = useI18n()

const form = ref<LoginFormData>({ email: '', password: '' })

const validationsDic: ValidationsDic<LoginFormData> = {
  email: [
    (value: string) => isEmail(value),
    (value: string) => isMaxLength(value, 150),
  ],
  password: [
    (value: string) => isMinLength(value, 5),
    (value: string) => isMaxLength(value, 100),
  ],
}

const {
  isValid,
  validate,
  validationInfo,
} = $(useDicValidator(form.value, validationsDic))

async function onSubmit() {
  validate()

  if (!isValid)
    return

  login()
}

function login() {}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="form.email"
      type="email"
      name="email"
    >
    <pre>{{ { message: t(validationInfo.email.translationConfig.key), isValid: validationInfo.email.isValid } }}</pre>

    <input
      v-model="form.password"
      type="password"
      name="password"
    >

    <pre>{{ { message: t(validationInfo.password.translationConfig.key), isValid: validationInfo.password.isValid } }}</pre>

    <button>{{ t('Login') }}</button>
  </form>
</template>
```

## TODO

- [ ] add more common validation rules
- [ ] improve development experience in `validationsDic` definition, allows less necessary code

## Development Environment

### Min Requirements

- `Node.js >= @14 LTS` 
- `npm == @6` | OR | `pnpm == @7`

### Installation

With npm

```bash
npm install
```

With pnpm

```bash
pnpm i
```

### Run Unit Tests

With npm

```bash
npm run test
```

With pnpm

```bash
pnpm test
```

### Run TDD (test driven development) Environment

With npm

```bash
npm run tdd
```

With pnpm

```bash
pnpm tdd
```