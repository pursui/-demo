<template>
  <div class="mui-numbox" data-numbox-min="1" >
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="number" @change="countChanged" readonly>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    data(){
        return{

        }
    },
    mounted(){
        mui(".mui-numbox").numbox();
    },
    methods:{
      countChanged(){
        //  this.$emit("getcount",parseInt(this.$refs.number.value))
        console.log(this.$refs.number.value)
        this.$store.commit("updatagoodsinfo",{
          id:this.goodsid,
          count:this.$refs.number.value
        })
      }
    },
    props:["initcount","goodsid"]
};
</script>
<style lang="scss" scoped>
</style>
