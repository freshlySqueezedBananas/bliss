import Vue from 'vue';
import { mapActions } from 'vuex'

export default {
  props: ['title'],
  data: function() {
    return {
      link: '',
      email: null,
      error: false,
      failed: false
    }
  },
  created: function() {
    this.link = encodeURI(window.location.href)
  },
  methods: {
    ...mapActions([
      'share',
    ]),
    validateEmail: function() {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(this.email);
    },
    shareQuestion: function() {
      $(this.$refs.button).prop('disabled', true);
      if (this.validateEmail()) {
        this.share(this.email, this.link)
          .then(() => {
              this.$emit('close');
          })
          .catch(() => {
              this.failed = true;
              $(this.$refs.button).prop('disabled', false);
          });
      }
      else {
        this.error = true;
        $(this.$refs.button).prop('disabled', false);
      }
    }
  }
}
