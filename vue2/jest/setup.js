import Vue from 'vue'
import bkMagicVue from '@canway/cw-magic-vue'
import { createLocalVue } from '@vue/test-utils' // changed
const localVue = createLocalVue() // added
localVue.use(bkMagicVue)
Vue.config.devtools = true
Vue.config.productionTip = false
