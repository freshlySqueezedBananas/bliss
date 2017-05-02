import Vue from 'vue';

export default (email, url) => {
  return Vue.$http.post('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/share?'+email+'&'+url);
}
