<template>
  <section>
    <ul v-for="product in products" track-by="id">
      <li>{{product.question}}</li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created () {
    this.$store.dispatch('fetchProducts')
  },
  computed: mapGetters({
    products: 'getProducts'
  })
}
</script>
