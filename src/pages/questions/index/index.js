import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import navbarTop from '../../../components/navbar-top/navbar-top.vue';
import navbarBottom from '../../../components/navbar-bottom/navbar-bottom.vue';
import questionList from '../../../components/question-list/question-list.vue';
import modal from '../../../components/share-modal/share-modal.vue';


export default {

  data: function() {
    return {
      filtering: null,
      showNavBottom: false,
      showModal: false,
      modalTitle: 'Share search results'
    }
  },
  created: function() {
    const query = this.$route.query.question_filter;

    this.filtering = this.showNavBottom = query ? true : false;
  },
  computed: mapGetters({
    filter: 'getFilter'
  }),
  methods: {
    ...mapActions([
      'updateFilter'
    ]),
    onSearch: function(filter) {
      this.updateFilter(filter)
        .then(() => {
          this.filtering = true;
          this.showNavBottom = true;
          this.$router.replace({ query: { question_filter: filter}})
        }
      );
    },
    onSearchExit: function() {
      this.updateFilter('')
        .then(() => {
          this.filtering = false;
          this.showNavBottom = false;
          this.$router.push("/");
      });
    }
  },
  components: {
    navbarTop,
    navbarBottom,
    questionList,
    modal
  },
  watch: {
    filter: function(search) {
      console.log('filter change ::: '+search)
    }
  }
}
