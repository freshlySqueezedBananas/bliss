import Vue from 'vue';
import questionDetail from '../../../components/question-detail/question-detail.vue';
import modal from '../../../components/share-question/share-question.vue';

export default {
  props: ['id'],
  data: function() {
    return {
      showModal: false,
    }
  },
  created: function() {
  },
  components: {
    questionDetail: questionDetail,
    modal: modal,
  }
}
