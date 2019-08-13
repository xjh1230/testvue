import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import HelloWorld from '@/components/HelloWorld'
import activePublic from '@/views/activityManage/index.vue'
import activeManage from '@/views/activityManage/detail.vue'
import stepIndex from '@/views/stepTest/index.vue'
import step1 from '@/views/stepTest/step1'
import step2 from '@/views/stepTest/step2'
import step3 from '@/views/stepTest/step3'
import step4 from '@/views/stepTest/step4'

import mForm from '@/views/mform'

import productMange from '@/views/productManage/list.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        meta: '后台管理',
        component: Home,
        children: [
            { path: '/HelloWorld', name: 'HelloWorld', meta: '欢迎', component: HelloWorld },
            { path: '/activePublic', name: 'activePublic', meta: '活动列表', component: activePublic },
            { path: '/activeManage', name: 'activeManage', meta: '活动详情', component: activeManage },
            { path: '/productMange', name: 'productMange', meta: '产品管理', component: productMange },
            { path: '/mForm', name: 'mForm', meta: 'mForm', component: mForm },
            {
                path: '/stepIndex',
                name: 'index',
                meta: '步骤条',
                component: stepIndex,
                children: [
                    { path: '', name: 'step1', meta: '活动信息', component: step1 },
                    { path: 'step1', name: 'step1', meta: '活动信息', component: step1 },
                    { path: 'step2', name: 'step2', meta: '报名签到', component: step2 },
                    { path: 'step3', name: 'step3', meta: '分享设置', component: step3 },
                    { path: 'step4', name: 'step4', meta: '个性设置', component: step4 }
                ]
            }
        ]
    }, {
        path: '/Login',
        name: 'Login',
        meta: '登录',
        component: Login,
    }]
})