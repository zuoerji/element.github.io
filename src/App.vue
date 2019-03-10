<template>
  <div id="app">
      <div class="header">
        <Header :seller="seller"></Header>
      </div>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link to='/goods'>商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to='/ratings'>评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to='/seller'>商家</router-link>
        </div>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import {getSeller} from '@/api/index.js'
const ERR_OK  = 0
export default {
  name: 'App',
  data(){
    return {
      seller:{}
    }
  },
  created(){
    getSeller().then(res=>{
      if(res.errno==ERR_OK){
        this.seller = res.data
      }
    })
  },
  components:{
    Header,
  
  }
}
</script>

<style lang="stylus" scoped>
@import './common/stylus/mixin.styl' 
  #app
    .tab
      display flex
      height  40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex 1 
        text-align center
        & > a
          display block
          font-size 14px
          color rgb(77,85,93)
        & > .active
          color rgb(240,20,20)
          background #ccc
          border-radius 5%
</style>
 