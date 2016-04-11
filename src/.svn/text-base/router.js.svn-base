/**
 * Created by dinglei on 16/3/18.
 */


module.exports = function(router){
    //路由表
    router.map({
        //默认
        '/':{
            name:'index',
            component: require('./app.vue')

        },
        //首页
        '/list':{
            name:'list',
            component: require('./views/list.vue')
        },
        //商品详情页
        '/detail/:goodsid':{
            name:'detail',
            component: require('./views/detail.vue')
        },

        //购物车页
        '/cart':{
            name:'cart',
            component: require('./views/cart.vue')
        },



        //个人中心页
        '/user/:userid':{
            name:'user',
            component: require('./views/user.vue')
        },

    });

};