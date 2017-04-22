import Vue from 'vue';

export default {
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
    stopPropagation: function(e) {
      e.stopPropagation();
    },
    validateEmail: function() {
      let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(this.email);
    },
    shareQuestion: function(e) {
      if (this.validateEmail()) {
        var context = this;

        $(e.target).prop('disabled', true);

        Vue.$http.post('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/share?'+this.email+'&'+this.link).then(response => {
          if (response.status == 200) {
            context.$emit('close');
          }
          else {
            this.failed = true;

            $(e.target).prop('disabled', false);
          }
        });
      }
      else {
        this.error = true;
      }
    }
  }
}
