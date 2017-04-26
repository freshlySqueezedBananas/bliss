import Vue from 'vue';

export default {
  props: ['question_id','choice', 'totalVotes', 'answered'],
  data: function() {
    return {
      votes: 0,
      votesAnimated: 0,
      percentage: 0,
      voted: false
    }
  },
  mounted: function() {
    setTimeout(() => this.init(), 100);
  },
  updated: function() {
    this.init()
  },
  methods: {
    init: function () {
      this.percentage = (this.choice.votes/this.totalVotes*100).toFixed(2);
      this.votes = this.choice.votes;
    },
    vote: function () {
      if (!this.answered) {
        this.voted = true;
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
  },
  watch: {
    choice: function() {
      console.log('watch_choice '+this.percentage)
    },
    votes: function(newValue, oldValue) {
      const context = this;
      let animationFrame;

      function animate(time) {
        TWEEN.update(time);
        animationFrame = requestAnimationFrame(animate);
      }

      new TWEEN.Tween({ tweeningNumber: oldValue})
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function() {
          context.votesAnimated = this.tweeningNumber.toFixed(0)
        })
        .onComplete(function() {
          cancelAnimationFrame(animationFrame)
        })
        .start();

      animationFrame = requestAnimationFrame(animate);
    }
  }
}
