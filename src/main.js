import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//antd组件
import antd from './utils/antd'

//md-editor组件
import VMdEditor  from '@kangc/v-md-editor/lib/codemirror-editor'
import '@kangc/v-md-editor/lib/style/codemirror-editor.css'
import VuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress'

import Codemirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/lib/codemirror.css'

VMdEditor.Codemirror = Codemirror
VMdEditor.use(VuePressTheme)


createApp(App).use(store).use(router).use(antd).use(VMdEditor).mount('#app')
