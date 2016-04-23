/**
 * Created by dinglei on 16/3/18.
 */

//VUE 依赖配置
var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var VueAsyncData = require('vue-async-data');
Vue.use(VueAsyncData);
var App = Vue.extend(require('./app.vue'));

var lazyload = require('vue-lazyload');

Vue.use(lazyload, {
    error: '../src/img/common/error.png',
    loading: '../src/img/common/loading.gif',
    try: 3 // default 2
});

$.ajaxSettings.crossDomain = true;

//防止点击穿透
var fastclick = require('fastclick');
fastclick.attach(document.body);

// 使用 Mock
window.Mock = require('mockjs');

var router = new VueRouter({
    //abstract:true,
    //地址栏不会有变化
    //以下设置需要服务端设置
    //history: false,   //当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
    //saveScrollPosition: false
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true,
    linkActiveClass:'nav-active' //全局设置连接匹配时的类名 参考http://vuejs.github.io/vue-router/en/link.html
});

require('./router')(router);

router.start(App,'#app');