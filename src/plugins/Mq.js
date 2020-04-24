import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    small: 720,
    tablet: 1024,
    laptop: 1366,
    desktop: Infinity,
  },
})
