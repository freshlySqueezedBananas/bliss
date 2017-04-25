import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';

import navbarTop from '../../../components/navbar-top/navbar-top.vue';
import questionList from '../../../components/question-list/question-list.vue';
import modal from '../../../components/share-questions/share-questions.vue';


export default {
  data: function() {
    return {
      showModal: false,
    }
  },
  computed: mapState({
    filter: state => state.questions.filter
  }),
  components: {
    navbarTop,
    questionList,
    modal
  },
  watch: {
    filter: function() {
      this.showModal = true;
    }
  }
}
