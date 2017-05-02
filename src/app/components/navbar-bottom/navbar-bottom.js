export default {
  created: function() {
  },
  methods: {
    close: function() {
      this.$emit('close');
    },
    showModal: function() {
      this.$emit('showModal');
    }
  }
}