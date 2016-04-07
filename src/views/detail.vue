<style>
    .card-page {
        width: 100%;
        position:absolute;
    }
    .card-inactive {
        display: none;
    }
    .card-active {
    }
    .card-no-scroll {
    }
    .card-scroll {
        height: 100%;
    }
    .card-scroll .iscroll {
        overflow: hidden;
    }
    .card-scroll .scroll {
        overflow-y: auto;
        overflow-x: hidden;
    }
    .card-scroll .before-scroll {
        position: relative;
        top: 0px;
    }
    .card-no-scroll .scroll {
    }
    .card-no-scroll header {
        position: fixed;
        width: 100%;
        left: 0px;
        top: 0px;
        z-index: 1000;
    }
</style>

<template>
<div id="appdetal"></div>
</template>

<script>

    module.exports = {
        replace:true,
        data:function(){
              return{
                  name:""
              }
        },
        route:{
            data:function(transition){
                var _self = this;
                console.log(transition)
                transition.next({
                    name:"丁磊"
                });
            }

        }

    }
</script>