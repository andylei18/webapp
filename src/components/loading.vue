<style>
    .warn-tips {
        background: rgba(0,0,0,.7);
        -moz-border-radius: 5px;
        border-radius: 5px;
        margin: 20px 0;
        padding: 10px 10px 10px 5px;
    }
    .icon-load {
        background-image: url(//imgcache.gtimg.cn/bossweb/jifen/mobile/images/public/icon-load.png);
        -webkit-animation: rotate .5s linear infinite;
        -webkit-transform-origin: 12px 10px;
        width: 24px;
        height: 20px;
    }
    .icon-load, .icon-tipwarn {
        background-position: 0 0;
        background-repeat: no-repeat;
        width: 24px;
        height: 16px;
    }
    .icon-load, .icon-tipwarn {
        display: inline-block;
        vertical-align: middle;
    }
    .warn-tips p {
        color: #fff;
        font-size: 12px;
    }
</style>
<template>
    <section v-show="show" class="warn-tips loadding"><i class="icon-load"></i><p>加载中，请稍候...</p></section>
</template>
<script>

    module.exports = {
        replace:true,
        props: ["show"]

    }

</script>