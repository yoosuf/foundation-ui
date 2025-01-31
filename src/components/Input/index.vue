<script setup lang="ts">
import { computed, ref } from 'vue'

export interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel'
  placeholder?: string
  disabled?: boolean
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  variant?: 'default' | 'outlined' | 'filled'
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  required: false,
  variant: 'default',
  size: 'medium'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const errorMessage = ref('')

const inputClasses = computed(() => [
  'foundation-input',
  `foundation-input--${props.variant}`,
  `foundation-input--${props.size}`,
  {
    'foundation-input--disabled': props.disabled,
    'foundation-input--error': errorMessage.value
  }
])

const validate = () => {
  if (!inputRef.value) return true

  const value = inputRef.value.value

  // Required validation
  if (props.required && !value) {
    errorMessage.value = 'This field is required'
    return false
  }

  // Min length validation
  if (props.minLength && value.length < props.minLength) {
    errorMessage.value = `Minimum length is ${props.minLength} characters`
    return false
  }

  // Max length validation
  if (props.maxLength && value.length > props.maxLength) {
    errorMessage.value = `Maximum length is ${props.maxLength} characters`
    return false
  }

  // Pattern validation
  if (props.pattern && !new RegExp(props.pattern).test(value)) {
    errorMessage.value = 'Invalid input format'
    return false
  }

  errorMessage.value = ''
  return true
}

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
  emit('input', event)
  validate()
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  validate()
}
</script>

<template>
  <div class="foundation-input-wrapper">
    <input
      ref="inputRef"
      :class="inputClasses"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      :required="props.required"
      :minlength="props.minLength"
      :maxlength="props.maxLength"
      :pattern="props.pattern"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :aria-invalid="!!errorMessage"
      :aria-describedby="errorMessage ? 'input-error' : undefined"
    />
    <span 
      v-if="errorMessage" 
      id="input-error" 
      class="foundation-input-error"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
.foundation-input-wrapper {
  position: relative;
  width: 100%;
}

.foundation-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.foundation-input--default {
  background-color: white;
}

.foundation-input--outlined {
  border: 2px solid #007bff;
}

.foundation-input--filled {
  background-color: #f8f9fa;
}

.foundation-input--small {
  padding: 6px;
  font-size: 0.75rem;
}

.foundation-input--medium {
  padding: 10px;
  font-size: 1rem;
}

.foundation-input--large {
  padding: 12px;
  font-size: 1.25rem;
}

.foundation-input--disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
  opacity: 0.6;
}

.foundation-input--error {
  border-color: #dc3545;
}

.foundation-input-error {
  color: #dc3545;
  font-size: 0.75rem;
  margin-top: 4px;
  display: block;
}
</style>
