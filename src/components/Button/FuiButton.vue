<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  fullWidth: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClasses = computed(() => [
  'foundation-button',
  `foundation-button--${props.variant}`,
  `foundation-button--${props.size}`,
  {
    'foundation-button--disabled': props.disabled,
    'foundation-button--full-width': props.fullWidth
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="buttonClasses"
    :type="props.type"
    :disabled="props.disabled"
    @click="handleClick"
    :aria-disabled="props.disabled"
  >
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.foundation-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.foundation-button--primary {
  background-color: #007bff;
  color: white;
}

.foundation-button--secondary {
  background-color: #6c757d;
  color: white;
}

.foundation-button--tertiary {
  background-color: transparent;
  color: #007bff;
  border: 1px solid #007bff;
}

.foundation-button--small {
  padding: 6px 12px;
  font-size: 0.75rem;
}

.foundation-button--medium {
  padding: 10px 16px;
  font-size: 1rem;
}

.foundation-button--large {
  padding: 12px 24px;
  font-size: 1.25rem;
}

.foundation-button--full-width {
  width: 100%;
}

.foundation-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
