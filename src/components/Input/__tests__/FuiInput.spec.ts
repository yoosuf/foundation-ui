import { mount } from '@vue/test-utils'
import Input from '../FuiInput.vue'

describe('FuiInput Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        placeholder: 'Enter text'
      }
    })

    // Check if the input is rendered
    expect(wrapper.exists()).toBe(true)

    // Check if placeholder is correct
    expect(wrapper.attributes('placeholder')).toBe('Enter text')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        'onUpdate:modelValue': (value: string | number) => value
      }
    })

    // Find the input element
    const input = wrapper.find('input')

    // Simulate user input
    await input.setValue('Hello World')

    // Check if update:modelValue event was emitted with correct value
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello World'])
  })

  it('applies correct classes based on props', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        variant: 'default'
      }
    })

    // Check if the correct class is applied
    expect(wrapper.classes()).toContain('foundation-input')
  })

  it('handles disabled state', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        disabled: true
      }
    })

    // Check if the input is disabled
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('handles different input types', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        type: 'password'
      }
    })

    // Check if the input type is correct
    expect(wrapper.attributes('type')).toBe('password')
  })
})
