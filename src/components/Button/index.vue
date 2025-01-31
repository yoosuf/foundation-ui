<script setup lang="ts">
import { 
  defineProps, 
  withDefaults, 
  computed 
} from 'vue'

// Memoize expensive computations
const buttonVariants = {
  primary: 'foundation-button--primary',
  secondary: 'foundation-button--secondary',
  tertiary: 'foundation-button--tertiary'
}

const buttonSizes = {
  small: 'foundation-button--small',
  medium: 'foundation-button--medium',
  large: 'foundation-button--large'
}

interface ButtonProps {
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  fullWidth: false,
  loading: false
})

// Computed class for performance optimization
const buttonClasses = computed(() => [
  'foundation-button',
  buttonVariants[props.variant],
  buttonSizes[props.size],
  {
    'foundation-button--disabled': props.disabled,
    'foundation-button--loading': props.loading,
    'foundation-button--full-width': props.fullWidth
  }
])

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

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
    :disabled="props.disabled || props.loading"
    @click.stop="handleClick"
    :aria-disabled="props.disabled"
  >
    <span v-if="props.loading" class="spinner">Loading...</span>
    <slot v-else></slot>
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
  transition: all 0.2s ease-in-out;
  font-weight: 500;
}

.foundation-button--full-width {
  width: 100%;
}

.foundation-button--primary {
  background-color: #3498db;
  color: #fff;
}

.foundation-button--secondary {
  background-color: #f7f7f7;
  color: #333;
}

.foundation-button--tertiary {
  border: 1px solid #ddd;
  background-color: transparent;
  color: #333;
}

.foundation-button--small {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.foundation-button--medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.foundation-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.25rem;
}

.foundation-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.foundation-button--loading {
  cursor: wait;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
