// Pages/cart/childCops/my-cart-list/my-cart-list.js
Component({
  properties: {
    cartList: {
      type: Object,
      value: {}
    },
    selectAll: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isActive: [],
    selectNum: 0
  },
  methods: {
    // 购物车商品列表选中事件
    handleListClick(event) {

      // 1.获取当前选中的购物车商品
      const index = event.currentTarget.dataset.index;

      // 2.获取当前的选中状态
      const isActive = this.data.isActive[index];

      // 3.改变该列表的选中状态
      const current = `isActive[${index}]`;
      this.setData({
        [current]: !isActive
      })

      // 4.如果当前全选按钮选中的情况下点击购物车列表项，取消全选态
      const allActive = this.properties.selectAll;
      if(allActive) {
        this.triggerEvent("listclick");
      }

      // 5.如果当前购物车列表已经全被选中，设置全选态
      let flag = true;
      for (let item of this.data.isActive) {
        if(!item) {
          flag = false; 
          break;
        }
      }
      if(flag) {
        // 列表项全被选中，设置全选态
        this.triggerEvent("listall");
      }


      // 5.获取并提交商品的数据
      this.pushGoodsData(index);
      
    },


    // 全选按钮点击时改变所有购物车列表项的状态
    handleChangeActive() {
      // 1.获取当前全选按钮的状态
      const allActive = this.properties.selectAll;

      // 2.获取购物车列表项的状态
      let activeList = this.data.isActive;

      // 3.改变购物车列表的状态
      for(let index in activeList) {
        if(activeList[index]) {
          this.data.isActive[index] = false;
          this.pushGoodsData(index);
        }
        let current = `isActive[${index}]`;
        this.setData({
          [current]: allActive
        })
        // 4.更新购物车项的选中状态
        activeList = this.data.isActive;

        // 5.将选中的购物车数据传出
        if(activeList[index]) {
          this.pushGoodsData(index);
        }
      }
    },


    // 封装提交商品数据的方法
    pushGoodsData(index) {
      // 1.获取当前列表的选中状态
      const isActive = this.data.isActive[index];

      // 2.获取商品详情
      const goodsDetail = this.properties.cartList[index];

      // 3.通过不同的状态决定增加删除数据
      const price = isActive ? +goodsDetail.price : -goodsDetail.price;  //价格
      let selectNum = isActive ? ++this.data.selectNum : --this.data.selectNum;  //已选中商品的数目
      this.setData({
        selectNum
      })

      // 4.提交数据
      this.triggerEvent("pushdata", {
        price,
        selectNum
      });
    }


  },
  lifetimes: {
    // 当组件初始化完成时将数据初始化的方法
    ready() {
      // 1.获取商品列表
      const cartList = this.properties.cartList;

      // 2.创建一个长度为商品列表长度的数组，并填充内容为false
      let activeList = new Array(cartList.length);
      activeList.fill(false);

      // 3.更新isActive数据
      this.setData({
        isActive: activeList
      })
      console.log(this.data.isActive);
    }
  },
  ready() {
    // 1.获取商品列表
    const cartList = this.properties.cartList;

    // 2.创建一个长度为商品列表长度的数组，并填充内容为false
    let activeList = new Array(cartList.length);
    activeList.fill(false);

    // 3.更新isActive数据
    this.setData({
      isActive: activeList
    })
    console.log(this.data.isActive);
  }

})
