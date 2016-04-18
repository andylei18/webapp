<style>

    .btn-buy {
        min-width: 74px;
    }
    .buy-entry button {
        border: none;
        font-size: 1.8rem;
        height: 55px;
        border-radius: 0;
        width: 100%;
        display: block;
    }
    .buy-entry .ui-duration {
        width: 43%;
        min-width: 87px;
    }
    .ui-fn-select label:last-child {
        margin-right: 0;
    }
    .ui-fn-select label i {
        position: absolute;
        height: 1rem;
        right: -1px;
        bottom: 0;
        display: none;
        z-index: 10;
        background: tomato;
        color: #fff;
        line-height: 1.4rem;
        font-size: 1.3rem;
        border-radius: 0 0 5px;
    }
    .ui-fn-select label.selected i {
        display: block;
    }
    .ui-fn-select label {
        background: #fff;
        text-align: center;
        border: thin solid #e8e8e8;
        border-radius: 5px;
        margin-right: 10px;
        position: relative;
        min-width: 19%;
        padding: 0 3px;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
        float: left;
        margin-bottom: 5px;
        font-size: 14px;
    }
    .ui-fn-select label.selected {
        border: thin solid tomato;
    }
    .ui-fn-select dd {
        margin-left: 5.2rem;
        line-height: 3.4rem;
        height: 3.4rem;
        margin-bottom: 5px;
        display: block;
    }
    .ui-fn-select dt {
        position: absolute;
        left: 0;
        line-height: 3.2rem;
        text-align: justify;
        font-size: 12px;
    }
    .ui-fn-select dl {
        position: relative;
        margin: 20px 0;
        clear: both;
    }
    .buy-entry .ui-fn-info {
        margin: 10px 0;
    }
    .address dt, .buy-entry button, .float-menu h2, .pop-cont h2, .ui-comment h5 {
        font-weight: 700;
    }
    .pop-cont {
        padding: 5px 15px 15px;
    }
    .buy-entry {
        padding-bottom: 0;
        width: 100%;
        background: #fafafa;
        color: #353535;
        padding-top: 10px;
        min-height: 250px;
    }
    .fix-bt {
        position: fixed;
        bottom: 0;
    }
    .btn-buy, .btn-primary {
        background-color: tomato;
        color: #fff;
    }
    .btn-buy {
        min-width: 74px;
    }
    .fix-bottom button {
        width: 100px;
    }
    .ui-fn i {
        font-size: 2.4rem;
    }
    a, a.a-light, button, img {
        text-decoration: none;
    }
    a.a-light {
        color: #fff;
    }
    .ui-fn {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -webkit-box-pack: justify;
    }
    .fix-bottom .ui-fn {
        margin: 10px 15px;
    }
    .fix-bottom, .pop-box {
        z-index: 100;
        width: 100%;
    }
    .fix-bottom {
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: rgba(12,12,12,.9);
    }
    .point {
        height: 7px;
        width: 7px;
        margin-right: 7px;
        display: inline-block;
        border-radius: 7px;
        -webkit-border-radius: 7px;
        background: #fff;
        opacity: .7;
    }
    .slider-num .on {
        background-color: #fff;
        opacity: 1;
    }
    .slider-num {
        overflow: hidden;
        text-align: center;
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
    }
    .slider ul li img {
        z-index: 1;
        height: auto;
        max-width: 640px;
        min-width: 320px;
        width: 100%;
    }
    .slider ul li {
        float: left;
        font-size: 0;
    }
    .slider ul {
        font-size: 0;
        position: relative;
    }
    .slider {
        overflow: hidden;
        width: 100%;
        position: relative;
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
    .btn-round-cart i {
        color: #fff;
        font-size: 2.4rem;
    }
    .btn-round-cart, sup {
        border-radius: 100%;
        text-align: center;
        position: absolute;
    }
    .btn-round-cart {
        width: 4.5rem;
        height: 4.5rem;
        line-height: 4.8rem;
        background-color: rgba(0,0,0,.6);
        z-index: 1000;
        right: 5%;
        top: 5%;
    }
    .ui-pic-list .pic {
        padding: 5px;
        margin-right: 10px;
        display: block;
    }
    .ui-pic-list {
        margin-right: -10px;
    }
    .wrap-summary .photo img {
        width: 100%;
        height: auto;
        display: block;
    }
    .wrap-summary .photo {
        text-align: left;
        color: #888;
    }
    .servise-box .layout-box-cont dl.tip dd p, .servise-box .layout-box-cont dl.tip dt p {
        font-size: 1.1rem;
    }
    .servise-box .layout-box-cont dl.tip {
        margin-bottom: 10px;
    }
    .servise-box .layout-box-cont dl dd span {
        font-size: 1.3rem;
    }
    .servise-box .layout-box-cont dl.contact p span {
        display: inline-block;
    }
    .servise-box .layout-box-cont dl dd p {
        font-size: 1.3rem;
        margin-bottom: 15px;
    }
    .servise-box .layout-box-cont dl.contact p {
        font-size: 0;
    }
    .servise-box .layout-box-cont dl dd {
        color: #1e1e1e;
    }
    .servise-box .layout-box-cont dl dt {
        color: #b3b3b3;
        margin-bottom: 15px;
    }
    .servise-box .layout-box-cont dl {
        font-size: 1.3rem;
        margin-bottom: 20px;
    }
    .servise-box .company-name {
        font-size: 1.3rem;
        color: #1e1e1e;
        margin-bottom: 20px;
    }
    .servise-box .layout-box-cont.show {
        display: block;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .servise-box .layout-box-tit .iconfont {
        position: absolute;
        right: 10px;
        top: 0;
        color: #c0c0c1;
    }
    .servise-box .layout-box-tit.active .iconfont {
        transform: rotate(180deg);
    }
    .servise-box .layout-box-tit {
        position: relative;
    }
    .row-more span {
        color: #c0c0c1;
        line-height: 18px;
        background: #efeff4;
        position: relative;
        height: 15px;
        top: -10px;
        padding: 10px;
    }
    .row-more {
        margin: 25px 15px;
        position: relative;
        text-align: center;
        height: 0;
    }
    .ui-comment p {
        color: #8c8c8c;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
    }
    .ui-comment h5 {
        font-size: 1.4rem;
        padding-bottom: 5px;
    }
    .ui-comment {
        display: inline-block;
        margin-left: 5rem;
    }
    .user-pic {
        width: 4.2rem;
        height: 4.2rem;
        display: block;
        border-radius: 4rem;
        overflow: hidden;
        background: #ccc;
        margin-right: 10px;
        position: absolute;
        top: 0;
    }
    .ui-comment-box {
        padding-bottom: 10px;
        position: relative;
    }
    .wrap-summary .ui-comment-box:last-child {
        padding-bottom: 0;
    }
    .wrap-summary .layout-box-tit, .wrap-summary .ui-comment-box {
        color: #333;
    }
    .wrap-summary .layout-box {
        background-color: #fff;
    }
    .wrap-summary .layout-box, .wrap-summary .layout-box-cont {
        border-color: #d7d7d7;
    }
    .wrap-summary .bc-bg {
        padding-top: 10px;
    }
    .iconfont {
        font-family: iconfont!important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: .2px;
        -moz-osx-font-smoothing: grayscale;
    }
    .g-summary .box-more {
        color: rgba(255,255,255,.67);
        margin-left: 15px;
    }
    .g-summary p, .g-summary summary {
        line-height: 24px;
        overflow: hidden;
        display: -webkit-box;
        display: -webkit-flex;
        -webkit-line-clamp: 4;
        margin: 15px;
    }
    del {
        padding-left: 4px;
    }
    .g-summary .tit span {
        padding-left: 5px;
    }
    .f-price {
        font-size: 1.6rem;
    }
    .g-summary h2 {
        font-size: 1.8rem;
        line-height: 32px;
        padding-bottom: 5px;
    }
    .g-summary .tit {
        padding: 15px 15px 0;
    }
    .g-summary {
        box-sizing: border-box;
        background-color: rgba(0,0,0,.3);
        color: #FFF;
        padding-bottom: 6rem;
    }
    .wrap-summary {
        z-index: 10;
        position: absolute;
        top: 400px;
        left: 0;
        width: 100%;
        margin-bottom: 50px;
    }
    .mask {
        background: rgba(0,0,0,.5);
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 50;
    }
    .mask, .turn-right {
        position: absolute;
    }
    .btn-round-cart {
        width: 4.5rem;
        height: 4.5rem;
        line-height: 4.8rem;
        background-color: rgba(0,0,0,.6);
        z-index: 1000;
        right: 5%;
        top: 5%;
    }
    .btn-round-cart, sup {
        border-radius: 100%;
        text-align: center;
        position: absolute;
    }
    .page {
        background-color: #fff;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        overflow-x: hidden;
    }
</style>

<template>

    <div class="page">

        <!--加载框-->
        <loading :show="loadding.show"></loading>

        <!--提示语框-->
        <tips :show.sync="tips.show" :text="tips.text"></tips>

        <div class="wrap">
            <div class="wrap-summary" style="top: 573px; transform: translateY(0px);">
                <section class="g-summary">
                    <div class="tit">
                        <h2>{{goods.goodsname}}</h2>
                        <div>
                            <strong class="f-price">￥{{goods.price}}</strong>
                            <em class="f-em">（{{goods.discountname}}）</em>
                            <span class="f-thin">(库存{{goods.stock}}件) </span>
                        </div>
                        <div>
                            <del>原 价：￥{{goods.oldprice}}</del>
                        </div>
                    </div>
                    <p> 憨态可掬的Q妹，曾走进了无数电脑屏幕，右下角的滴滴闪烁，成就了多少对相隔万里的恋人！买一对吧，把相遇变成陪伴，...</p>
                    <div class="box-more">
                        查看更多
                        <i class="iconfont icon-arrowbt"> </i>
                    </div>
                </section>
                <div class="bc-bg">
                    <section style="display: none;" class="layout-box border">
                        <h2 class="layout-box-tit">1条评论</h2>
                        <div class="layout-box-cont border">
                            <div class="ui-comment-box ">
                                <i class="user-pic"><!--<img src="" width="100%"> --></i>
                                <div class="ui-comment">
                                    <h5>林小红</h5>
                                    <p>行行青松翠柏里不曾有我生命的影子花丛中不曾有我生命的芳踪，行行青松翠柏里不曾有我生命的影子。</p>
                                </div>
                            </div>
                        </div>
                        <div class="box-more">更多评价 <i class="iconfont icon-arrowbt"></i></div>
                    </section>
                    <div style="display: none;" class="row-more border-up">
                        <span>继续拖动，查看详情</span>
                    </div>
                    <section class="layout-box servise-box">
                        <h2 class="layout-box-tit" :class="servise.active?'active':''">联系客服<i class="iconfont icon-ar-downthin" @click.stop="this.servise.active=!this.servise.active"></i></h2>
                        <div class="layout-box-cont border-up show" v-show="servise.active">
                            <div class="company-name">商家-鲜橙公司</div>
                            <dl class="contact">
                                <dt>商家联系方式：</dt>
                                <dd>
                                    <p><span>电话：</span><span>400-869-3336</span></p>
                                    <p><span>Q&nbsp;Q：</span><span>4008693336</span></p>
                                    <p><span>微信：</span><span>qqjifen_pay</span></p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>商家服务时间：</dt>
                                <dd>
                                    <p>在线时间：9:00-24:00    电话时间：9:00-18:00</p>
                                </dd>
                            </dl>
                            <dl class="tip" style="display: none">
                                <dt>温馨提示：</dt>
                                <dd>
                                    <p>愚人节活动期间订单火爆，预售鼠标垫和卡片电源2周左右发货，感谢您的耐心等待！</p>
                                </dd>
                            </dl>
                        </div>
                    </section>
                    <section class="layout-box border">
                        <h2 class="layout-box-tit">商品详情</h2>
                        <div class="layout-box-cont border-up">
                            <div class="photo">
                                <div style="text-align: center;">

                                    <!--轮播图-->
                                    <swipe :speed="swipe.speed">
                                        <swipe-item>
                                            <img :src="http://p.qpic.cn/qqjifen_pic/0/upload_45b43cedd4885c4e1b3e003b077bc8cc/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>
                                        <!--<swipe-item>
                                            <img v-lazy="http://p.qpic.cn/qqjifen_pic/0/upload_e824114959516f150388425109813c88/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>
                                        <swipe-item>
                                            <img v-lazy="http://p.qpic.cn/qqjifen_pic/0/upload_eafdb51a1ce9c691e22d0e6d3f49f59c/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>
                                        <swipe-item>
                                            <img v-lazy="http://p.qpic.cn/qqjifen_pic/0/upload_53ba4a95b395de98d66185a05b595700/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>
                                        <swipe-item>
                                            <img v-lazy="http://p.qpic.cn/qqjifen_pic/0/upload_0463745c73b4798538e57f17599fecc8/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>
                                        <swipe-item>
                                            <img v-lazy="http://p.qpic.cn/qqjifen_pic/0/upload_46afcee77bbb04affab6ab87669ca21a/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>
                                        <swipe-item>
                                            <img v-lazy="http://p.qpic.cn/qqjifen_pic/0/upload_a12cd81192f8a8172140de3fee0fd79f/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>
                                        <swipe-item>
                                            <img v-lazy="http://p.qpic.cn/qqjifen_pic/0/upload_f518e38afe9f5130110728135dde5b6d/640" border="0" width="640" height="640" alt="">
                                        </swipe-item>-->
                                    </swipe>



                                    <!--<img src="http://p.qpic.cn/qqjifen_pic/0/upload_e23d1df0552b9d9055c35f40236a880d/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_e824114959516f150388425109813c88/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_eafdb51a1ce9c691e22d0e6d3f49f59c/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_53ba4a95b395de98d66185a05b595700/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_0463745c73b4798538e57f17599fecc8/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_9caa328dccc67f8ca24a0eb3e962e118/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_46afcee77bbb04affab6ab87669ca21a/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_a12cd81192f8a8172140de3fee0fd79f/640" border="0" width="640" height="640" alt="">
                                    <img src="http://p.qpic.cn/qqjifen_pic/0/upload_f518e38afe9f5130110728135dde5b6d/640" border="0" width="640" height="640" alt="">-->


                                </div>
                                <div>
                                    <div>
                                        <div>您在购买过程中遇到疑问或需要帮助，可以联系客服帮您解决问题哦。</div>
                                        <div>客服QQ：2850692229</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!--<section class="layout-box border">
                        <h2 class="layout-box-tit">精品推荐</h2>
                        <div class="layout-box-cont ui-pic-list">
                            <div class="pic">
                                <img width="100%">
                            </div>
                            <div class="pic">
                                <img width="100%">
                            </div>
                            <div class="pic">
                                <img src="" width="100%">
                            </div>
                        </div>
                    </section>-->
                </div>
            </div>
            <div class="mask" v-show="maskshow"></div>
            <div class="btn-round-cart">
                <i class="iconfont icon-cart"></i>
                <sup>1</sup>
            </div>
            <section class="slider">
                <ul>
                    <!--<li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_720df155098b2874c74040d59e0da41e/0" width="100%"></li>
                    <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_14154717055ddec763379c05df5e5f3e/0" width="100%"></li>
                    <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_bf099cc7a24e71057180769d1e51c651/0" width="100%"></li>
                    <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_d3189304fc9be84fb638a9ca22741db3/0" width="100%"></li>
                    <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_b20067753ffb95fafdf7d170d050b5d7/0" width="100%"></li>-->

                    <!--<swipe :speed="swipe.speed">
                        <swipe-item>
                            <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_720df155098b2874c74040d59e0da41e/0" width="100%"></li>
                        </swipe-item>
                        <swipe-item>
                            <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_720df155098b2874c74040d59e0da41e/0" width="100%"></li>
                        </swipe-item>
                        <swipe-item>
                            <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_720df155098b2874c74040d59e0da41e/0" width="100%"></li>
                        </swipe-item>
                        <swipe-item>
                            <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_720df155098b2874c74040d59e0da41e/0" width="100%"></li>
                        </swipe-item>
                        <swipe-item>
                            <li style="width:20%"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_720df155098b2874c74040d59e0da41e/0" width="100%"></li>
                        </swipe-item>
                    </swipe>-->


                </ul>
                <div class="slider-num">
                    <span class="point on"></span>
                    <span class="point"></span>
                    <span class="point"></span>
                    <span class="point"></span>
                    <span class="point"></span>
                </div>
            </section>
        </div>

        <!--底部购物车盒-->
        <cartbox :goods="goods" v-ref:cartbox></cartbox>
    </div>


</template>

<script>

    require('../../node_modules/vue-swipe/lib/vue-swipe.css');

    var swiper = require('vue-swipe');
    var Swipe = swiper.Swipe;
    var SwipeItem = swiper.SwipeItem;

    module.exports = {
        replace:true,
        data:function(){
              return{
                  loadding:{
                    show:false
                  },
                  tips:{
                      show:false,
                      text:""
                  },
                  swipe:{
                      speed:3000
                  },
                  servise:{
                      active:false
                  },
                  maskshow:false,
                  goods:{
                      goodsname:"",
                      typename:"",
                      typelist:[],
                      discount:true,
                      discountname:"",
                      price:"",
                      oldprice:"",
                      stock:""
                  },
              }
        },
        route:{
            data:function(transition){
                var _self = this;
                //请求礼品的详细数据
                _self.getAjax(transition);

                document.addEventListener("click",function(e){
                    //关闭加入购物车
                    _self.$refs.cartbox.popbox.show = false;
                    _self.maskshow = false;
                });

            }

        },
        methods: {
            //请求礼品的详细数据
            getAjax:function(transition){

                var _self = this,
                    goodsid = _self.$route.params.goodsid;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/detail.json',
                    data:{
                        goodsid:goodsid
                    },
                    dataType:"json",
                    success :function(json){

                        //请求完毕关闭进度条
                        _self.$route.router.app.progressbar = false;

                        if(json&&json.code==0){

                            transition.next({
                                goods:{
                                    goodsname:json.data.goodsname,
                                    typename:json.data.typename,
                                    typelist:json.data.typelist,
                                    discount:json.data.discount,
                                    discountname:json.data.discountname,
                                    price:json.data.price,
                                    oldprice:json.data.oldprice
                                },
                                selected:{
                                    size:json.data.typelist[0].size,
                                    numbers:1,
                                    ck:json.data.typelist[0].ck,
                                    stock:json.data.typelist[0].numbers,
                                }

                            });

                        }
                    }
                });

            },
        },
        components:{
            "loading":require('./../components/loading.vue'),
            "swipe":Swipe,
            "swipe-item":SwipeItem,
            "tips":require('./../components/tips.vue'),
            "cartbox":require('./../components/cartbox.vue')
        }
    };
</script>