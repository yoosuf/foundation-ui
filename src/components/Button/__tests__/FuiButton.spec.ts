import { mount } from '@vue/test-utils'
import Button from "../../Button/index.vue";

describe('FuiButton Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })

    // Check if the button is rendered
    expect(wrapper.exists()).toBe(true)

    // Check if the label is correct
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })

    // Simulate a click
    await wrapper.trigger('click')

    // Check if click event was emitted
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('applies correct classes based on props', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'primary'
      },
      slots: {
        default: 'Primary Button'
      }
    })

    // Check if the correct class is applied
    expect(wrapper.classes()).toContain('foundation-button--primary')
  })

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled Button'
      }
    })

    // Check if the button is disabled
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
