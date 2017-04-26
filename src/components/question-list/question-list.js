import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import question from '../question/question.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  props: ['filtering'],
  data: function() {
    return {
      contentLoaded: true,
      searching: false,
    }
  },
  mounted: function() {
    if (!this.filtering) {
      this.fetchQuestions()
        .then(() => this.contentLoaded = true );
    }
    else {
      this.searchQuestions()
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
    }
  },
  components: {
    question,
    InfiniteLoading,
  },
  watch: {
    filter: function() {
      console.log('filter updated in component');
      $(window).scrollTop(0);
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      this.contentLoaded = false
      this.searchQuestions()
        .then(() => this.contentLoaded = true );
    }
  }
}
