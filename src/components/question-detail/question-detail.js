import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

import _ from 'lodash';
const moment = require('moment');

import answer from '../answer/answer.vue';

export default {
  props: ['question'],
  data: function() {
    return {
      votes: 0,
      updatedQuestion: null,
      answered: false,
    }
  },
  computed: {
    date: function() {
      return moment(this.question.published_at).fromNow();
    },
    totalVotes: function() {
      this.votes = 0;
      const context = this;
      this.question.choices.forEach(function(choice) {
        context.votes += parseInt(choice.votes);
      });

      return this.votes;
    }
  },
  methods: {
    ...mapActions([
      'voteQuestion'
    ]),
    updateQuestion: function(e) {
      this.voteQuestion(e)
        .then(() => this.answered = true);
    },
  },
  components: {
    answer: answer,
  }
}
