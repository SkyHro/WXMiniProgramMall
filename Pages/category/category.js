// Pages/category/category.js
import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from '../../service/category.js'

Page({
  data: {
    categories: {},
    categoryData: {},  //商品数据
    currentIndex: 0
  },
  onLoad(){
    this._getCategory();
  },


  // ------------ 事件监听方法 -----------------
  // 左侧菜单栏的点击事件
  handleTabClick(event){
    // 获取点击的tab的index
    const currentIndex = event.detail.index;
    this.setData({
      currentIndex
    });
    this._getSubCategory(currentIndex);
    this._getCategoryDetail(currentIndex, 'pop');
  },


  // ------------- 获取服务器端数据方法 --------------
  _getCategory(){
    getCategory().then(res => {
      // 1.获取商品分类列表
      const categories = res.data.data.category.list;

      // 2.初始化子商品分类数据
      const categoryData = {};
      for(let i = 0; i < categories.length; i++){
        categoryData[i] = {
          subcategories: [],
          catagoryDetail: []
        }
      }

      // 3.设置商品分类信息
      this.setData({
        categories,
        categoryData
      })

      // 4.请求第一份商品数据
      this._getSubCategory(0);
      
      // 5.获取商品详细数据
      this._getCategoryDetail(0, 'pop');
    })
  },
  _getSubCategory(index) {
    const maitKey = this.data.categories[index].maitKey;
    // 获取分类商品子信息
    getSubCategory(maitKey).then(res => {
      // 1.将categoryData中的数据拷贝一份
      const copyCategoryData = this.data.categoryData;

      // 2.将请求到的数据存储到copy版本中
      copyCategoryData[index].subcategories = res.data.data.list;
      
      // 3.将数据保存到data中
      this.setData({
        categoryData: copyCategoryData
      })
    })
  },
  _getCategoryDetail(index, type){
    // 获取miniWallkey
    const miniWallkey = this.data.categories[index].miniWallkey;

    // 获取商品的详细信息
    getCategoryDetail(miniWallkey, type).then(res => {
      // 1.将数据导入到categoryData中
      this.data.categoryData[index].catagoryDetail = res.data;

      // 2.将categoryData中的数据copy一份
      const copyCategoryData = this.data.categoryData;

      // 3.动态更改categoryData中的数据
      this.setData({
        categoryData: copyCategoryData
      })
    })
  }
})