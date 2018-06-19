/**
 * Attempt using window.location from an non-SSR only plugin.
 * Inspired by https://github.com/se-panfilov/vue-notifications/blob/master/src/main.js
 */

const PLUGIN_NAME = 'AxiosNuxtModuleConfiguration'

const MESSAGES = {
  alreadyInstalled: `${PLUGIN_NAME}: plugin already installed`,
  methodNameConflict: `${PLUGIN_NAME}: names conflict - `,
}

const getOrigin = (w, fallback = 'http://localhost:3001') => {
  const hasWindowLocation = Reflect.has(w, 'location')
  return hasWindowLocation ? w.location.origin : fallback
}

const AxiosNuxtModuleConfiguration = {
  config: {
    origin: null,
  },
  installed: false,
  install (Vue) {
    if (this.installed) throw console.error(MESSAGES.alreadyInstalled)
    this.attemptGettingWindowLocation(window)
    this.attemptOverridingAxiosDefaults()
    this.installed = true
    Vue.prototype.$anmc = this
  },
  attemptGettingWindowLocation (w) {
    let origin = ''
    if (Reflect.has(w, 'location')) {
      origin = getOrigin(w)
      this.config.origin = origin
    }
    console.log('AxiosNuxtModuleConfiguration.attemptGettingWindowLocation, got', origin)
  },
  attemptOverridingAxiosDefaults () {
    try {
      const axiosDefaults = window.$nuxt.$axios.defaults
      const hasBaseURL = Reflect.has(axiosDefaults, 'baseURL')
      const successfulConfigOrigin = typeof this.config.origin === 'string'
      console.log('Almost there', {
        hasBaseURL,
        successfulConfigOrigin,
      })
      if (hasBaseURL && Reflect.has(window.$nuxt.$axios, 'defaults')) {
        window.$nuxt.$axios.defaults.baseURL = this.config.origin
      }
    } catch (e) {
      console.log('Attempted setting Axios Defaults and failed, try again later')
    }
  },
}

export default AxiosNuxtModuleConfiguration
