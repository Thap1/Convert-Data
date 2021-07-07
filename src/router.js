import Router from "vue-router";
import Vue from "vue";
import InputPushTemplate from './components/push-template/InputPushTemplate'
Vue.use(Router);

const routes = [
  { path: "/foo", component: InputPushTemplate },
];

export default function createRouter() {
  return new Router({
    mode: "history",
    routes: [routes],
  });
}
