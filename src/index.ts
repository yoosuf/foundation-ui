import { App } from 'vue'
import Button from './components/button/index.vue'
import Input from './components/input/index.vue'

export { Button, Input }

const plugin = {
  install(app: App) {
    app.component('Button', Button)
    app.component('Input', Input)
  }
}

export default plugin