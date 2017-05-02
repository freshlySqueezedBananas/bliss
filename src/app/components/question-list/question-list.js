import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import question from '../question/question.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  props: ['questions'],
  components: {
    question,
  }
}
