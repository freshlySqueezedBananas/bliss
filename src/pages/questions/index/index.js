import Vue from 'vue';

import navbarTop from '../../../components/navbar-top/navbar-top.vue';
import navbarBottom from '../../../components/navbar-bottom/navbar-bottom.vue';
import questionList from '../../../components/question-list/question-list.vue';
import modal from '../../../components/share-questions/share-questions.vue';


export default {
  data: function() {
    return {
      showNavBottom: true,
      showModal: false,
    }
  },
  components: {
    navbarTop,
    navbarBottom,
    questionList,
    modal
  }
}
