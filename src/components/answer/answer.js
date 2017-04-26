import Vue from 'vue';

export default {
  props: ['question_id','choice', 'totalVotes', 'voted'],
  data: function() {
    return {
      votes: 0,
      percentage: 0,
      percentageAnimated: 0,
      upVoted: false
    }
  },
  mounted: function() {
    setTimeout(() => this.calculatePercentage(), 100);
  },
  updated: function() {
    this.calculatePercentage()
  },
  methods: {
    calculatePercentage() {
      this.percentage = (this.choice.votes/this.totalVotes*100).toFixed(2);
    },
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
  },
  watch: {
    percentage: function(newValue, oldValue) {
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
          this.percentageAnimated = this.tweeningNumber.toFixed(2)
        })
        .onComplete(function() {
          cancelAnimationFrame(animationFrame)
        })
        .start();

      animationFrame = requestAnimationFrame(animate);
    }
  }
}
