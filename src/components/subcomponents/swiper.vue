<template>
  <div>
    <!-- 轮播图公共区域 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" alt :class="{'full':isfull}">
      </mt-swipe-item>
      <!-- 如果里面有图片 -->

      <!-- 要加 ：  绑定数据 -->
    </mt-swipe>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  props: ["lunbotuList", "isfull"]
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe-item {
  //   图片写法
  text-align: center;
  img {
    // width: 100%;
    height: 100%;
  }
}
.full {
  width: 100%;
}
</style>
