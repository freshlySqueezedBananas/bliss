import Vue from 'vue';
import store from '../../store';

import check from './check';

const interval = 3000;

export default () => {
  setInterval(() => check(), interval);
}
