import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data: function() {
    return {
      search: '',
    }
  },
  computed: mapState({
    filter: state => state.questions.filter
  }),
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

      //this.searchQuestion();
    }
  },
  methods: {
    ...mapActions([
      'updateFilter'
    ]),
    searchQuestion: function() {
      if (this.search != this.filter) {
        this.$router.push({ query: { question_filter: this.search }});
        this.updateFilter(this.search);
      }
    }
  }
}