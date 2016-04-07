<style>

    .my-photo {
        position: relative;
        height: 130px;
        padding-top: 30px;
        line-height: 24px;
        background-image: url(//imgcache.gtimg.cn/bossweb/jifen/mobile/images/public/my_photo_bg.jpg);
        background-size: 100% auto;
        background-repeat: no-repeat;
    }
    .my-photo .pic {
        float: left;
        margin: 0 1.5rem;
        width: 6.2rem;
        height: 6.2rem;
        border-radius: 100%;
        overflow: hidden;
        border: 3px solid #303031;
        background: #303031;
        text-align: center;
    }
    .my-photo p {
        margin-left: 9rem;
    }
    .my-name {
        margin-top: 8px;
        font-size: 1.6rem;
    }
    h4, p {
        font-size: 1.4rem;
    }
    .f-thin, del {
        color: #8e8e8e;
    }
    .ui-box-list {
        background-color: #212427;
    }
    .c-border-bm, .tit-summary, .ui-box-list li {
        background-position: 0 bottom;
        background-repeat: no-repeat;
        -webkit-transform: translateZ(0);
    }
    .c-border-bm, .c-border-up, .discout, .layout-box .jifen-bar, .layout-box-cont, .tit-summary, .ui-box-list li {
        background-image: -webkit-linear-gradient(top,transparent,transparent 50%,#2f3237 50%,#2f3237 100%);
        background-size: 100% 1px;
    }
    .ui-box-list li {
        margin-left: 15px;
        font-size: 14px;
        position: relative;
        padding: 16px 15px 16px 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        -webkit-box-pack: justify;
    }


    .ui-box-list li label {
        font-size: 1.6rem;
    }
    .ui-box-list li label span {
        position: absolute;
        top: 50%;
        right: 3rem;
        -webkit-transform: translate(0,-50%);
        transform: translate(0,-50%);
        color: #888;
        font-size: 1.2rem;
        line-height: 100%;
    }
    .ui-box-list li .icon-arrow {
        width: 16px;
        position: absolute;
        top: 50%;
        -webkit-transform: translate(0,-50%);
        transform: translate(0,-50%);
        right: 1.5rem;
    }

    .ui-box-list li i {
        width: 24px;
        height: 24px;
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
    }

    .icon-arrow:before {
        content: "\e601";
    }

    .icon-arrow {
        font-size: 2.4rem;
        color: #5c5d5e;
        line-height: 2.2rem;
    }
    .iconfont, .rule span {
        font-size: 1.2rem;
    }

    .ui-box-list li:last-child {
        border: none;
        background-image: none;
    }
    .ui-box-list .pay-info-box {
        margin-left: 0;
        padding: 5px 0;
    }
    .pay-info {
        width: 100%;
        background-color: #212427;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-flex-align: center;
        -webkit-align-items: center;
    }
    .orders-list ul, .pay-info {
        -webkit-justify-content: space-between;
    }
    .pay-info .item {
        text-align: center;
        flex: 1;
        -webkit-flex: 1;
        -webkit-box-flex: 1;
        width: 100%;
        display: block;
    }
    .pay-info span {
        height: 3rem;
        position: relative;
    }
    .pay-info .iconfont {
        font-size: 30px;
        display: inline;
        line-height: 4rem;
    }
    .ui-box-list li i {
        width: 24px;
        height: 24px;
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
    }
    .icon-clock2:before {
        content: "\e625";
    }
    .pay-info .tag {
        position: absolute;
        right: -10px;
        top: -8px;
        width: auto;
        height: auto;
        background-color: #5be991;
        border-radius: 14px;
        color: #000;
        padding: 2px 5px;
        font-size: 1.2rem;
        line-height: 1.2rem;
    }
    .pay-info .item p {
        color: #a3a3a3;
    }
    .ui-box-list li p {
        margin-bottom: 5px;
    }
    .my-center {
        margin-bottom: 15px;
    }
    .my-center .ui-box-list {
        margin-top: 15px;
    }
    .ui-box-list {
        background-color: #212427;
    }
    .ui-box-list li label .f-thin {
        padding: 2px 5px;
        color: #2d2d2d;
        text-align: center;
        background-color: #5be991;
        border-radius: 14px;
    }
    .rule {
        padding: 0 1.5rem 1.5rem;
        text-align: right;
        color: #8e8e8e;
    }
    .rule .iconfont {
        vertical-align: baseline;
    }
    .iconfont, .rule span {
        font-size: 1.2rem;
    }
</style>

<template>
    <div id="accountScroll" class="wrap iscroll" style="overflow: hidden; height: 667px;">
        <div style="transition: transform 0ms cubic-bezier(0.33, 0.66, 0.66, 1); -webkit-transition: transform 0ms cubic-bezier(0.33, 0.66, 0.66, 1); transform-origin: 0px 0px; transform: translate(0px, 0px) translateZ(0px);">
            <section class="my-photo">
                <div class="pic"><img src="http://qlogo4.store.qq.com/qzone/375074900/375074900/50" width="100%"></div>
                <p class="my-name"><span class="f-thin"></span></p>
                <p class="f-thin" account="qq">QQ:375074900</p>
                <p id="account_jifen_balance" account="balance" class="f-thin">积分：0</p>
                <p id="account_jifen_login" class="f-thin" style="display: none;">积分：未登录</p>
            </section>
            <section class="order">
                <ul class="ui-box-list">
                    <li>
                        <label>我的订单 <a href="javascript:void 0;"><span id="orderAll" style="display: none;">查看全部订单</span></a></label>
                        <i class="iconfont icon-arrow"></i>
                    </li>
                    <li class="pay-info-box">
                        <section id="orderQuery" class="pay-info">
                            <div class="item" _module="pay" number="0">
                                <span> <i class="iconfont icon-clock2"></i><i _number="account_pay_number" class="tag">0</i></span>
                                <p>待付款</p>
                            </div>
                            <div class="item" _module="paid" number="0">
                                <span> <i class="iconfont icon-daishouhuo2"></i><i class="tag">0</i></span>
                                <p>已付款</p>
                            </div>
                            <div class="item" _module="over" number="0">
                                <span> <i class="iconfont icon-arrowbtline2"></i><i class="tag">0</i></span>
                                <p>已发货</p>
                            </div>
                            <div class="item" style="display: none;">
                                <span> <i class="iconfont icon-roundcheck2"></i><i class="tag">0</i></span>
                                <p>已完成</p>
                            </div>
                        </section>
                    </li>
                </ul>
            </section>
            <section class="my-center">
                <ul class="ui-box-list">
                    <li id="shoppingCart">
                        <label>我的购物车<span class="f-thin" account="cart">1</span></label>
                        <i class="iconfont icon-arrow"></i>
                    </li>
                    <li id="likeQuery">
                        <label>我的收藏</label>
                        <i class="iconfont icon-arrow"></i>
                    </li>
                    <li id="addressQuery">
                        <label>收货地址</label>
                        <i class="iconfont icon-arrow"></i>
                    </li>
                </ul>
            </section>
            <div class="rule" style="display: none;"><i class="iconfont icon-question2"></i> 积分获取规则</div>
        </div>
    </div>
</template>

<script>

</script>