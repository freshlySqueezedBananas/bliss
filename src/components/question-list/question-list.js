import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import question from '../question/question.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  data: function() {
    return {
      contentLoaded: false,
      searching: false,
    }
  },
  created: function() {
    if (this.filter == "") {
      this.fetchQuestions()
        .then(() => this.contentLoaded = true );
    }
  },
  computed: mapGetters({
    filter: 'getFilter',
    questions: 'getQuestions'
  }),
  methods: {
    ...mapActions([
      'fetchQuestions',
      'searchQuestions',
    ]),
    onInfinite: function() {
      if (this.questions.length > 0) {
        this.fetchQuestions()
          .then(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded'))
          .catch(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:completed'));
      }
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
    filter: function() {
      //$(window).scrollTop(0);
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      this.searching = true;
      this.contentLoaded = false
      this.searchQuestions()
        .then(() => this.contentLoaded = true );
    }
  }
}
