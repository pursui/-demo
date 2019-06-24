import VueRouter from 'vue-router'

// 导入对应的路由
import homeContainer from './components/tabbar/HomeContainer.vue'
import memberContainer from './components/tabbar/MemberContainer.vue'
import searchContainer from './components/tabbar/SearchContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import newList from './components/new/newList.vue'
import newInfo from './components/new/newInfo.vue'
import photoList from './components/photo/photoList.vue'
import photoinfo from './components/photo/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsDesc from './components/goods/goodsDesc.vue'
import goodsComment from './components/goods/goodsComment.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '' },
        { path: '/home', component: homeContainer },
        { path: '/member', component: memberContainer },
        { path: '/shopcar', component: shopcarContainer },
        { path: '/search', component: searchContainer },
        { path: '/home/newList', component: newList },
        { path: '/home/newsinfo/:id', component: newInfo },
        { path: '/home/photoList', component: photoList },
        { path: '/home/photoinfo/:id', component: photoinfo },
        { path: '/home/goodslist', component: goodslist },
        { path: '/home/goodsinfo/:id', component: goodsinfo },
        { path: '/home/goodsDesc/:id', component: goodsDesc, name: 'goodsDesc' },
        { path: '/home/goodsComment/:id', component: goodsComment, name: 'goodsComment' },

    ],
    // 覆盖默认高亮的类，默认的类叫router-link-active
    linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router