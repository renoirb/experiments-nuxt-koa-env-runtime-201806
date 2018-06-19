import Vue from 'vue'

import AxiosNuxtModuleConfiguration from '~/utils/wip'

/**
 * Attempt using window.location from an non-SSR only plugin.
 * Inspired by https://github.com/se-panfilov/vue-notifications/blob/master/src/main.js
 */

if (process.browser) {
  Vue.use(AxiosNuxtModuleConfiguration)
  window.onNuxtReady(() => {
    // console.log('onNuxtReady')
    window.$nuxt.$anmc.attemptOverridingAxiosDefaults()
  })
}
