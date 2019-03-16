<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"  @click="decrease"></div>    
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="add"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {

    props: {
      food: {
        type: Object
      }
    },
    methods: {
      add(event){
        if(!this.food.count){
          Vue.set(this.food,'count',1)
        }else{
          this.food.count++
        }
        this.$emit('cartAdd',event.target)
      },
      decrease(){
        if(this.food.count==0){
          return;
        }
        this.food.count--
      }
    }
  };
</script>

<style lang="stylus">
  .cartcontrol
    .fade-enter-active, .fade-leave-active
      transition all 0.5s linear
      opacity 1
      transform translate3d(0,0,0) rotate(0) 
    .fade-enter, .fade-leave-to
      opacity 0
      transform translate3d(24px,0,0) rotate(180deg) 
    font-size: 0
    .cart-decrease, .cart-add
      display: inline-block
      padding: 6px
      line-height 24px
      font-size 24px
      color rgb(0,160,220)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      font-size 10px
      padding-top 6px
      line-height 24px
      color rgb(147,153,139)
</style>  