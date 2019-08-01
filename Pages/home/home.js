// Pages/home/home.js
import {
  getMultiData,
  getGoodsList
} from "../../service/home.js"

// 返回顶部按钮出现的位置
const TOP_DISTANCE = 700;

Page({
  data: {
    banners: [],
    bannerImgs: [],
    recommends: [],
    titles: ["流行", "新款", "精选"],
    goods: {
      "pop": {
        page: 0,
        list: []
      },
      "new": {
        page: 0,
        list: []
      },
      "sell": {
        page: 0,
        list: []
      }
    },
    currentList: "pop",
    goodsType: ["pop", "new", "sell"],
    isShowTop: false,
    isShowTab: false,
    topTabbar: 200
  },
  onLoad(options) {
    // 请求轮播图数据
    this._getMultiData();

    // 获取商品数据
    this._getGoodsList("pop");
    this._getGoodsList("new");
    this._getGoodsList("sell");

  },


  // -------------- 事件监听函数 ----------------------
  // tabBar点击事件
  handleTabbarClick(event) {
    const index = event.detail.index;
    this.setData({
      currentList: this.data.goodsType[index]
    })
  },
  // 到达页面底部事件
  onReachBottom(){
    const type = this.data.currentList;
    this._getGoodsList(type);
  },
  // 将页面滚动到顶部事件
  handleScrollTop(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  //页面滚动事件
  onPageScroll(event){
    // 控制返回顶部按钮的显示和隐藏
    const top = event.scrollTop;
    const flag1 = top >= TOP_DISTANCE;
    if(flag1 != this.data.isShowTop) {
      this.setData({
        isShowTop: flag1
      })
    }
 
    // 控制tabBar的显示和隐藏
    const flag2 = top >= this.data.topTabbar;
    if(flag2 != this.data.isShowTab) {
      this.setData({
        isShowTab: flag2
      })
    }
  },
  // 推荐图片加载完成事件
  handleImageLoad(){
    // 获取tabbar距离顶部的距离
    const query = wx.createSelectorQuery()
    query.select('#tab-control').boundingClientRect(res => {
      this.setData({
        topTabbar: res.top
      })
    }).exec();
  },


  // ------------------- 网络请求函数 -------------------
  // 获取轮播图数据
  _getMultiData() {
    getMultiData().then(res => {
      // 获取轮播列表、推荐列表
      const banners = res.data.data.banner.list;
      const bannerImgs = [];
      for(let i of banners) {
        bannerImgs.push(i.image)
      }
      const recommends = res.data.data.recommend.list;
      this.setData({
        banners,
        bannerImgs,
        recommends
      })
    })
  },
  // 获取商品列表
  _getGoodsList(type) {
    // 获取页数
    const page = this.data.goods[type].page + 1;

    getGoodsList(type, page).then(res => {
      // 将数据存储起来
      const list = res.data.data.list;
      const oldList = this.data.goods[type].list;
      oldList.push(...list);

      const _type = `goods.${type}.list`;
      const _page = `goods.${type}.page`
      this.setData({
        [_type]: oldList,
        [_page]: page
      })
    });
  }
})