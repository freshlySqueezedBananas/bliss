import Vue from 'vue';
import question from '../question/question.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  data: function() {
    return {
      searching: false,
      init: false,
      focus: false,
      limit: 10,
      offset: 0,
      filter: '',
      questions: []
    }
  },
  created: function() {
    let filter = this.$route.query.question_filter;

    if (filter) {
      this.filter = filter;
      this.searching = true;
      this.$emit('filter', this.filter);
    }
    else if (filter === null) {
      this.focus = true;
    }

    this.getQuestions();
  },
  mounted: function() {
    if (this.focus) {
      this.$refs.filter.focus();
    }
  },
  methods: {
    onInfinite: function() {
      this.offset += this.limit;
    },
    getQuestions: function() {
      Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?'+this.limit+'&'+this.offset+'&'+this.filter).then(response => {
        if (response.data.length > 0) {
          this.questions = this.questions.concat(response.data);
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
        }
        else {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:completed');
        }

        this.init = true;
      });
    },
    searchQuestions: function(e) {
      e.preventDefault();
      this.searching = true;
      this.questions = [];
      this.offset = 0;

      this.$emit('filter', this.filter);

    },
    shareQuestion: function(e) {
      e.preventDefault();
      this.$emit('showModal');
    },
    exitSearch: function() {
      this.searching = false;
      this.questions = [];
      this.filter = '';
      this.offset = 0;
    }
  },
  components: {
    question,
    InfiniteLoading,
  },
  watch: {
    offset: function() {
      if (this.init) {
        this.getQuestions();
      }
    }
  }
}
