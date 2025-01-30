# Foundation UI

A modern, accessible Vue 3 component library for building beautiful and consistent user interfaces.

## 🚀 Installation

```bash
npm install @yoosuf/foundation-ui -S
```

## 📦 Features

- 🔧 Fully typed with TypeScript
- 🌈 Customizable components
- ♿ Accessibility-first design
- 🚦 Easy to use and integrate

## 🛠 Usage

### Global Registration

```typescript
import { createApp } from 'vue'
import FoundationUI from '@yoosuf/foundation-ui'
import '@yoosuf/foundation-ui/style.css'


const app = createApp(App)
app.use(FoundationUI)
```

### Individual Component Import

```typescript
import { FuiButton, FuiInput } from '@yoosuf/foundation-ui'

export default {
  components: {
    FuiButton,
    FuiInput
  }
}
```

### Component Example

```vue
<template>
  <FuiButton variant="primary" @click="handleClick">
    Click Me
  </FuiButton>
  
  <FuiInput 
    v-model="inputValue" 
    placeholder="Enter your name"
  />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const handleClick = () => {
  // Handle button click
}
</script>

## Components

### Button

#### Props
- `variant`: 'primary' | 'secondary' | 'tertiary'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `type`: 'button' | 'submit' | 'reset'
- `fullWidth`: boolean

#### Events
- `click`: Emitted on button click

### Input

#### Props
- `modelValue`: string | number
- `type`: 'text' | 'password' | 'email' | 'number' | 'tel'
- `placeholder`: string
- `disabled`: boolean
- `required`: boolean
- `minLength`: number
- `maxLength`: number
- `pattern`: string
- `variant`: 'default' | 'outlined' | 'filled'
- `size`: 'small' | 'medium' | 'large'

#### Events
- `update:modelValue`: Emitted on input change
- `input`: Native input event
- `focus`: Emitted on input focus
- `blur`: Emitted on input blur

## 🎨 Customization

Customize components using CSS variables or theme configuration.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License
