import { App } from 'vue'
import Button from './components/Button/FuiButton.vue'
import Input from './components/Input/FuiInput.vue'

export { Button, Input }

const plugin = {
  install(app: App) {
    app.component('FuiButton', Button)
    app.component('FuiInput', Input)
  }
}

export default plugin
