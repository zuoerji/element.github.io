<template>
    <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
        <ul>
            <li 
                v-for="(item,index) in goods" 
                :key="item.name" 
                class="menu-item"
                :class="{'current':currentIndex == index}"
                @click="selectMenu(index,$event)"> 
                <span class="text border-1px" >
               <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> {{item.name}}    
                </span>    
            </li>    
        </ul>    
    </div>    
    <div class="foods-wrapper" ref="foodswrapper">
        <ul>
            <li v-for="item in goods" :key="item.name" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li 
                        v-for="food in item.foods" 
                        class="food-item border-1px" 
                        :key="food.name"
                        @click="selectFood(food,$event)">
                        <div class="icon">
                            <img :src="food.icon" width="57" height="57">                            
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span>月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>    
                                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>    
                            </div>   
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>    
    </div> 
    <food :food="selectedFood"></food>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import {getGoods}  from '@/api/'
 import cartcontrol from '@/components/Cartcontrol/Cartcontrol';
import food from '@/components/Food/Food'
const ERR_OK = 0
export default {
    props:{
        seller:{
            type:Object
        }
    },
    data(){
        return {
            goods:[],
            selectedFood:{},
            listHeight:[],
            scrollY:0
        }
    },
    created(){
        this.classMap = ['decrease','discount','guarantee','invoice','special']
        getGoods().then(res=>{
            if(res.errno==ERR_OK){
                this.goods = res.data
                this.$nextTick(()=>{
                    this._initScroll();
                    this._calculateHeight();
                })
            }
        })
    },
    components:{
        food,
        cartcontrol
    },
    computed:{
        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                let height1 = this.listHeight[i]
                let height2 = this.listHeight[i+1]
                if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
                    return i;
                }
            }
            return 0
        }
    },
    methods:{
        selectFood(food,even){
          
            this.selectedFood = food
        },
        selectMenu(index,even){
            // console.log(index,even)   
            let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
            // console.log(foodList)
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el,300);         
        },
        _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
            // console.log(pos)
          this.scrollY = Math.abs(Math.round(pos.y));
        //   console.log(this.scrollY)
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin"
    .goods
        position absolute
        top 174px
        width 100%
        bottom 46px
        display flex
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width 80px
            background #f3f5f7
            .menu-item
                display table
                height 54px
                width 54px
                line-height 14px
                padding 0 12px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                .text
                    border-none()
                .icon   
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.guarantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
                .text
                    display table-cell
                    width 56px
                    font-size 12px
                    vertical-align middle
                    border-1px(rgba(7,17,27,0.1))
        .foods-wrapper
            flex 1
            .title
                padding-left 14px
                height 26px
                line-height 26px
                border-left 2px solid #d9dde1
                font-size 12px
                color rgb(147,153,159)
                background #f3f5f7
            .food-item
                display flex
                margin 18px
                padding-bottom 18px
                border-1px(rgba(7,17,27,0.1))
                &:last-child
                    border-none()
                    padding-bottom 0
                .icon   
                    flex 0 0 57px
                    margin-right 10px
                .content
                    flex 1  
                    .name
                        margin 2px 0 8px 0
                        font-size 14px
                        height 14px
                        line-height 14px
                        color:rgb(7,17,27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
                            margin-right: 12px
                    .price
                        font-weight: 700
                        line-height: 24px
                        .now
                            margin-right: 8px
                            font-size: 14px
                            color: rgb(240, 20, 20)
                        .old
                            text-decoration: line-through
                            font-size: 10px
                            color: rgb(147, 153, 159)
                    .cartcontrol-wrapper
                        position: absolute
                        right: 0
                        bottom: 12px
</style>

