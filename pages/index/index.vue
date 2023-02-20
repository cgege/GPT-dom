<template>
	<view class="container">
		<!-- 		<view class="top-box">

		</view> -->

		<view class="main-box" :class="ztl?'top44':''">
			<scroll-view scroll-y="true" :scroll-info-view="childrenId">
				<template v-for="(item,index) in  arrlist" :key="index">
					<view class="list-item" :id="'id-'+index "
						:style="!item.isSelf ? 'flex-direction: row-reverse;' : ''">
						<image :src="item.image" mode=""></image>


						<text>{{item.text}}</text>

					</view>
				</template>
				<view class="list-item" v-if="ifsdansd">
					<image src="../../static/sgzn.png" mode=""></image>
					<text>正在输入...</text>
				</view>
			</scroll-view>
		</view>
		<view class="bottom-box">
			<input class="uni-input" confirm-type="search" v-model="srk" placeholder="请输入内容" cursor-spacing="15" />
			<view v-if="srk!==''" class="mini-btn " type="" @click="subt">
				发送
			</view>
		</view>

	</view>
</template>
<script setup>
	import {
		onBeforeMount,
		onMounted,
		ref,
		reactive,
		nextTick

	} from 'vue';

	let lower = (e) => {
		console.log("已经滚动到底部了")
	}

	let arrlist = reactive([{
		isSelf: true,
		text: '你好，欢迎来到AI世界，我可以解答你的问题，也可以陪你聊天',
		image: '../../static/sgzn.png'
	}]);

	let srk = ref('')
	let childrenId = ref('')
	let swiperHeight = ref(0)
	let sjId = ref(0)
	let ifs = ref(true);
	let ztl = ref(true);
	let ifsdansd = ref(false);
	onBeforeMount(() => {
		console.log('onBeforeMount生命周期')

		let port = uni.getSystemInfoSync().platform
		switch (port) {
			case 'android':
				console.log('Android'); //android
				break;
			case 'ios':
				console.log('iOS'); //ios
				break;
			default:
				console.log('小程序'); //devtools
				ztl.value = false
				break;
		}
		uni.getSystemInfo({
			success: (res) => { // 需要使用箭头函数，swiper 高度才能设置成功
				// 获取swiperHeight可以获取的高度，窗口高度减去导航栏高度
				swiperHeight.value = res.windowHeight - uni.upx2px(160)
			}
		});
	})
	onMounted(() => {
		console.log('onMounted生命周期')
	})

	let subt = () => {
		if (srk.value == "" || ifs.value == false) return;

		arrlist.push({
			isSelf: false,
			text: srk.value,
			image: '../../static/ymw.png'

		})
		ifs.value = false;
		ifsdansd.value = true;
		uni.request({
			url: 'https://api.openai.com/v1/completions', //仅为示例，并非真实接口地址。
			method: 'POST',
			header: {
				'Authorization': 'Bearer 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' //自定义请求头信息
			},
			data: {
				model: "text-davinci-003",
				max_tokens: 512,
				top_p: 1,
				temperature: 0.5,
				frequency_penalty: 0,
				presence_penalty: 0,
				prompt: srk.value
			},
			success: (res) => {
				arrlist.push({
					isSelf: true,
					text: res.data.choices[0].text,
					image: '../../static/sgzn.png'
				})
			},
			//请求失败
			fail: (e) => {
				arrlist.push({
					isSelf: true,
					text: '网络繁忙，请稍后再尝试...',
					image: '../../static/sgzn.png'
				})
			},
			complete() {
				ifs.value = true;

				ifsdansd.value = false;
			}
		})
	}
</script>

<style lang="scss" scoped>
	.top44 {
		top: 44px !important;

	}

	.container {
		.top-box {}

		.main-box {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 120rpx;
			top: 0;
			overflow-y: auto;
			// background-color: #fff;

			.list-item {
				padding: 20rpx;
				display: flex;

				image {
					height: 60rpx;
					width: 60rpx;
					// background-color: #FFAB08;

				}

				text {
					max-width: 610rpx;
					font-size: 30rpx;
					margin: 0 20rpx;
					word-break: break-all;
				}
			}

			.list-item:nth-child(even) {

				background-color: #F5F5F5;
				border-top: 2rpx solid #eee;
			}

			.list-item:nth-child(odd) {
				background-color: #fff;
			}
		}



		.bottom-box {
			height: 80rpx;
			background-color: #fff;

			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 20rpx;
			display: flex;
			align-items: center;

			.uni-input {
				flex: 1;
				border-radius: 10rpx;
				border: 2rpx solid #eee;
				padding: 10rpx 17rpx;
			}

			.mini-btn {
				margin-left: 20rpx;
				padding: 14rpx 22rpx;
				border-radius: 10rpx;
				background-color: #00B26A;
				color: #fff;
			}
		}
	}
</style>
