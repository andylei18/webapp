<style>
    .g-view {
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }

    .fade-enter{
        opacity: 1;
        transform: translate3d(100%, 0, 0);
    }
    .fade-leave {
        opacity: 0;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);

    }

    .back-enter {
        opacity: 1;
        -webkit-transform: translate3d(-110%, 0, 0);
        transform: translate3d(-110%, 0, 0);

    }
    .back-leave{
        opacity: 0;
        /*transform: translate3d(100%, 0, 0);*/
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    .card-scroll {
        height: 100%;
    }
    .card-active {
    }
    .card-page {
        width: 100%;
        position: absolute;
    }
    .wrap, .wrap-card{
        position: relative;
        width: 100%;
        height: 100%;
        background: #1a1d20;
    }
</style>
<template>

    <div class="card-page card-active card-scroll">

        <!-- 页面加载进度条 -->
        <progress-bar :show="progressbar"></progress-bar>

        <!-- 缓存一级路由切换的页面 -->
        <router-view class="g-view" keep-alive :transition="effect" transition-mode="out-in"></router-view>

    </div>

</template>
<script>

    module.exports = {
        data: function() {
            return {
                progressbar           : false,  //loading-bar
                effect            : 'fade', //路由模板动画参数
                routeList         : [],     //访问周期中所访问了那些路径,在route.js中设置
            };
        },
        components:{
            "progressBar":require('./components/progressbar.vue')
        }
    }
</script>