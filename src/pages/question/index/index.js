import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

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
  mounted: function() {
    this.fetchQuestion(this.id);
  },
  methods: {
    ...mapActions([
      'fetchQuestion'
    ]),
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
