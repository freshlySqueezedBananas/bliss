import connectionScreen from '../connection-screen/connection-screen.vue';
import healthScreen from '../health-screen/health-screen.vue';

export default {
  props: ['api', 'server'],
  components: {
    connectionScreen,
    healthScreen
  }
};