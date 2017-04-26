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
      active: true,
    }
  },
  computed: {
    date: function() {
      return moment(this.question.published_at).fromNow();
    },
    votes: function() {
      this.question.choices.forEach(function(choice) {
        this.votes += parseInt(choice.votes);
      });
    }
  },
  updated: function() {

  },
  methods: {
    /*getQuestion: function() {
      Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/'+this.id).then(response => {

        let totalVotes = 0;
        _.each(response.data.choices, function(choice) {
           totalVotes += parseInt(choice.votes);
        });

        response.data.votes = totalVotes;
        _.each(response.data.choices, function(choice) {
           let percentage = choice.votes/totalVotes*100;
           choice.percentage = percentage.toFixed(2);
        });

        this.question = response.data;
      });
    },*/
    updateQuestion: function(e) {
      this.active = false;
      let index = _.findIndex(this.question.choices, function(i) { return i.choice == e.choice;});

      // Register vote in appropriate choice object.
      this.question.choices[index].votes++;

      Vue.$http.put('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/'+this.id, this.question).then(response => {
        if (response.status == 201) {
          this.question.votes++;

          let totalVotes = this.question.votes;
          _.each(this.question.choices, function(choice) {
             let percentage = choice.votes/totalVotes*100;
             choice.percentage = percentage.toFixed(2);
          });

        }
        else {
          this.active = true;
          this.question.choices[index].votes--;
        }
      });
    },
  },
  components: {
    answer: answer,
  },
  watch: {
    question: function() {
      const context = this;
      this.question.choices.forEach((choice) => {
        context.votes += parseInt(choice.votes);
      });
    }
  }
}
