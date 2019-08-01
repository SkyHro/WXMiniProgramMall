// Pages/category/childCops/my-category/my-category.js
Component({
  properties: {
    category: {
      type: Object,
      value: {}
    }
  },
  data: {
    isActive: 0
  },
  methods: {
    handleClick(event){
      // 获取当前点击的index
      const index = event.currentTarget.dataset.index;
      // 通过当前点击的位置动态改变isActive的值
      if(index != this.data.isActive) {
        this.setData({
          isActive: index
        })
      }
      this.triggerEvent("tabclick", {index});
    }
  }
})
