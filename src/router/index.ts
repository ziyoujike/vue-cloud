import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../layout/index.vue';
// 在 Vue-router新版本中，需要使用createRouter来创建路由
const router = createRouter({
    // 指定路由的模式,此处使用的是hash模式
    history: createWebHashHistory(),
    // 路由地址
    routes: [
        {
            path: '/',
            name: 'index',
            component: Layout,
            redirect: '/',
            meta: {
                title: '首页',
                disable: true,
            },
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('../views/index/index.vue'),
                    meta: {
                        title: '首页',
                        disable: true,
                    },
                },
            ]
        },
        {
            path: '/resources',
            name: 'resources',
            redirect: '/resources/index',
            component: Layout,
            meta: {
                title: '资源管理',
                disable: true,
            },
            children: [
                {
                    path: '/resources/index',
                    name: 'web-doc',
                    component: () => import('../views/resources/index.vue'),
                    meta: {
                        title: '资源管理',
                        disable: true,
                    },
                },

            ],
        },
        {
            path: '/system-management',
            name: 'system-management',
            redirect: '/system-management/user-list',
            component: Layout,
            meta: {
                title: '系统管理',
                disable: true,
            },
            children: [
                {
                    path: '/system-management/dictionary',
                    name: 'dictionary',
                    component: () => import('../views/system-management/dictionary.vue'),
                    meta: {
                        title: '字典管理',
                        disable: true,
                    },
                },
                {
                    path: '/system-management/user-list',
                    name: 'user-list',
                    component: () => import('../views/system-management/user-list.vue'),
                    meta: {
                        title: '用户列表',
                        disable: true,
                    },
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/login.vue'),
            meta: {
                title: '登录注册',
                disable: false,
            },
        },
        // {
        //     path: '/system-management',
        //     name: 'system-management',
        //     redirect: '/system-management/dictionary',
        //     component: Layout,
        //     meta: {
        //         title: '系统管理',
        //         disable: true,
        //     },
        //     children: [
        //         {
        //             path: '/system-management/dictionary',
        //             name: 'dictionary',
        //             component: () => import('../views/system-management/dictionary.vue'),
        //             meta: {
        //                 title: '字典管理',
        //                 disable: true,
        //             },
        //         },
        //     ],
        // },
    ]
})

export default router;