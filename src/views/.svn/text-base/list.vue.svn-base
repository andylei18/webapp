<style>
    body {
        font-family: "Hiragino Sans GB W3","Heiti SC","Helvetica Neue",Helvetica;
        font-size: 1.4rem;
        background: #1a1d20;
        color: #fff;
    }
    .slide-on .page {
        -webkit-animation: slider1 .2s linear forwards;
    }
    @-webkit-keyframes slider1{
        0%{-webkit-transform:translate3d(0,0,0)}
        100%{-webkit-transform:translate3d(27rem,0,0)}
    }
    .scroll-hide {
        height: 100%;
        overflow: hidden;
    }
    .page {
        background-color: #fff;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        overflow-x: hidden;
    }
    .header {
        width: 100%;
        height: 40px;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.7);
        z-index: 10;
        display: block;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .header:after, .header:before {
        content: "";
        display: table;
        clear: both;
    }
    .header .item {
        padding: 0 15px;
        color: #fff;
        float: left;
    }
    .header .iconfont {
        font-size: 24px;
        line-height: 40px;
    }
    .iconfont, .rule span {
        font-size: 1.2rem;
    }
    .iconfont {
        font-family: iconfont!important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: .2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-class:before {
        content: "\e60e";
    }
    .header-search {
        position: relative;
        width: 100%;
        -webkit-flex: 1;
        margin: 0 10px;
        color: #5e5e5e;
    }
    .header .icon-search {
        font-size: 18px;
    }

    .header-search i {
        position: absolute;
        left: 5px;
        top: 17px;
        z-index: 2;
    }
    .header-search input {
        width: 100%;
        height: 32px;
        line-height: 2rem;
        margin: 10px 0 0;
        padding: 5px 3px 5px 30px;
        box-sizing: border-box;
        background: #000;
        color: #5e5e5e;
    }
    .header .item:last-child {
        float: right;
        width: 50%;
        text-align: right;
    }
    .header .user-center {
        position: relative;
        display: inline-block;
        width: 25px;
        height: 100%;
    }
    .header .item:last-child .iconfont {
        font-size: 25px;
    }
    .icon-mine:before {
        content: "\e604";
    }
    .header .cart {
        position: relative;
        display: inline-block;
        color: #fff;
        margin-left: 15px;
    }
    .icon-cart:before {
        content: "\e621";
    }
    .header .cart sup {
        top: 6px;
        right: -8px;
        font-size: 12px;
    }
    sup {
        height: 16px;
        width: 16px;
        line-height: 16px;
        color: #fff;
        background-color: #35c367;
        top: 2px;
        right: 5px;
    }

    .btn-round-cart, sup {
        border-radius: 100%;
        text-align: center;
        position: absolute;
    }
    .header.show,.listScroll.show{
        -webkit-transform: translateX(300px);
        transform: translateX(300px);
    }
    .listScroll {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }
    .listScroll {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
    }

    .page-cover {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 7;
    }
    .ad-banner-crousel {
        width: 100%;
        padding-top: 40px;
    }
    .ad-banner-crousel, .carousel-inner {
        position: relative;
        overflow: hidden;
    }
    .page .ui-product:first-child {
        margin-top: 1rem;
        display: inline-block;
    }
    .ad, .ui-product {
        position: relative;
    }
    .ui-product {
        width: 100%;
        font-size: 0;
        margin-bottom: 1rem;
    }
    img {
        font-size: 0;
        background-size: contain;
    }
    a, button, img {
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: rgba(255,0,0,0);
    }

    .ui-product .reply span {
        padding: 0 10px;
        background: rgba(0,0,0,.7);
        float: left;
        height: 3rem;
    }
    .ui-product .reply {
        position: absolute;
        bottom: 4.5rem;
        right: 0;
        color: #fff;
        font-size: 1.4rem;
        vertical-align: middle;
        line-height: 3rem;
        height: 3rem;
    }
    .icon-mark, .icon-mark:after, .ui-box, .ui-product .reply span, .warn-tips, .warn-tips p {
        display: inline-block;
    }

    h4, p {
        font-size: 1.4rem;
    }
    .ui-product .reply span:last-child {
        background: rgba(21,21,21,.75);
    }
    .icon-love, .icon-lovefull {
        font-size: 1.4rem;
        margin-right: 2px;
        vertical-align: 1px;
        color: #fff;
    }
</style>
<template>

    <div id="applist">
        <div class="page">
            <div class="page-cover" v-if="menu.show" @click="showMenus"></div>

            <!--头部-->
            <header class="header" :class="{'show':menu.show}">
                <div class="item" @click="openMenu">
                    <i class="iconfont icon-class"></i>
                </div>
            <span style="display:none;" class="header-search">
                <i class="icon-search"></i>
                <input class="" placeholder="" value="搜积分月有惊喜">
            </span>
                <div class="item">
            <span class="user-center" v-link="{name:'user',params:{userid:userid}}">
                <i class="iconfont icon-mine"></i>
            </span>
            <span class="cart" v-link="{name:'cart'}">
                <i class="iconfont icon-cart"></i>
                <sup>10</sup>
            </span>
                </div>
            </header>

            <!--默认列表-->
            <div :class="{'show':menu.show}" class="listScroll">
                <section>
                    <section class="carousel ad-banner-crousel" style="height: 140.625px;">
                        <!-- Swiper -->
                        <div class="swiper-container" v-el:swiper>
                            <ul class="swiper-wrapper" v-for="item in banner">
                                <li class="swiper-slide">
                                    <a>
                                        <img :src="item.url" :alt="item.title">
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </section>

                    <section id="goodsList">

                        <a class="ui-product" v-for="item in goodlist" v-link="{name:'detail',params:{goodsid:item.goodsid}}">
                            <img width="100%" :src="item.img">
                            <p class="reply">
                                <span class="tit">{{item.name}}</span>
                            <span class="like">
                                <i class="iconfont icon-love"></i> {{item.price}}
                            </span>
                            </p>
                        </a>

                    </section>
                </section>
            </div>

        </div>

        <!--左侧菜单栏-->
        <bp-menu :show.sync="menu.show" :list.sync="menu.list"></bp-menu>
    </div>


</template>

<script>

    //require('../../src/css/views/home.css');
    require('swiper');
    require('../../node_modules/swiper/dist/css/swiper.min.css');

    module.exports = {
        data: function() {
            return{
                userid:'',
                menu:{
                    show:false,
                    list:[]
                },
                banner:[],
                goodlist:[]
            }
        },
        asyncData: function(resolve, reject) {
            var _self = this;

            _self.getAjax(resolve);

            _self.$nextTick(function() {
                new Swiper(_self.$els.swiper, {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay:3000,
                    loop:true,
                    autoplayDisbleOnInteraction:false

                });
            });
        },
       /* route:{
            data:function(transition){
                var _self = this;



                _self.$nextTick(function() {
                    new Swiper(_self.$els.swiper, {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        autoplay:3000,
                        loop:true,
                        autoplayDisbleOnInteraction:false

                    });
                });
            }

        },*/
        methods: {
            getAjax:function(resolve){
                $.ajax({
                    type: "GET",
                    url:'../../src/mock/list.json',
                    dataType:"json",
                    success :function(data){

                        var json = Mock.mock(data);

                        if(json&&json.code==0){


                            resolve({
                                userid:json.data.userid,
                                menu:{
                                    list:json.data.menu.list
                                },
                                banner:json.data.banner,
                                goodlist:json.data.goodlist
                            });
                        }
                    }
                });
            },
            openMenu:function(){

                $("html, body, .page").addClass("scroll-hide");

                this.menu.show=!this.menu.show;
            },
            showMenus:function(){

                this.menu.show=!this.menu.show;

                $("html, body, .page").removeClass("scroll-hide");

            }
        },
        components:{
            "bpMenu":require('./../components/menu.vue')
        }
    }

</script>
