import Service from '../../services';

export default {
  data: function() {
    return {
      refreshing: false
    }
  },
  methods: {
    refresh: function() {
      this.refreshing = true;
      Service.health.check().then(() => setTimeout(() => this.refreshing = false, 500));
    }
  }
};
