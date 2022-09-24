import { createRouter, createWebHashHistory } from 'vue-router'
const AccountManage=()=>import('@/components/AccountManage.vue');
const LoginPage=()=>import('@/components/LoginPage.vue');
const NotLogin=()=>import('@/components/NotLogin.vue');
const RegisterPage=()=>import('@/components/RegisterPage.vue');
const routes = [
    {
        path: "/",
        redirect: "/AccountManage",
      },
    
    {
        path:'/AccountManage',
        name:'AccountManage',
        component:AccountManage
    },
    {
        path:'/LoginPage',
        name:'LoginPage',
        component:LoginPage
    },
    {
        path:'/NotLogin',
        name:'NotLogin',
        component:NotLogin
    },
    {
        path:'/RegisterPage',
        name:'RegisterPage',
        component:RegisterPage
    }
]
const router=createRouter(
    {
        history:createWebHashHistory(),
        routes,
    }
    
)
export default router;