<style>
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

</template>

<script>

    module.exports = {
        replace:true,
        props: ["goodlist"],
        ready:function(){
            var _self = this;

            _self.$nextTick(function() {

                new Swiper(_self.$el, {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });
            });
        },
        components:{
            "list":require('./../components/list.vue')
        }

    }
</script>