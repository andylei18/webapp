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
    .icon-iconfontround:before {
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

    <section id="cartScroll" class="wrap-card iscroll">
        <section class="page-pay-cart" style="transition: transform 0ms cubic-bezier(0.33, 0.66, 0.66, 1); -webkit-transition: transform 0ms cubic-bezier(0.33, 0.66, 0.66, 1); transform-origin: 0px 0px; transform: translate(0px, 0px) translateZ(0px);">
            <p class="box-row f-thin">可用积分：0</p><section class="layout-box level" number="1">
            <div class="layout-box-top flex-between box-row cart-fn">
                <h6> 鲜橙公司</h6>
                <div class="right ">
                    <button _module="cartBuySubmitBtn" id="cartBuySubmit_2" type="button" class="btn-green">结算</button>
                    <div class="total">
                        <p id="cartTotalFee_2">￥0.00</p>
                        <p id="offInfo_2" class=" fz-s">
                            <span class="f-thin">共0件</span>（减0元）
                        </p>
                    </div>
                </div>
            </div>
            <div class="layout-box-cont ui-g-box">
                <div class="ui-g-select">
                    <div class="radio">
                        <i id="icon_cartRadio_2_1627" class="iconfont icon-iconfontround" jifenflag="0"></i>
                        <!--默认iconfontround-->
                    </div>
                    <div class="ui-g-pic">
                        <img src="http://p.qpic.cn/qqjifen_pic/0/upload_ca2df3725b5f8eca673d6cb9b03804b4/0" width="100%"></div>
                    <div class="ui-g-info ">
                        <div class="flex-between">
                            <h3>QQfamily儿童卡通背包</h3>
                            <span class="price">￥88</span>
                        </div>
                        <p class="f-thin">family儿童书包&nbsp;&nbsp;</p>
                        <div class="ui-duration duration-gray">
                            <a _module="cartMinus" href="javascript:void 0;">
                                <span>-</span>
                            </a>
                            <div class="dur-ipt ">
                                <input disabled="" type="text" value="1">
                            </div>
                            <a _module="cartAdd" href="javascript:void 0;">
                                <span>+</span>
                            </a>
                        </div>
                        <span id="cartDelete_2_1627" class="cart-del" sku_id="1627" _module="cartDelete">
                            <i class="iconfont icon-delete"></i>
                        </span>
                    </div>
                    <!--积分区-->
                    <div class="discout flex-between">
                        <p id="switchp_cartRadio_2_1627" class="f-em">抵扣：10积分减3元</p>
                        <div _module="cartSwitch" id="switchdiv_cartRadio_2_1627" class="switch-on">
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

</script>