App({
  onLaunch(){
    this.getCartList();
  },
  cartList: [],
  setCartList(goods){
    // 1.判断购物车商品是否重复
    let index = true;
    for (let i of this.cartList) {
      if (i.iid == goods.iid) {
        index = false;
        wx.showToast({
          title: "购物车中已有",
          duration: 1000
        });
        break;
      }
    }
    // 2.将数据更新
    if(index) {
      this.cartList.push(goods);
      wx.setStorage({
        key: goods.iid,
        data: goods
      })
      wx.showToast({
        title: "添加到购物车",
        duration: 1000
      })
    }
  },
  getCartList(){
    // 将缓存中的内容导出到cartList中
    this._getStorageInfo().then(res => {
      for(let item of res) {
        wx.getStorage({
          key: item,
          success: res => {
            this.cartList.push(res.data);
          }
        })
      }
    })
  },
  _getStorageInfo(){
    return new Promise((resolve, reject) => {
      wx.getStorageInfo({
        success: res => {
          resolve(res.keys);
        }
      })
    })
  },
  _removeCartList(iid) {
    wx.removeStorage({
      key: iid,
      success: function(res) {
        wx.showToast({
          title: '删除商品成功',
        })
      },
    })
  }
})