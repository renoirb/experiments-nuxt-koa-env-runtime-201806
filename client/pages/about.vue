<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <h2 class="info" v-if="name === 'client'">
      Please refresh the page
    </h2>
    <pre style="text-align:left">
      {{JSON.stringify(activities, null, 4)}}
    </pre>
    <nuxt-link class="button" to="/">
      Home page
    </nuxt-link>
    <el-button
      @click="onButtonClick"
    >
      Click me!
    </el-button>
  </section>
</template>

<script>
import {
  Button,
} from 'element-ui'
import {
  mapState,
} from 'vuex'

export default {
  asyncData ({
    req,
  }) {
    return {
      name: req ? 'server' : 'client',
    }
  },
  computed: {
    ...mapState('examples/activity', {
      activities: state => state.activities,
    }),
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`,
    }
  },
  methods: {
    async onButtonClick () {
      console.log('Honk!')
      // This will not work when built
      // await this.$store.dispatch('examples/activity/hydrate')
      const activities = await this.$axios.$get('/hpi/examples/activity')
      this.$store.commit('examples/activity/SET_ACTIVITIES', activities)
    },
  },
  components: {
    'el-button': Button,
  },
}
</script>

<style scoped>
.title
{
  margin-top: 50px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 50px;
}
</style>
