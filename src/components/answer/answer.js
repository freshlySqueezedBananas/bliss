import Vue from 'vue';

export default {
  props: ['question_id','choice', 'voted'],
  data: function() {
    return {
      upVoted: false
    }
  },
  methods: {
    upVote: function (e) {
      e.preventDefault();
      if (!this.upVoted) {
        this.upVoted = true;
        this.$emit('vote', this.choice);
      }
    }
  },
  computed: {
    active: function() {
      if (!this.voted && this.upVoted) {
        this.upVoted = false;
        return true;
      }
      else {
        return false;
      }
    }
  }
}
