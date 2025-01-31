import { mount } from '@vue/test-utils'
import Input from "../../Input/index.vue";

describe('FuiInput Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Enter text'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter text')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    
    await input.setValue('Hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Hello'])
  })

  it('applies correct classes based on props', () => {
    const wrapper = mount(Input)

    expect(wrapper.classes()).toContain('foundation-input-wrapper')
    expect(wrapper.find('input').classes()).toContain('foundation-input')
  })

  it('handles disabled state', () => {
    const wrapper = mount(Input, {
      props: {
        disabled: true
      }
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('foundation-input--disabled')
  })

  it('handles different input types', () => {
    const wrapper = mount(Input, {
      props: {
        type: 'password'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')
  })
})
