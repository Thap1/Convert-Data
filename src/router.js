import VueRouter from "vue-router";
import Vue from "vue";
import InputPushTemplate from './components/template/InputPushTemplate'
import HelloWorld from "./components/HelloWorld";


const routes = [
  {
    path: "/",
    component: InputPushTemplate,
  },
  {
    path: "/home",
    component: HelloWorld,
  },
 
];
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: routes
});


export default router;