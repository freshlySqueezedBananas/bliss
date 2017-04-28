export default {
  props: ['filter'],
  data: function() {
    return {
      search: '',
    }
  },
  created: function() {
    this.search = this.filter;
  },
  mounted: function() {
    const questionFilter = this.$route.query.question_filter;

    if (questionFilter == "" || questionFilter === null) {
      this.$refs.search.focus();
    }
    else {
      this.search = questionFilter;
    }
  },
  methods: {
    searchQuestion: function() {
      if (this.search != this.filter) {
        this.$emit('search', this.search);
      }
    }
  },
  watch: {
    filter: function() {
      this.search = this.filter;
    }
  }
}