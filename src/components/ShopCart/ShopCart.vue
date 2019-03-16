<template>
    <div class="shopcart">
       <div class="content">
           <div class="content-left">
               <div class="logo-wrapper">
                   <div class="logo" :class="{'highlight':totalCount > 0}">
                       <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
                   </div>
                   <div class="num" v-show="totalCount>0" >{{totalCount}}</div>
               </div>
               <div class="price" :class="{'highlight':totalPrice > 0}">￥{{ totalPrice }}</div>
               <div class="desc">另需要配送费 ￥{{deliveryPrice}}元</div>
           </div>
           <div class="content-right">
               <div class="pay" :class="payClass">
                   {{ payDesc }}
               </div>
           </div>
       </div>
       <div class="ball-container">
            <transition-group name="drop" tag="div"               
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                >
                <div v-for="(ball,index) in balls" :key="index"  v-show="ball.show" class="ball">
                    <div class="inner inner-hook"></div>
                </div>
            </transition-group>
       </div>
    </div>
</template>
<script>
export default {
   props:{
       selectFoods:{
           type:Array,
           default(){
               return [
                   {
                       price:11,
                       count:1
                   }
               ]
           }
       },
       deliveryPrice:{
           type:Number,
           default:0
       },
       minPrice:{
           type:Number,
           default:0
       }
   },
   data(){
       return {
           balls:[
               {el:null,show:false},
               {el:null,show:false},
               {el:null,show:false},
               {el:null,show:false},
               {el:null,show:false},
           ],
           dropBalls:[]
       }
   },
   computed:{
       totalPrice(){
           let total = 0;
           this.selectFoods.forEach((food)=>{
               total += food.price*food.count
           })
           return total
       },
       totalCount(){
           let count = 0
           this.selectFoods.forEach((food)=>{
               count += food.count
           })
           return count
       },
       payDesc(){
           if(this.totalPrice===0){
               return `￥${this.minPrice}元起送`
           }else if(this.totalPrice<this.minPrice){
               let diff = this.minPrice-this.totalPrice
               return `还差 ￥${diff}元起送`
           }else{
               return '去结算'
           }
       },
       payClass(){
           if(this.totalPrice<this.minPrice){
               return 'not-enough'
           }else{
               return 'enough'
           }
       }
   },
   methods:{
       drop(el){
           for(let i=0;i<this.balls.length;i++){
               let ball = this.balls[i];
               if(!ball.show){
                   ball.show = true
                   ball.el = el
                   this.dropBalls.push(ball)
                   return;
               }
           }
       },
       beforeEnter(el){
           let count = this.balls.length
           while(count--){
               let ball = this.balls[count]
               if(ball.show){
                   let rect = ball.el.getBoundingClientRect()
                   let x = rect.left -32
                   let y = -(window.innerHeight-rect.top-22)
                   el.style.display = ''
                   el.style.transform = `translate3d(0,${y}px,0)`
                    el.style.webkitTransform = `translate3d(0,${y}px,0`;
                   let inner = el.getElementsByClassName('inner')[0]
                      inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                   inner.style.transform = `translate3d(${x}px,0,0)`
               }
           }
          
       },
          dropEnter (el, done) {
      /* eslint-disable no-unused-vars */
      /* 触发浏览器重绘; */
      let rf = el.offsetHeight;
      this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
        el.style.transform = 'translate3d(0, 0, 0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        
        inner.style.webkitTransform = 'translate3d(0, 0, 0)';
        inner.style.transform = 'translate3d(0, 0, 0)';
        el.addEventListener('transitionend', done);
        // done();
      });
      // console.log(el);
      // done();
    },
    afterEnter (el) {
      el.style.display = 'none';
      let ball = this.droppedBalls.shift();
      ball.show = false;
      ball.el = null;
      console.log(el);
    },

       enter(el){

       },
       afterEnter(el){

       }
   }
}
</script>
<style lang="stylus">
    .shopcart 
        position fixed
        left 0
        bottom 0
        z-index 50
        width 100%
        height 48px
        background #000
        .content
            display flex
            background #141d27
            font-size 0
            .content-left
                color rgba(255,255,255,0.4)
                flex 1
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin-left 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #141d27
                    .num
                        position absolute
                        top 0
                        right 0
                        height 16px
                        width 24px
                        line-height 16px
                        text-align center
                        font-size 9px
                        font-weight 700
                        border-radius 16px
                        color #fff
                        background rgb(240,20,20)
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                    .logo
                        width 100%
                        height 100%
                        border-radius 50%
                        background #2b233c
                        text-align center
                        &.highlight
                            background rgb(0,160,220)
                        .icon-shopping_cart
                            font-size 24px
                            color #80858a
                            line-height 44px
                            &.highlight
                                color #fff

                .price
                    display inline-block
                    font-size 16px
                    color rgba(255,255,255,0.4)
                    font-weight 700
                    vertical-align top
                    line-height 24px
                    margin-top 12px
                    box-sizing border-box
                    padding-right 12px
                    border-right 1px solid rgba(255,255,255,0.1)
                    &.highlight
                        color #fff

                .desc
                    display inline-block
                    vertical-align top
                    line-height 24px
                    margin 12px 0 0 12px
                    color rgba(255,255,255,0.4)
                    font-size 10px

            .content-right
                flex 0 0 105px
                width 105px
                .pay
                    height 48px
                    line-height 48px
                    text-align center
                    font-size 12px
                    color rgba(255,255,255,0.4)
                    font-weight 700
                    &.not-enough
                        background #2b333b
                    &.enough
                        background #00b43c
                        color:#fff
        .ball-container         
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 200
                background rgb(0,160,220)
                .inner
                    width 15px
                    height 15px
                    border-radius 50%
                    background #00A0DC
                    transition all 1s linear
            &.drop-enter-active
                transition all 1s cubic-bezier(0.49,-0.29,0.75,0.41)
            // &.drop-enter
            //     transform translate3d(0,-400px,0)
            //     .inner
            //         transform translate(300px,0,0)
            // &.drop-enter-to
            //     transform translate3d(0,0,0)
            //     .inner
            //         transform translate3d(0,0,0)


</style>
