<template>
    <el-row :gutter="10" class="container">
        <!-- header start -->
        <el-col :span="24" class="header">
            <el-col :span="4" class="logo">
                <img src="../assets/logo.png" />
                <span>后台管理</span>
            </el-col>
            <el-col :span="18" class="userinfo">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#1F2D3D" text-color="#fff" active-text-color="#ffd04b" router>
                    <el-menu-item index="/HelloWorld">处理中心</el-menu-item>
                    <el-submenu index="/activePublic" class='nav-left'>
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="/activePublic">选项1</el-menu-item>
                        <el-menu-item index="/activeManage">选项2</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/">
                        <a href="https://www.ele.me" target="_blank">订单管理</a>
                    </el-menu-item>

                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link userinfo-inner user-name">{{ user.Name }}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="changePwd">修改密码</el-dropdown-item>
                            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                </el-menu>

            </el-col>
        </el-col>
        <!-- header end -->
        <el-input v-model="name"></el-input>
        <el-input v-model="name"></el-input>
        <!--main start-->
        <el-col :span="24" class="main">
            <!--menu start-->
            <aside>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#324057" text-color="#fff" active-text-color="#ffd04b" router>
                    <template v-for="item in menus">

                        <template v-if="item.subs">
                            <el-submenu :index="item.index">
                                <template slot="title">
                                    <i :class="item.icon"></i>{{ item.title }}
                                </template>
                                <el-menu-item v-for="(grand, j) in item.subs" :key="j" :index="grand.index">{{ grand.title }}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="item.index">
                                <i :class="item.icon"></i>{{ item.title }}
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </aside>
            <!--menu end-->
            <!-- content start -->
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <!--<strong class="title">{{$route.name}}</strong>-->
                        <!--面包屑导航-->
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <template v-for="item in $route.matched">
                                <el-breadcrumb-item :key="item.name" :to="item.path">
                                    {{ item.meta }}
                                </el-breadcrumb-item>
                            </template>

                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition>
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
            <!-- content end -->
        </el-col>
        <!--main end-->

    </el-row>
</template>

<script>
import local from '../store/local';
export default {
    data() {
        return {
            name: 'aa',
            activeIndex: '1',
            activeIndex2: '1',
            user: {
                Name: '管理员'
            },
            menus: [
                {
                    icon: 'fa fa-user ',
                    index: '/HelloWorld',
                    title: '欢迎',
                },
                {
                    icon: 'fa fa-address-card',
                    index: '2',
                    title: '活动设置',
                    subs: [
                        { index: '/activePublic', title: '活动列表' },
                        { index: '/activeManage', title: '活动详情' },
                    ]
                },
                {
                    icon: 'fa fa-bars',
                    index: '/stepIndex',
                    title: '步骤条设置'
                }, {
                    icon: 'fa fa-bars',
                    index: '/productMange',
                    title: '产品管理'
                },
            ]
        }
    },
    methods: {
        changePwd() {
            console.log('changepwd');
        },
        logout() {
            local.removeItem('Account');
            local.removeItem('Password');
            console.log('logout');
            this.$router.push('/Login')
        },
    },
    computed: {

    },
    //钩子函数，页面加载完后
    mounted: function() {

        // console.log('mounted');
    },

    //钩子函数 页面刚加载时候(渲染dom)
    created: function() {
        var Account = local.getItem('Account');
        var Password = local.getItem('Password');
        if (!Account || !Password) {
            this.$router.push({ 'path': '/Login', query: { 'back': this.$route.path } })
        }
        console.log(this.$route.path);
        console.log(Account);
    },
}
</script>

<style scoped lang="scss">
.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
        height: 60px;
        line-height: 60px;
        background: #1F2D3D;
        color: #c0ccda;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            .nav-left {
                text-align: left;
            }
            .user-name {
                color: gold;
                font-size: 16px;
                padding-right: 16px;
            }
            .account {
                color: #c0ccda;
            }
        }
        .logo {
            font-size: 22px;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color: #20a0ff
            }
        }
    }
    .main {
        background: #324057;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
        aside {
            width: 230px;
        }
        .content-container {
            background: #f1f2f7;
            position: absolute;
            right: 0px;
            top: 0px;
            bottom: 0px;
            left: 230px;
            overflow-y: scroll;
            padding: 20px;
            .breadcrumb-container {
                margin-bottom: 15px;
                .title {
                    width: 200px;
                    float: left;
                    color: #475669;
                }
                .breadcrumb-inner {
                    float: left;
                }
            }
            .content-wrapper {
                background-color: #fff;
                box-sizing: border-box;
                padding-bottom: 20px;
            }
        }
    }
}
</style>


