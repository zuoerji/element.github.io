<template>
    <div v-show="showFlag" class="food">
        food
    </div>
</template>
<script>
export default {
    props:{
        food:{
            type:Object
        }
    },
    data(){
        return {
            showFlag:false
        }
    }
}
</script>
<style lang="stylus" scoped>
    .food
        position fixed
        left 0
        top 0
        bottom 48px
        z-index 30
        width 100%
        background #fff
</style>

