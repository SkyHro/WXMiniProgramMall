// Pages/details/details.js
import {
  getDetail
} from "../../service/detail.js"

const app = getApp();

Page({
  data: {
    bannerImgs: [],
    iid: '',
    goodsDetails: {}
  },
  onLoad(event){
    // 1.获取传过来的iid
    const iid = event.iid;

    // 2.设置iid
    this.setData({
      iid
    })

    // 3.获取商品详细信息
    this._getDetail();
  },

  // ------- 事件监听函数 -----------
  handleCartClick(){
    app.setCartList(this.data.goodsDetails);
  },

  // ----------- 数据请求方法 -------------
  _getDetail(){
    // 1.获取data中的iid
    const iid = this.data.iid;

    // 2.通过iid获取商品详细数据
    getDetail(iid).then(res => {
      console.log(res);
      // 3.获取轮播图片等商品信息
      const item = res.data.result.itemInfo;
      const bannerImgs = item.topImages,
            img = bannerImgs[0],
            title = item.title,
            price = item.lowNowPrice || item.highNowPrice,
            orgPrice = item.highPrice || item.lowPrice,
            cfav = res.data.result.columns,
            desc = item.desc;

      // 4.设置商品详情
      const goodsDetails = {
        iid,
        img,
        title,
        price,
        orgPrice,
        cfav,
        desc
      };

      // 5.设置轮播图等商品数据
      this.setData({
        bannerImgs,
        goodsDetails
      })
    })
  }
})