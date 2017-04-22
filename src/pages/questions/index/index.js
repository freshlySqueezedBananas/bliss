import Vue from 'vue';
import questionList from '../../../components/question-list/question-list.vue';
import modal from '../../../components/share-questions/share-questions.vue';


export default {
  data: function() {
    return {
      filter: '',
      showModal: false,
    }
  },
  methods: {
    updateFilter: function(e) {
      this.filter = e;
    }
  },
  components: {
    questionList,
    modal
  },
}
