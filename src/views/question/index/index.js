import Vue from 'vue';
import { mapGetters } from 'vuex';
import Service from '../../../services';

import contentLoading from '../../../components/content-loading/content-loading.vue';
import questionDetail from '../../../components/question-detail/question-detail.vue';
import navbarBottom from '../../../components/navbar-bottom/navbar-bottom.vue';
import modal from '../../../components/share-modal/share-modal.vue';

export default {
  props: ['id'],
  data: function() {
    return {
      contentLoading: true,
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
    Service.questions.fetch(this.id).then(() => this.contentLoading = false);
  },
  methods: {
    goBack: function() {
      $(window).scrollTop(0);
      this.$router.push('/');
    },
    onVote: function(choice) {
      Service.questions.vote(choice);
    }
  },
  components: {
    contentLoading,
    questionDetail,
    navbarBottom,
    modal,
  }
}
