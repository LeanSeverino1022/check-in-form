import Vue from 'vue';
import App from './App.vue';

import VueFormWizard from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

Vue.use(VueFormWizard);
//component code

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
