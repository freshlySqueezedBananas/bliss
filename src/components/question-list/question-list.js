import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex'
import question from '../question/question.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  data: function() {
    return {
      searching: false,
      init: false,
      focus: false,
    }
  },
  created: function() {
    this.fetchQuestions().then(() => console.log('fetched mofo'));
  },
  mounted: function() {
  },
  computed: mapGetters({
    questions: 'getQuestions'
  }),
  methods: {
    ...mapActions([
      'fetchQuestions',
    ]),
    ...mapActions({
      search: 'searchQuestions',
    }),
    onInfinite: function() {
      this.fetchQuestions().then((response) => console.log(response));
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
  }
}
