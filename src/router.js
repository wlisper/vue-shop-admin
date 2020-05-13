import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'

Vue.use(Router)

const router = new Router(
    {
        routes: [
            {
                path: '/',
                redirect: '/login'
            },
            {
                path: "/login",
                component: Login
            },
            {
                path: '/home',
                component: Home,
                redirect: '/welcome',
                children: [
                    {
                        path: '/welcome',
                        component: Welcome
                    },
                    {
                        path: '/userlist',
                        component: Users
                    }
                ]
            }
        ]
    }
)

router.beforeEach((to, from , next) => {
    // to: the path to visit
    // from: from which path
    // next: a function represents continue;
    if (to.path == '/login') {
        return next();
    } 
    const token = window.sessionStorage.getItem('token');
    if (!token) {
        return next('/login');
    } else {
        return next();
    }
});
export default router;