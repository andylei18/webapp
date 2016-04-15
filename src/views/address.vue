<style>
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
    .btn-wx {
        background-color: #21b100;
        background-image: -webkit-linear-gradient(top,#21b100,#21b100);
    }
    .btn-wrap button {
        width: 100%;
        margin-bottom: 10px;
        display: block;
    }
    .btn-wrap {
        margin: 10px;
    }
    .field-group .control-group:last-child {
        border-bottom: none;
    }
    .theme .control-group {
        background: -webkit-linear-gradient(top,transparent,transparent 50%,#17181a 50%) 0 bottom no-repeat;
        background-size: 100% 1px;
    }
    .textarea textarea {
        width: 70%;
        vertical-align: middle;
        font-size: 15px;
        color: #fff;
        position: absolute;
        top: 15px;
    }
    .textarea .control-label {
        line-height: 24px;
        padding-top: 13px;
    }
    .controls input {
        margin-top: 9px;
        width: 100%;
        font-size: 15px;
        height: 34px;
        line-height: normal;
        outline: 0;
        vertical-align: top;
        color: #000;
    }
    .theme .controls input {
        color: #fff;
    }
    .control-group:after {
        clear: both;
    }
    .control-group:after, .control-group:before {
        display: table;
        content: "";
    }
    .controls {
        display: inline-block;
        width: 62%;
    }
    .control-label {
        float: left;
        line-height: 52px;
        min-width: 100px;
        width: 25%;
        text-align: left;
        color: #000;
        display: inline-block;
        padding-left: 15px;
    }
    .theme .control-label {
        color: #fff;
    }

    .field-group .control-group .control-label {
        padding-left: 0;
    }
    .control-group:after, .control-group:before {
        display: table;
        content: "";
    }
    .field-group .control-group {
        min-height: 52px;
        padding-left: 0;
        margin-left: 15px;
        margin-bottom: 0;
    }
    .theme .control-group {
        background: -webkit-linear-gradient(top,transparent,transparent 50%,#17181a 50%) 0 bottom no-repeat;
        background-size: 100% 1px;
    }
    .field-group {
        border-top: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        margin-bottom: 15px;
        background: #fff;
    }
    .theme {
        background-color: #1e2023;
        border-color: #17181a;
    }
</style>

<template>

    <section id="addressScroll" class="wrap scroll">

        <!--加载框-->
        <loading :show="loadding.show"></loading>

        <!--提示语框-->
        <tips :show.sync="tips.show" :text="tips.text"></tips>

        <div>
            <div class="field-group theme">
                <div class="control-group">
                    <label class="control-label">收货人</label>
                    <div class="controls">
                        <input class="input" type="text" placeholder="名字" v-model="addressName">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">手机号码</label>
                    <div class="controls">
                        <input class="input" type="tel" placeholder="11位手机号" v-model="addressTel">
                    </div>
                </div>
                <!--<div class="control-group">
                    <label class="control-label">选择地区</label>
                    <div class="controls">
                        <input class="input" type="text">
                    </div>
                </div>-->
                <div class="control-group textarea">
                    <label class="control-label">详细地址</label>
                    <div class="controls">
                        <textarea type="text" placeholder="省、市、区详细收货地址" rows="3" v-model="addressAddress"></textarea>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label">邮政编码</label>
                    <div class="controls">
                        <input class="input" type="text" placeholder="邮政编码" v-model ="addressPostCode"></div>
                </div>
            </div>
            <div class="btn-wrap">
                <button class="btn btn-wx" @click="saveForm"> 保存</button>
            </div>
        </div>
    </section>

</template>

<script>

    module.exports = {
        replace:true,
        data:function(){
            return{
                addressName:"",
                addressTel:"",
                addressAddress:"",
                addressPostCode:"",
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


                //获取订单 信息数据
                _self.ajaxGetUserList(transition);
            }

        },
        methods: {
            //获取默认收货人地址信息
            ajaxGetUserList:function(transition){

                var _self = this;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/getorderList.json',
                    beforeSend:function(){
                        //_self.loadding.show = true;
                    },
                    data:{
                        uid:""
                    },
                    dataType:"json",
                    success :function(json){

                        //请求完毕关闭进度条
                        _self.$route.router.app.progressbar = false;

                        if(json&&json.code==0){

                            transition.next({

                                addressName:json.data.addressName,
                                addressTel:json.data.addressTel,
                                addressAddress:json.data.addressAddress,
                                addressPostCode:json.data.addressPostCode

                            });

                        }

                    }
                });
            },
            //保存大表单
            saveForm:function(){
                var _self = this;

                var uid = _self.$route.params.uid;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/true.json',
                    dataType:"json",
                    beforeSend:function(){
                        _self.loadding.show = true;
                    },
                    data:{data:_self.$data},
                    success :function(json){

                        _self.loadding.show = false;

                        if(json&&json.code==0){

                            _self.tips.show = true;

                            _self.tips.text = json.message;

                            setTimeout(function(){
                                _self.$router.go({
                                    name:'order',
                                    params:{
                                        uid:uid
                                    }
                                });
                            },3000);


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