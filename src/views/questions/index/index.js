import Vue from 'vue';
import { mapGetters } from 'vuex';
import Service from '../../../services';

import contentLoading from '../../../components/content-loading/content-loading.vue';
import navbarTop from '../../../components/navbar-top/navbar-top.vue';
import navbarBottom from '../../../components/navbar-bottom/navbar-bottom.vue';
import questionList from '../../../components/question-list/question-list.vue';
import InfiniteLoading from 'vue-infinite-loading';
import modal from '../../../components/share-modal/share-modal.vue';


export default {

  data: function() {
    return {
      contentLoading: true,
      showNavBottom: false,
      showModal: false,
      modalTitle: 'Share search results'
    }
  },
  created: function() {
    const query = this.$route.query.question_filter;

    this.showNavBottom = query ? true : false;
  },
  mounted: function() {
    Service.questions.fetch().then(() => this.contentLoading = false);
  },
  computed: mapGetters({
    filter: 'getFilter',
    questions: 'getQuestions'
  }),
  methods: {
    onInfinite: function() {
      Service.questions.fetchMore().then(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded'));
    },
    onSearch: function(filter) {
      $(window).scrollTop(0);
      this.showNavBottom = true;
      this.contentLoading = true;
      this.$router.replace({ query: { question_filter: filter}})
      Service.questions.search(filter).then(() => this.contentLoading = false);
    },
    onSearchExit: function() {
      $(window).scrollTop(0);
      this.showNavBottom = true;
      this.contentLoading = true;
      this.$router.push("/");
      Service.questions.search('').then(() => {
        this.contentLoading = false;
        this.showNavBottom = false;
      });
    }
  },
  components: {
    contentLoading,
    navbarTop,
    navbarBottom,
    questionList,
    InfiniteLoading,
    modal
  },
  watch: {
    contentLoading: function() {
      this.contentLoading ?
        $('body').addClass('halt') :
        $('body').removeClass('halt');
    }
  }
}
