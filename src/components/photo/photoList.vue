<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0?'mui-active':'']"
            v-for="item in cate"
            :key="item.id"
            @click="getPhotoListById(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
      <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
// 1、先导入mui的js插件
import mui from "../../lib/mui/js/mui.min.js";
// 2、初始化scroll

export default {
  data() {
    return {
      cate: [],
      list: []
    };
  },
  created() {
    this.getCategory();
    this.getPhotoListById(0);
  },
  mounted() {
    //组件中的DOM结构被渲染好并放在页面中，会执行这个钩子函数
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(result => {
        //   console.log(result)
        result.body.message.unshift({ title: "全部", id: 0 });
        this.cate = result.body.message;
      });
    },
    getPhotoListById(cateid) {
      this.$http.get("api/getimages/" + cateid).then(result => {
        // console.log(result);
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    }

  }
};
</script>
<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.mint-header.is-fixed{
    z-index: 99;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
