<script setup lang="ts">
import { 
  defineProps, 
  withDefaults, 
  computed 
} from 'vue'

// Memoize expensive computations
const buttonVariants = {
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-200 text-black',
  tertiary: 'border border-gray-300 bg-transparent'
}

const buttonSizes = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg'
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
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-wait': props.loading,
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

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
