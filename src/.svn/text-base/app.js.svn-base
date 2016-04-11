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

//默认/重定向到home页
/*
router.redirect({
    '/list':""
});
*/

//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
window.routeList=[];

router.beforeEach(function (transition) {
    //处理左侧滚动不影响右边
    //$("html, body, .page").removeClass("scroll-hide");

    //可以通过在路由中的自定义字段来验证用户是否需要登陆

    // if(transition.to.auth){
    // 	console.log('通过配置路由中自定义的字段验证是否需要登陆');
    // }

    if(transition.to.name == 'forbidden'){

        router.app.authenticating = true;
        setTimeout(function(){
            router.app.authenticating = false;
            alert('此路由在全局中设置为中止');
            transition.abort();
        },1500);
    }

    if(routeList.length > 1 && transition.to.name==routeList[routeList.length-2]['name']){

        router.app.effect='back';

        routeList.splice(routeList.length-1,1);

    } else {

        router.app.effect='fade';

        routeList.push({
            name : transition.to.name,
            path : transition.to.path,
            query : transition.to.query,
            params : transition.to.params,
            timer: +new Date
        });

    }

    transition.next();
});

//注册路由切换后
router.afterEach(function (transition) {
    console.log('成功浏览到: ' + transition.to.path)
    //$.refreshScroller();
});

require('./router')(router);

router.start(App,'#app');