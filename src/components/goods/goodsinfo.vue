<template>
  <div class="goodsinfo-container">
      <transition 
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="getBallinfo"></div>
      </transition>
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="goodsphoto" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
            销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small" >立即购买</mt-button>
            <mt-button type="danger" size="small" @click="goToShopcar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsphoto: [],
      goodsinfo: {},
      ballFlag:false,
      selectedCount:1
    };
  },
  created() {
    // console.log(this.$route)
    this.getlunbotu();
    this.getgoodsinfo();
  },
  methods: {
    //   轮播图
    getlunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.goodsphoto = result.body.message;
        }
      });
    },
    // 商品信息
    getgoodsinfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        console.log(result.body);
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
//  点击商品详情
    goDesc(id){
        this.$router.push({name:"goodsDesc",params:{id}})
    },
//  点击更多评论
    goComment(id){
        this.$router.push({name:"goodsComment",params:{id}})
    },
    goToShopcar(){
        this.ballFlag=!this.ballFlag
//  { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
        var goodsinfo={
            id:this.id,
            count:this.selectedCount,
            price:this.goodsinfo.sell_price,
            selected:true
        }
        this.$store.commit("addToCar",goodsinfo)
    },
    // 小球动画
    beforeEnter(el){
       el.style.transform = "translate(0, 0)";
       
    },
 
    enter(el,done){
        // 得到小球的位置
        const ballposition=this.$refs.getBallinfo.getBoundingClientRect();
        // 得到徽章的位置
        const badgeposition=document.getElementById("badge").getBoundingClientRect();

        const xDist=badgeposition.left-ballposition.left;
        const yDist=badgeposition.top-ballposition.top;
        el.offsetWidth;
        el.style.transform=`translate(${xDist}px,${yDist}px)`
        el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el){
        this.ballFlag=!this.ballFlag
    },
    getSelectedCount(count){
     // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
        this.selectedCount=count;
        console.log(this.selectedCount)
    }

  },
  components: {
    swiper,
    numbox
  }
};
</script>
<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
.ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 151px;
}
}
</style>

