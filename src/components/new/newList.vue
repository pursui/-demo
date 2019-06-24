<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in NewList" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h3>{{item.title}}</h3>
							<p class='mui-ellipsis'>
                                <span>发表时间：{{item.add_time | dateFormat}} </span>
                                <span>浏览次数：{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>

			</ul>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
		return{
			NewList:[]
		}
	},
	created(){
		this.getNewList()
	},
	methods:{
		getNewList(){
			this.$http.get('api/getnewslist').then(result=>{
				if(result.body.status===0){
					console.log(result.body.message)
					this.NewList=result.body.message
				}else{
					 Toast("加载失败")
				}
				
			})
		}
	}
}
</script>
<style lang="scss" scoped>
.mui-table-view{
    li{
        h3{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color:#226aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>

