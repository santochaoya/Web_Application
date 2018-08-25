import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import Projects from './Projects.vue';
import Project from './Project.vue';
import Login from './Login.vue';
import Register from './Register.vue';
import Account from './Account.vue';
import CreateProject from './CreateProject.vue';
import UserProject from './Userproject.vue';
import UserPledge from './userPledge.vue'
import NewPledge from './createPledge.vue';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueSession from 'vue-session';
import VueInstant from 'vue-instant';
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(VueInstant);

const routes = [
    {
        path: "/",
        component:Home
    },
    {
        path:"/projects",
        name:"projects",
        component:Projects
    },
    {
        path: "/projects/:projectId",
        name: "project",
        component: Project
    },
    {
        path:"/login",
        component:Login
    },
    {
        path:"/register",
        component:Register
    },
    {
        path: "/account",
        component:Account,
        meta: { requiresAuth: true }
    },
    {
        path: "/userProject",
        component: UserProject,
        meta: { requiresAuth: true }
    },
    {
        path:"/userPledge",
        component:UserPledge,
        meta: { requiresAuth: true }
    },
    {
        path:"/createPledge",
        component:NewPledge,
        meta: { requiresAuth: true }
    },
    {
        path:"/createProject",
        component:CreateProject
    }
];
const router = new VueRouter({
    routes:routes,
    mode:'history'
});

let session_storage = window.sessionStorage;
router.beforeEach((to, from, next) => {
    console.log(session_storage.getItem('islogin'));
    console.log(to.meta.requiresAuth);
    if (to.meta.requiresAuth && session_storage.getItem('islogin')=='false') {
        alert('Must login first!');
        next('/');
        return
    }
    next()
});

new Vue({
    el: '#app',
    router:router,
    render: h => h(App)
})

