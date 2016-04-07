<style>
    .ad-banner-crousel {
        width: 100%;
        padding-top: 40px;
    }
    .ad-banner-crousel, .carousel-inner {
        position: relative;
        overflow: hidden;
    }

</style>

<template>

    <div class="listScroll">
        <section>

            <section class="carousel ad-banner-crousel" style="height: 140.625px;">
                <!-- Swiper -->
                <div class="swiper-container" v-el:swiper>
                    <ul class="swiper-wrapper" v-for="item in banner">
                        <li class="swiper-slide">
                            <a>
                                <img :src="item.url" :alt="item.title">
                            </a>
                        </li>
                    </ul>

                </div>
            </section>

            <list :goodlist.sync="goodlist"></list>


        </section>
    </div>

</template>

<script>



    module.exports = {
        replace:true,
        props: ["banner","goodlist"],
        ready:function(){
            var _self = this;

            _self.$nextTick(function() {
                new Swiper(_self.$els.swiper, {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    autoplay:3000,
                    loop:true,
                    autoplayDisbleOnInteraction:false

                });
            });
        },
        components:{
            "list":require('./../components/list.vue')
        }

    }
</script>