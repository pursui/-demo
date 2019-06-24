<template>
  <div>
  <!-- 1.3使用 前面的:lunbotuList代表swiper.vue里面的内容 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newList">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <span class="mui-icon mui-icon-email"></span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// 1.1先导入
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      lunbotuList: [
        {img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561386677280&di=625ce11334fccf5a5d452ffd86b9db73&imgtype=0&src=http%3A%2F%2Fxszp.jxxhdn.com%2Fimages%2F200907%2F20090710092407d.jpg"},
        {img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4020615737,1968707091&fm=15&gp=0.jpg"},
        {img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561386375580&di=2f3bda7617edd9411f07c9375becdfb2&imgtype=0&src=http%3A%2F%2Fpic26.nipic.com%2F20130122%2F9215045_194340082372_2.jpg"},

      ]
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // this.$http.get("api/getlunbo").then(result => {
      //   console.log(result);
      //   if (result.body.status === 0) {
      //     this.lunbotuList = result.body.message;
      //     // console.log(this.lunbotuList)
      //   } else {
      //     Toast("加载失败");
      //   }
      // })
    }
  },
  // 1.2定义
  components: {
    swiper
  }
};
</script>
<style lang="scss" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: white;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0px;
}
</style>




