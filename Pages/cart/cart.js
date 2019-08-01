// Pages/cart/cart.js

// 获取全局app对象
const app = getApp()

Page({
  data: {
    cartList: [],
    totalPrice: 0.00,
    selectNum: 0,
    selectAll: false
  },
  // 当界面显示时获取的数据
  onShow() {
    // 1.获取全局购物车列表
    const cartList = app.cartList;

    // 2.更新本地购物车列表
    this.setData({
      cartList
    })
  },

  // ---------- 事件监听函数 -----------
  // 全选按钮点击事件
  handleSelectAll() {
    
    // 1.获取当前的点击态
    const allActive = this.data.selectAll;

    // 2.改变selectAll的值
    this.setData({
      selectAll: !allActive
    })

    // 3.获取cart-list组件，调用组件的方法，改变购物车列表的选择态
    const list = this.selectComponent("#list");
    list.handleChangeActive();
  },

  // 当全选时选中购物车列表时的事件
  handleListClick() {
    // 取消全选
    this.setData({
      selectAll: false
    })
  },

  // 获取商品数据的方法
  handleGetData(event) {

    let price = event.detail.price; //商品价格
    const selectNum = event.detail.selectNum; //选择数目

    // 获取商品总价
    let totalPrice = this.data.totalPrice;
    totalPrice += price;
    totalPrice = parseFloat(totalPrice.toFixed(2));
    this.setData({
      totalPrice,
      selectNum
    })

  },

  // 购物车列表项全部被选中时执行的方法
  handleListAll() {
    // 设置全选
    this.setData({
      selectAll: true
    })
  }

})