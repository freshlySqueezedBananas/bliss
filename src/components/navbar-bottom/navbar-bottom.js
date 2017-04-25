export default {
  data: function() {
    return {
      show: true,
    }
  },
  created: function() {
    console.log(this.$route);
  },
  methods: {
    goBack: function() {
      this.$router.push("/");
    }
  }
}