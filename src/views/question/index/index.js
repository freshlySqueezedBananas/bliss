import Vue from 'vue';
import { mapGetters } from 'vuex';
import Service from '../../../services'

import questionDetail from '../../../components/question-detail/question-detail.vue';
import navbarBottom from '../../../components/navbar-bottom/navbar-bottom.vue';
import modal from '../../../components/share-modal/share-modal.vue';

export default {
  props: ['id'],
  data: function() {
    return {
      showModal: false,
      modalTitle: 'Share question'
    }
  },
  computed: mapGetters({
    question: 'getQuestion'
  }),
  created: function() {

  },
  mounted: function() {
    Service.questions.fetch(this.id);
  },
  methods: {
    goBack: function() {
      this.$router.push('/');
    }
  },
  components: {
    questionDetail,
    navbarBottom,
    modal,
  }
}
