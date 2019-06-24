//入口文件

import Vue from 'vue'
// 导入app组件
import app from './App.vue'


// 导入vuex
import Vuex from 'Vuex'
Vue.use(Vuex)

// 获取本地数据
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: {
        //将 购物车中的商品的数据，用一个数组存储起来
        //  { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
        car: car
    },
    mutations: {
        addToCar(state, goodsinfo) {
            // 1、先判断里面是否有这个商品，有这数量相加即可。没有就把商品信息全部push进去。
            // 先假设有
            var flag = false;
            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            // 本地永久缓存，防止刷新后就没有数据了
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        // 同时更新购物车里的数量思路：
        // + 每次点击时把数量再添加到store里面的count上。
        updatagoodsinfo(state, goodsinfo) {
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true;
                }

            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeForCar(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }

            })
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateSelectChange(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car))
        }

    },
    getters: {
        // 购物车右上角显示的所有数量
        getAllNumber(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            });
            return c
        },
        // 到vuex中得到对应每个商品的数量
        getgoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;

            })
            return o;
        },
        getgoodsSelect(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getgoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.count * item.price
                }
            })
            return o
        }



    }
})

// 导入mintui头部样式、轮播图样式
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);

// 导入所有的mint-ui样式
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// 引入mui样式 
import './lib/mui/css/mui.min.css'

// 配置路由
// 1.1导入路由
import VueRouter from 'vue-router'
// 1.2安装路由
Vue.use(VueRouter)
    // 1.3导入自己的router.js模块
import router from './router.js'

// 导入格式化时间的插件,记得先安装 cnpm i moment -s
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
        // moment()
})

// 导入缩略图的插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)



// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 设置地址头部
Vue.http.options.root = "http://www.liulongbin.top:3005"
Vue.http.options.emulateJSON = true

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    // 1.4挂载路由对象
    router,
    store
})