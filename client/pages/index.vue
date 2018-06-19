<template>
  <section>
    <h1>Index</h1>
    <p>
      This has been rendered <strong><em>{{from}}</em> side</strong>
    </p>
    <p>
      User-Agent is <em>{{packOfLies}}</em>
    </p>
    <p>
      <nuxt-link to="/alpha">Alpha</nuxt-link>
    </p>
  </section>
</template>

<script>
export default {
  data: () => ({
    from: '',
    userAgent: '',
  }),
  asyncData: ({
    req,
  }) => ({
    from: process.static ? 'static' : (process.server ? 'server' : 'client'),
    packOfLies: (req ? req.headers['user-agent'] : (typeof navigator !== 'undefined' ? navigator.userAgent : 'No user agent (generated)')),
  }),
}
</script>
