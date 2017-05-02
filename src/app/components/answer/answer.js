import Vue from 'vue'

export default {
  props: ['question_id', 'choice', 'totalVotes', 'answered'],
  data: function() {
    return {
      votes: 0,
      votesAnimated: 0,
      percentage: 0,
      voted: false,
      updated: false
    }
  },
  mounted: function() {
    setTimeout(() => this.calculate(), 100)
  },
  updated: function() {
    this.calculate()
  },
  methods: {
    calculate: function () {
      this.votes = this.voted && !this.updated
        ? this.choice.votes+1
        : this.choice.votes

      this.percentage = (this.votes/this.totalVotes*100).toFixed(2)
    },
    vote: function (e) {
      if (!this.answered) {
        this.voted = true
        this.votes++;
        this.$emit('vote', this.choice)
      }
    }
  },
  watch: {
    choice: function() {
      this.updated = true
    },
    votes: function(newValue, oldValue) {
      const context = this
      let animationFrame

      function animate(time) {
        TWEEN.update(time)
        animationFrame = requestAnimationFrame(animate)
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
        .start()

      animationFrame = requestAnimationFrame(animate)
    }
  }
}
