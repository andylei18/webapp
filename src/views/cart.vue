<style>
    .box-bar, .box-more, .box-row, .layout-box-bottom {
        padding: 15px;
    }
    .f-thin, del {
        color: #8e8e8e;
    }
    h4, p {
        font-size: 1.4rem;
    }
    .page-pay-cart .layout-box {
        margin: 0 15px;
        border-radius: 5px;
    }
    .c-border, .layout-box {
        background-image: -webkit-linear-gradient(top,transparent,transparent 50%,#2f3237 50%,#2f3237 100%),-webkit-linear-gradient(top,transparent,transparent 50%,#2f3237 50%,#2f3237 100%);
        background-position: 0 top,0 bottom;
        background-size: 100% 1px,100% 1px;
        background-repeat: no-repeat,no-repeat;
        -webkit-transform: translateZ(0);
    }
    .layout-box {
        margin-bottom: 15px;
        background-color: #212427;
    }
    .flex-between, .fx-between {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -webkit-box-pack: justify;
    }
    .layout-box-top {
        background: #24282b;
        border-bottom: 1px solid #1c1d20;
        padding: 10px;
    }
    .box-bar, .box-more, .box-row, .layout-box-bottom {
        padding: 15px;
    }
    .cart-fn {
        position: relative;
    }
    .cart-fn h6 {
        width: 30%;
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.4rem;
        text-overflow: ellipsis;
        color: #8e8e8e;
        position: absolute;
        left: 10px;
        top: 10px;
    }
    .cart-fn .right {
        width: 100%;
    }

    .flex-between button {
        margin-right: 10px;
        flex: 1;
        -webkit-flex: 1;
        -webkit-box-flex: 1;
    }
    .cart-fn button {
        height: 40px;
        font-size: 1.6rem;
        float: right;
        margin-right: 0;
        min-width: 6rem;
    }
    .btn-buy, .btn-green, .btn-primary, .btn-primary-line, .btn-red, .btn-thin, .btn-thin-line {
        border: none;
        height: 32px;
        line-height: 28px;
        border-radius: 4px;
        font-size: 1.4rem;
        padding: 0 10px;
        min-width: 80px;
        text-align: center;
    }
    .btn-green {
        background: #35c367;
        color: #fff;
    }
    .cart-fn .total {
        float: right;
        margin-right: 10px;
    }
    .fz-s {
        font-size: 1.2rem;
    }
    .f-thin, del {
        color: #8e8e8e;
    }

    .page-pay-cart .c-border-up, .page-pay-cart .discout, .page-pay-cart .layout-box-cont {
        background-image: -webkit-linear-gradient(top,transparent,transparent 50%,#383b41 50%,#383b41 100%);
        background-position: 0 top;
        background-size: 100% 1px;
        background-repeat: no-repeat;
        -webkit-transform: translateZ(0);
    }
    .page-pay-cart .layout-box-cont {
        margin-left: 0;
    }
    .ui-g-box {
        clear: both;
        color: #8e8e8e;
        display: block;
        position: relative;
    }
    .layout-box-cont {
        margin-left: 15px;
        padding: 15px 15px 15px 0;
    }
    .c-border-up, .discout, .layout-box .jifen-bar, .layout-box-cont {
        background-position: 0 top;
        background-repeat: no-repeat;
        -webkit-transform: translateZ(0);
    }
    .c-border-bm, .c-border-up, .discout, .layout-box .jifen-bar, .layout-box-cont, .tit-summary, .ui-box-list li {
        background-image: -webkit-linear-gradient(top,transparent,transparent 50%,#2f3237 50%,#2f3237 100%);
        background-size: 100% 1px;
    }
    .ui-g-select {
        padding-left: 4.5rem;
    }
    .add-tap:after, .add-tap:before, .icon-mark:after, .ui-g-box:after, .ui-pic-list:after, .ui-pic-list:before {
        content: "";
    }
    .ui-g-box:after {
        display: table;
        clear: both;
        zoom: 1;
    }
    .ui-g-select .radio {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 32%;
        left: 12px;
        margin-top: -10px;
    }
    .radio i {
        font-size: 24px;
        color: grey;
    }
    .iconRight:before {
        content: "\e605";
    }
    .radio .iconRight{
        color: #5be991;
    }
    .iconIconfontround:before {
        content: "\e622";
    }
    .ui-g-pic {
        width: 8.4rem;
        height: 8.4rem;
        overflow: hidden;
        float: left;
        margin-right: 1rem;
    }
    .ui-g-pic img {
        width: 100%;
    }
    .ui-g-info {
        min-height: 8.4rem;
        position: relative;
    }
    .ui-g-info, .ui-g-info h3 {
        line-height: 2rem;
    }
    .flex-between, .fx-between {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -webkit-box-pack: justify;
    }
    .ui-g-info .flex-between h3 {
        width: 70%;
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.4rem;
        text-overflow: ellipsis;
    }
    .ui-g-info .price, .ui-g-info h3 {
        color: #fff;
        margin-bottom: 2px;
        font-size: 1.4rem;
    }
    .ui-g-info, .ui-g-info h3 {
        line-height: 2rem;
    }
    .price {
        color: #000;
    }
    .ui-g-info .ui-duration {
        width: 40%;
        position: absolute;
        right: 0;
        bottom: 0;
    }



    .ui-duration {
        position: relative;
        border: 1px solid #e8e8e8;
        height: 3.2rem;
        background-color: #f8faf9;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
    }
    .ui-duration a:first-child {
        top: 0;
        left: 0;
        border-right: 1px solid #e8e8e8;
        border-radius: 5px 0 0 5px;
    }
    .pop-box, .ui-duration a {
        position: absolute;
    }
    .ui-duration a {
        display: inline-block;
        background-color: #f7f7f7;
        text-align: center;
        height: 3rem;
        line-height: 2.6rem;
        width: 3rem;
        overflow: hidden;
        vertical-align: middle;
        color: #cbcbcb;
        z-index: 3;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .ui-duration a:last-child {
        top: 0;
        right: 0;
        border-left: 1px solid #e8e8e8;
        border-radius: 0 5px 5px 0;
    }
    .duration-gray a {
        background-color: #2c3033;
        color: #5b5e61;
    }
    .duration-gray, .duration-gray a:first-child, .duration-gray a:last-child {
        border-color: #212325;
    }
    .duration-gray {
        background-color: #2a2d32;
    }
    .ui-duration a span {
        height: 16px;
        width: 16px;
        display: block;
        line-height: 16px;
        margin: 8px auto 0;
        font-size: 2.4rem;
    }
    .dur-ipt {
        margin: 0 3.2rem;
        display: block;
    }
    .ui-duration input {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-align: center;
        color: #333;
        padding: 0;
        display: block;
        height: 3rem;
        width: 100%;
        font-size: 15px;
    }
    .duration-gray input {
        color: #b3b3b3;
        width: 70%;
        position: absolute;
        left: 50%;
        margin-left: -35%;
    }


    .cart-del {
        position: absolute;
        bottom: 5px;
        right: 45%;
    }
    .cart-del i {
        font-size: 18px;
        color: #6b6d71;
    }
    .icon-delete:before {
        content: "\e61c";
    }
    .page-pay-cart .discout {
        margin-top: 1.5rem;
        padding-top: 1.3rem;
    }
    .f-em {
        color: #45c674;
    }
    .switch-off, .switch-on {
        width: 50px;
        height: 20px;
        border-radius: 18px;
        display: inline-block;
        background-color: #22b93c;
        position: relative;
    }
    .switch-on i {
        right: 0;
    }
    .switch-off i, .switch-on i {
        width: 24px;
        height: 24px;
        display: block;
        background-color: #f2f2f2;
        border-radius: 100%;
        position: absolute;
        top: -2px;
    }
    .box-more {
        text-align: center;
        color: #878787;
    }
</style>

<template>

    <section class="wrap-card">

        <!--加载框-->
        <loading :show="loadding.show"></loading>

        <!--提示语框-->
        <tips :show.sync="tips.show" :text="tips.text"></tips>

        <section class="page-pay-cart">
            <p class="box-row f-thin">可用积分：{{userpoints}}</p><section class="layout-box level" number="1">
            <div class="layout-box-top flex-between box-row cart-fn">
                <h6> 时趣互动 </h6>
                <div class="right ">
                    <button type="button" class="btn-green" @click="payAll">结算</button>
                    <div class="total">
                        <p>{{totalprice| currency '￥'}}</p>
                        <p class="fz-s">
                            <span class="f-thin">共{{total}}件</span>（减0元）
                        </p>
                    </div>
                </div>
            </div>


            <div class="layout-box-cont ui-g-box" v-for="item in list">
                <div class="ui-g-select">
                    <div class="radio" @click="choice(item)">
                        <i class="iconfont" :class="item.ck?'iconRight':'iconIconfontround'"></i>
                        <!--默认iconfontround-->
                    </div>
                    <div class="ui-g-pic">
                        <img :src="item.img" width="100%"></div>
                    <div class="ui-g-info ">
                        <div class="flex-between">
                            <h3>{{item.name}}</h3>
                            <span class="price">￥{{item.price }}</span>
                        </div>
                        <p class="f-thin">{{item.name}}&nbsp;&nbsp;</p>
                        <div class="ui-duration duration-gray">
                            <a href="javascript:void 0;" @click="calculation(0,item)">
                                <span>-</span>
                            </a>
                            <div class="dur-ipt ">
                                <input disabled="" type="text" :value="item.numbers" v-model="item.numbers">
                            </div>
                            <a href="javascript:void 0;" @click="calculation(1,item)">
                                <span>+</span>
                            </a>
                        </div>
                        <span class="cart-del" @click="delEvent(item.id)">
                            <i class="iconfont icon-delete"></i>
                        </span>
                    </div>
                    <!--积分区-->
                    <div class="discout flex-between">
                        <p class="f-em">{{item.discountname}}</p>

                        <div v-if="!item.ck" :class="item.discount?'switch-on':'switch-off'">
                            <i></i>
                        </div>
                        <div v-if="item.ck" :class="item.discount?'switch-on':'switch-off'" @click="clickHandler(item)">
                            <i></i>
                        </div>

                    </div>
                    <!--积分区  end-->
                </div>
            </div>


            <div class="box-more c-border-up" style="display:none;">
                全部商品
                <i class="iconfont icon-ar-downthin"></i>
            </div>

        </section>
        </section>
    </section>

</template>

<script>
    module.exports = {
        data:function(){
            return{
                userpoints:0,
                userid:"110",
                totalprice:"0",
                total:0,
                list:[],
                loadding:{
                    show:false,
                    text:""
                },
                tips:{
                    show:false,
                    text:""
                }
            }
        },
        route:{
             data:function(transition){
                 var _self = this;

                 _self.getAjaxData(transition);

             }
        },
        methods: {
            //请求当前用户购物车数据
            getAjaxData:function(transition){
                var _self = this;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/cart.json',
                    data:{
                        userid:_self.userid
                    },
                    beforeSend:function(){
                        _self.loadding.show = true;
                    },
                    dataType:"json",
                    success :function(json){

                        _self.loadding.show = false;

                        if(json&&json.code==0){

                            transition.next({

                                list:json.data.cartlist

                            });

                        }
                    }
                });

            },
            //选中和取消当前礼品
            choice:function(obj){

                var _self = this;

                if(obj.ck){

                    obj.ck = false;

                    _self.total = parseInt(_self.total) - 1;

                    _self.totalprice = parseInt(_self.totalprice) - obj.price * obj.numbers;

                }else{

                    obj.ck = true;

                    _self.total = parseInt(_self.total) + 1;

                    _self.totalprice = parseInt(_self.totalprice) + obj.price * obj.numbers;

                }

            },
            //计算礼品数量
            calculation:function(num,obj){

                var _self = this;

                if(num == 0){

                    if(obj.numbers > 1){

                        obj.numbers = parseInt(obj.numbers) - 1;

                        _self.totalprice = parseInt(_self.totalprice) - obj.price;

                    }

                }else{

                    obj.numbers = parseInt(obj.numbers) + 1;

                    _self.totalprice = parseInt(_self.totalprice) + obj.price;

                }


            },
            //删除当前礼品
            delEvent:function(id){
                var _self = this;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/cart.json',
                    data:{
                        userid:_self.userid,
                        ecid:id
                    },
                    dataType:"json",
                    beforeSend:function(){
                        _self.loadding.show = true;
                    },
                    success :function(json){

                        _self.loading.show = false;

                        if(json&&json.code==0){

                            this.list = json.data.cartlist

                        }
                    }
                });
            },
            //活动开关
            clickHandler:function(obj){
                var _self = this;

                if(_self.userpoints == 0 ){

                    _self.tips.show = true;

                    _self.tips.text = "您得剩余积分不够兑换此商品!";

                }else{

                    _self.tips.show = false;

                    _self.tips.text = "";

                    obj.discount = true;
                }
            },
            //结算所有礼品
            payAll:function(){
                var _self = this;

                if(_self.total==0){

                    _self.tips.show = true;

                    _self.tips.text = "您还没有选择要付款的商品!";

                }else{

                    //请求后台生成订单
                    _self.ajaxOrder();
                }

            },
            //请求后台生成订单
            ajaxOrder:function(){

                var _self = this;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/true.json',
                    dataType:"json",
                    data:{

                    },
                    beforeSend:function(){
                        _self.loadding.show = true;
                    },
                    success :function(json){

                        _self.loadding.show = false;

                        if(json&&json.code==0){

                            _self.$router.go({name:'order',params:{}});

                        }
                    }
                });
            }
        },
        components:{
            "loading":require('./../components/loading.vue'),
            "tips":require('./../components/tips.vue')
        }
    }
</script>