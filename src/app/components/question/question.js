import Vue from 'vue';
import { router } from '@/bootstrap'
const moment = require('moment');

export default {
  props: ['question'],
  data: function() {
    return {
      date: null
    }
  },
  created: function() {
    this.date = moment(this.question.published_at).fromNow();
  },
  methods: {
    inspectQuestion: function() {
      router.push({ name: 'question', params: { id: this.question.id }})
    }
  }
}
