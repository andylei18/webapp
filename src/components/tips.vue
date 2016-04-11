<style>
    .warn-tips {
        background: rgba(0,0,0,.7);
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin: 20px 0;
        padding: 10px 10px 10px 5px;
        position:absolute;
        z-index : 5001;
        visibility:visible
    }
    .icon-load, .icon-tipwarn {
        display: inline-block;
        vertical-align: middle;
    }
    .icon-load, .icon-tipwarn {
        background-position: 0 0;
        background-repeat: no-repeat;
        width: 24px;
        height: 16px;
    }
    .icon-load {
        background-image: url(//imgcache.gtimg.cn/bossweb/jifen/mobile/images/public/icon-load.png);
        -webkit-animation: rotate .5s linear infinite;
        -webkit-transform-origin: 12px 10px;
        width: 24px;
        height: 20px;
    }


    .warn-tips p {
        color: #fff;
        font-size: 12px;
    }
    @-webkit-keyframes rotate{
        0%{-webkit-transform:rotate(0deg)}
        100%{-webkit-transform:rotate(180deg)
        }
    }
</style>
<template>
    <section
            v-show="show"
            class="warn-tips"
            :style="{left:left+'px',top:top+'px'}"
            >
        <p>{{this.text==''||this.text==undefined?'提示语sorry':this.text}}</p>
    </section>
</template>
<script>

    module.exports = {
        replace:true,
        data:function(){
            return{
                left:"",
                top:""
            }
        },
        props:['show','text'],
        ready:function(){
            var _self = this,
                    bodyW = document.body.clientWidth,
                    bodyH = document.body.clientHeight;

            _self.left = Math.round(bodyW / 3.1);
            _self.top = Math.round(bodyH / 2.12);
        },
        watch:{
            'show':function(val,oldval){

                var _self = this;

                if(val){

                    setTimeout(function(){

                        _self.show = false;

                    },2000);

                }


            }
        }

    }

</script>