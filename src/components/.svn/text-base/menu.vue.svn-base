<style>
    .card-scroll .iscroll {
        overflow: hidden;
    }
    .float-menu.show{
        -webkit-transform: translateX(300px);
        transform: translateX(300px);

        -webkit-transition: all .3s ease;
        transition: all .3s ease;
    }
    .slide-on .float-menu {
        -webkit-animation: slider2 .2s linear forwards;
        width: 25rem;
    }
    @-webkit-keyframes slider2{
        0%{
            -webkit-transform:translate3d(-25rem,0,0)
        }
        100%{
            -webkit-transform:translate3d(0,0,0)
        }
    }
    .slide-off .float-menu, .slide-on .float-menu, .slide-on .mask {
        display: block;
    }
    .index-wrap .float-menu, .index-wrap .mask {
        display: none;
    }
    .float-menu {
        /*background: #ebebeb;
        height: 100%;
        display: block;
        color: #4a4a4a;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;*/

        position: absolute;
        top: 0;
        left: -300px;
        width: 300px;
        background-color: #ebebeb;
        color: #313131;
        -webkit-transition: all .3s ease;
        transition: all .3s ease;
        z-index: 99;
        height: 100%;
    }
    .float-menu h2 {
        padding: 15px 0 0 15px;
        font-size: 1.6rem;
    }
    .address dt, .buy-entry button, .float-menu h2, .pop-cont h2, .ui-comment h5 {
        font-weight: 700;
    }
    .float-menu .ui-box-group {
        padding: 15px;
    }
    .ui-box-group {
        position: relative;
        border-right: thin solid #e2e2e2;
    }
    .cf {
        zoom: 1;
    }
    .cf:after, .cf:before {
        content: "";
        display: table;
    }
    .ui-box {
        width: 50%;
        text-align: center;
        position: relative;
        border: thin solid #e8e8e8;
        float: left;
        margin-top: -1px;
        border-right: none;
        background: #fff;
        min-height: 140px;
    }
    .icon-mark, .icon-mark:after, .ui-box, .ui-product .reply span, .warn-tips, .warn-tips p {
        display: inline-block;
    }
    .btn, .ui-box {
        box-sizing: border-box;
    }
    .ui-box-pic {
        margin: 2rem 2rem 0;
        min-height: 60px;
    }
    .ui-box h3 {
        margin: 1rem .2rem;
        font-size: 1.4rem;
        color: #353535;
    }
</style>
<template>
    <div class="float-menu iscroll" :class="{'show':show}">
        <section id="categoryPage">
            <h2>商品分类</h2>
            <section id="categoryList" class="ui-box-group cf">
                <div class="ui-box" cid="{{item.id}}" v-for="item in list" @click="getClassData(item)">
                    <div class="ui-box-pic"><img src="http://p.qpic.cn/qqjifen_pic/0/upload_180c7e55ed69d03451934258c6aab7a9/0" width="100%"></div>
                    <h3>{{item.id}}</h3>
                </div>
            </section>
        </section>
    </div>
</template>

<script>

    module.exports = {
        replace:true,
        props: ["show","list"],
        methods:{
            //获取相对应的商品分类 列表数据
            getClassData:function(){
                var _self = this;

                $.ajax({
                    type: "GET",
                    url:'../../src/mock/list.json',
                    dataType:"json",
                    success :function(data){

                        var json = Mock.mock(data);

                        if(json&&json.code==0){

                            //同步左侧菜单数据
                            _self.list = json.data.menu.list;

                            //同步父组件轮播图数据
                            _self.$parent.banner = json.data.banner;

                            //同步父组件列表数据
                            _self.$parent. goodlist = json.data.goodlist;

                            //关闭遮罩层和左侧菜单
                            _self.show = false;
                            $("html, body, .page").removeClass("scroll-hide");
                        }
                    }
                });
            }
        }

    }

</script>