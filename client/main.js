import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import vSelect from 'vue-select';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import routerFactory from '../imports/router/routes';

//Install vSelect
Vue.component('v-select', vSelect)

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

//vSelect CSS
import 'vue-select/dist/vue-select.css';

//BootstrapVue CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
 
//App Layout
import App from '../imports/ui/layouts/App.vue';
 
//App Start
Meteor.startup(() => {
  // Start the router
  const router = routerFactory.create();

  new Vue({
    router,
    render: h => h(App),
  }).$mount('app');
});