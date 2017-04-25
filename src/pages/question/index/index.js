import Vue from 'vue';
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
  created: function() {
  },
  methods: {
    goBack: function() {
      this.$router.push('/');
      console.log();
    }
  },
  components: {
    questionDetail,
    navbarBottom,
    modal,
  }
}
