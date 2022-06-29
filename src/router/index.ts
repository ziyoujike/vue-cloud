import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
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
                {
                    path: '/personal/personal-center',
                    name: 'personal-center',
                    component: () => import('../views/personal/personal-center.vue'),
                    meta: {
                        title: '个人中心',
                        disable: false,
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
            path: '/resourceModule',
            name: 'resourceModule',
            redirect: '/resourceModule/index',
            component: Layout,
            meta: {
                title: '资源模块',
                disable: true,
            },
            children: [
                {
                    path: '/resourceModule/resources',
                    name: 'resources',
                    component: () => import('../views/resource-module/resources.vue'),
                    meta: {
                        title: '资源模块',
                        disable: true,
                    },
                },
                {
                    path: '/resourceModule/resources_classify',
                    name: 'resources_classify',
                    component: () => import('../views/resource-module/resources_classify.vue'),
                    meta: {
                        title: '资源分类',
                        disable: true,
                    },
                },
                // 

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
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/error/404.vue'),
            meta: {
                title: '404',
                disable: false,
            },
        },
        {
            path: '/403',
            name: '403',
            component: () => import('@/views/error/403.vue'),
            meta: {
                title: '403',
                disable: false,
            },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            name: "pathMatch",
            component: () => import('@/views/error/403.vue'),
            meta: {
                title: '重定向',
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

router.beforeEach((to, from, next) => {
    const { isLogin } = storeToRefs(useUserStore());
    // 登录页面直接跳
    if (to.path === '/login') return next();
    // 没有登录，重定向到登录页面
    if (!isLogin.value) return next(`/login?redirect=${to.path}`);
    next();
})

export default router;