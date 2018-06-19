<template>
  <section>
    <h1>Alpha</h1>
    <p>
      This has been rendered <strong><em>{{from}}</em> side</strong>
    </p>
    <p>
      <nuxt-link to="/">Index</nuxt-link>
    </p>
  </section>
</template>

<script>
export default {
  data: () => ({
    from: '',
  }),
  asyncData: ({
    req,
  }) => ({
    from: process.static ? 'static' : (process.server ? 'server' : 'client'),
  }),
}
</script>
