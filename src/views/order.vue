<style>
    .address {
        position: relative;
        color: #8e8e8e
    }

    .address dt {
        color: #fff
    }

    .address, .order-product .ui-g-box {
        padding: 15px;
    }

    .address p {
        margin-bottom: 3px;
        line-height: 1.5
    }

    .address .icon-arrow {
        width: 30px;
        height: 30px;
        display: block;
        position: absolute;
        top: 50%;
        right: 10px;
        margin-top: -15px;
        color: #5c5d5e;
        font-size: 30px
    }
    .list-entry .warn {
        color: #fff
    }

    .list-entry .warn .icon-warn {
        color: #e5151a
    }

    .list-entry {
        padding: 5px 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -webkit-box-pack: justify
    }

    .list-entry a {
        color: #888
    }

    .list-entry dt {
        text-align: left;
        color: #b3b3b3;
        width: 4rem
    }

    .list-entry dd {
        color: #888;
        margin-left: 5px;
        text-align: left;
        flex: 1;
        -webkit-flex: 1;
        -webkit-box-flex: 1
    }
    .address dd {
        margin-right: 30px
    }
    .icon-warn:before {
        content: "\e609";
    }

    .layout-box-tit, .ui-nav-tap ul {
        line-height: 4.4rem;
        height: 4.4rem;
    }
    .layout-box-tit {
        font-size: 1.6rem;
        margin-left: 15px;
    }
    .tit-summary {
        padding-left: 15px;
        color: #8e8e8e;
        margin-bottom: 10px;
        margin-top: -5px;
    }
    .order-product .tit-summary {
        background-image: none;
    }
    .box-full .layout-box-cont, .full {
        margin-left: 0;
    }
    .product-value .ui-g-info {
        padding-right: 60px;
    }
    .ui-g-info {
        min-height: 8.4rem;
        position: relative;
    }
    .product-value .ui-g-info h3 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
    }
    .product-value .ui-g-value {
        position: absolute;
        top: 15px;
        right: 15px;
        text-align: right;
        color: #fff;
    }
    .product-value .ui-g-value p {
        padding-bottom: 5px;
    }
    .price-info {
        padding: 0 15px 15px;
        color: #a3a3a3;
        line-height: 24px;
    }
    .price-info dl {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -webkit-box-pack: justify;
    }
    .pop-cont {
        padding: 5px 15px 15px;
    }
    .fn-pay .row {
        text-align: right;
        font-size: 1.8rem;
        margin: 10px 0 20px;
    }





    .btn {
        width: 100%;
        line-height: 30px;
        font-size: 1.6rem;
        padding: 0 8%;
        background: #ccc;
        background-image: -webkit-linear-gradient(top,#f2f2f2,#e6e6e6);
        text-align: center;
        border-radius: 5px;
        color: #333;
        border: thin solid #d7d7d7;
        display: inline-block;
        cursor: default;
        height: 42px;
        font-family: "microsoft yahei",helvetica;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .btn-qq, .btn-wx {
        border: none;
        height: 42px;
        color: #fff;
    }
    .fn-pay .btn-qq {
        background-color: #578de5;
        background-image: -webkit-linear-gradient(top,#578de5,#578de5);
    }
    .fn-pay .btn-wx {
        background-color: #21b100;
        background-image: -webkit-linear-gradient(top,#21b100,#21b100);
    }

    .fn-pay button {
        margin-bottom: 15px;
    }
</style>
<template>

    <section class="wrap iscroll">
        <div>


            <!--收货地址-->
            <section class="layout-box address " v-link="{name:'address',params:{uid:1111}}">
                <dl class="list-entry" v-show="address.show">
                    <dt>送至</dt>
                    <dd>
                        <p>{{address.addressAddress}}</p>
                        <p>{{address.addressName}}  {{address.addressTel}}</p>
                    </dd>
                </dl>
                <dl class="list-entry"  v-show="linkaddress">
                    <dd class="warn"><i class="iconfont icon-warn"></i> 请完善收货地址</dd>
                </dl>
                <i class="iconfont icon-arrow"></i>
            </section>




            <!--订单-->
            <section class="layout-box box-full order-product">
                <h2 class="layout-box-tit">订单信息</h2>
                <!--<p class="tit-summary ">商家：合泰公司</p>-->
                <div class="layout-box-cont ui-g-box product-value">
                    <div class="ui-g-pic">
                        <img src="http://p.qpic.cn/qqjifen_pic/0/upload_f932d042fbc804fb87e75e3ba66d26ba/0" width="100%"></div>
                    <div class="ui-g-info ">
                        <h3>DNF魔剑阿波菲斯</h3>
                        <p class="f-thin"><span class="lable">颜色：</span>黑叻色</p>
                        <p class="f-thin"><span class="lable">商品款式：</span>款式A</p>
                    </div>
                    <div class="ui-g-value">
                        <p>￥38</p>
                        <p>X1</p>
                    </div>
                    <p class="right" style="display:none;">抵扣：15积分减3元</p>
                </div>
            </section>
            <section class="price-info c-border-bm">
                <dl class="f-em">
                    <dt>抵扣</dt>
                    <dd>0积分减0元</dd>
                </dl>
                <dl>
                    <dt>运费</dt>
                    <dd>￥8</dd>
                </dl>
            </section>



            <!--支付-->
            <section class="fn-pay">
                <div class="pop-cont">
                    <p class="row">
                        <span class="f-thin">需支付</span>
                        <strong>￥46</strong>
                    </p>
                    <button type="button" class="btn btn-wx" @click="placeOrder('wx')">微信支付</button>
                    <button type="button" class="btn btn-qq" @click="placeOrder('qq')">QQ钱包支付</button>
                </div>
            </section>



        </div>
    </section>
</template>

<script>

    module.exports = {
        replace:true,
        data:function(){
            return{
                address:{
                    show:false,
                    addressName:"",
                    addressTel:"",
                    addressAddress:"",
                    addressPostCode:""
                },
                linkaddress:false
            }
        },
        route:{
            data:function(transition){
                var _self = this;


                //获取订单 信息数据
                _self.ajaxGetOrderList(transition);
            }

        },
        watch:{
            'address.show':function(val,oldval){
                console.log(val)
            }
        },
        methods: {
            //获取订单 信息数据
            ajaxGetOrderList:function(transition){
                var _self = this,
                    uid = transition.to.params.uid,
                    orderid = transition.to.params.orderid;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/getorderList.json',
                    dataType:"json",
                    data:{
                        uid:uid,
                        orderid:orderid
                    },
                    success :function(json){

                        if(json&&json.code==0){

                            transition.next({
                                address:{
                                    addressName:json.data.addressName,
                                    addressTel:json.data.addressTel,
                                    addressAddress:json.data.addressAddress,
                                    addressPostCode:json.data.addressPostCode
                                }
                            });

                            if(json.data.addressName!=""){
                                _self.address.show = true;
                                _self.linkaddress = false;
                            }else{
                                _self.address.show = false;
                                _self.linkaddress = true;
                            }

                        }
                    }
                });


            },
            //提交订单
            placeOrder:function(_type){
                var _self = this;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/true.json',
                    dataType:"json",
                    data:{
                        payType:_type
                    },
                    success :function(json){

                        if(json&&json.code==0){



                        }
                    }
                });

            }
        }

    }

</script>
