<style>



    /* 必需 */
    .car-popbox-transition {
        transition: all .3s ease;
        height: 290px;
        overflow: hidden;
    }

    /* .car-popboxenter 定义进入的开始状态 */
    /* .car-popbox-leave 定义离开的结束状态 */
    .car-popbox-enter, .car-popbox-leave {
        height: 0;
        opacity: 0;
    }
</style>

<template>

    <section class="fix-bottom" @click.stop>
        <div class=" ui-fn">
            <div class="ui-fn-info" @click="loveEvent">
                <a href="javascript:void 0;" class="a-light">
                    <i class="iconfont icon-love" :class="popbox.love?'icon-lovefull':''"></i>
                    {{popbox.lovenum}}
                </a>
            </div>
            <div>
                <button type="button" class="btn-green" @click="btnCkEvent('car')">加入购物车</button>
                &nbsp;&nbsp;
                <button type="button" class="btn-buy" @click="btnCkEvent('pay')">立即购买</button>
            </div>
        </div>
    </section>


    <section class="pop-box fix-bt" v-show="popbox.show" transition="car-popbox" @click.stop>
        <div class="buy-entry">
            <div class="pop-cont">
                <h2>{{goods.goodsname}}</h2>
                <div class="ui-fn-info">
                    <p>
                        <strong class="f-price">￥{{goods.price}}</strong>
                        <span class="f-em">（{{goods.discountname}}）</span>
                    </p>
                    <del>原价：￥{{goods.oldprice}}</del>
                </div>
                <div class="ui-fn-select ">
                    <dl>
                        <dt>{{goods.typename}}</dt>
                        <dd>
                            <label v-for="item in goods.typelist" :class="item.ck?'selected':''" @click="selectedType(item)">{{item.size}}CM<i class="iconfont icon-rightp"></i></label>
                        </dd>
                    </dl>
                    <dl>
                        <dt>数量</dt>
                        <dd>
                            <div class="ui-duration">
                                <a href="javascript:void 0;" @click="calculation(0)"><span>-</span></a>
                                <div class="dur-ipt">
                                    <input type="text" :value="selected.numbers" v-model="selected.numbers" maxlength="3"></div>
                                <a href="javascript:void 0;" @click="calculation(1)"><span>+</span></a>
                            </div>
                        </dd>
                    </dl>
                </div>
            </div>
            <button type="button" class="btn-buy" v-show="popbox.pay" @click ="payCallEvent">立即购买</button>
            <button type="button" class="btn-green" v-show="popbox.car" @click="joinCarEvent">加入购物车</button>
        </div>
    </section>
</template>

<script>
    module.exports = {
        replace:true,
        data:function(){
            return{
                popbox:{
                    show:false,
                    car:false,
                    pay:false,
                    love:false,
                    lovenum:100
                },
                selected:{
                    size:"",
                    numbers:1,
                    ck:false,
                    stock:"",
                }
            }
        },
        props:['goods'],
        methods: {
            //打开底部商品选择盒子
            btnCkEvent:function(type){
                var _self = this;

                _self.popbox.show = true;
                _self.maskshow = true;

                if(type=="car"){

                    _self.popbox.car = true;
                    _self.popbox.pay = false;

                }else{

                    _self.popbox.car = false;
                    _self.popbox.pay = true;

                }
            },
            //选择商品规格
            selectedType:function(obj){
                var _self = this,
                        listdata = _self.goods.typelist;

                for(var i in listdata){
                    listdata[i].ck=false;
                }

                obj.ck = true;

                _self.selected.size = obj.size;

                _self.selected.stock = obj.numbers;

                _self.selected.ck = obj.ck;

                _self.selected.numbers = 1;
            },
            //计算选择商品规格的数量
            calculation:function(num){
                var _self = this,
                        obj = _self.selected;

                if(num == 0){

                    if(obj.numbers <= obj.stock && obj.numbers > 1){

                        obj.numbers = parseInt(obj.numbers) - 1;

                    }

                }else{

                    if(obj.numbers < obj.stock){

                        obj.numbers = parseInt(obj.numbers) + 1;

                    }

                }
            },
            //加入购物车
            joinCarEvent:function(num){
                var _self = this,
                        typeid = _self.selected.id,
                        num = _self.selected.numbers,
                        goodsid = _self.$route.params.goodsid;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/joinCar.json',
                    data:{
                        goodsid:goodsid,
                        typeid:typeid,
                        numbers:num
                    },
                    beforeSend:function(){
                        _self.$parent.loadding.show = true;
                    },
                    dataType:"json",
                    success :function(json){

                        _self.$parent.loadding.show = false;

                        _self.$parent.tips.show = true;

                        _self.$parent.tips.text = json.message;

                        if(json&&json.code==0){

                            _self.popbox.show = false;

                        }
                    }
                });
            },
            //立即购买
            payCallEvent:function(){
                var _self = this,
                    typeid = _self.selected.id,
                    num = _self.selected.numbers,
                    goodsid = _self.$route.params.goodsid;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/payCall.json',
                    beforeSend:function(){
                        _self.$parent.loadding.show = true;
                    },
                    data:{
                        goodsid:goodsid,
                        typeid:typeid,
                        numbers:num
                    },
                    dataType:"json",
                    success :function(json){

                        _self.$parent.loadding.show = false;

                        if(json&&json.code==0){

                            _self.$router.go({name:'order',params:{}});

                        }
                    }
                });
            },
            //收藏事件
            loveEvent:function(){
                var _self = this,
                    goodsid = _self.$route.params.goodsid;

                _self.$parent.tips.show = true;

                if(_self.popbox.love){

                    _self.popbox.love = false;

                    _self.popbox.lovenum =  _self.popbox.lovenum - 1;
                }else{

                    _self.popbox.love = true;

                    _self.popbox.lovenum =  _self.popbox.lovenum + 1;
                }

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/payCall.json',
                    beforeSend:function(){
                        _self.$parent.loadding.show = true;
                    },
                    data:{
                        goodsid:goodsid
                    },
                    dataType:"json",
                    success :function(json){

                        _self.$parent.loadding.show = false;

                        _self.$parent.tips.show = true;

                        _self.$parent.tips.text = json.message;

                        if(json&&json.code==0){


                        }
                    }
                });

            }
        }
    };
</script>