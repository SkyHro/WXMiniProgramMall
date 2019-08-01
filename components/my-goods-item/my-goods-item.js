// components/my-goods-item/my-goods-item.js
Component({
  properties: {
    item: {
      type: Object,
      value: []
    }
  },
  data: {
    isLoaded: false,
    loading: "/assets/images/common/loading.jpg"
  },
  methods: {
    goodsItemClick(){
      // 1.设置需要在url中传递的参数
      const item = this.properties.item;

      // 2.获取iid
      const iid = item.iid;

      // 3.页面跳转
      wx.navigateTo({
        url: "/Pages/details/details?iid=" + iid
      })
    },
    // 图片加载完执行的方法
    imageLoaded(){
      this.setData({
        isLoaded: true
      })
    }
  }
})
