// components/my-tabbar/my-tabbar.js
Component({
  properties: {
    titles: {
      type: Array,
      value: ['标题一', '标题二', '标题三']
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    handleTabbarClick(event) {
      // 获取当前的index数据
      const index = event.currentTarget.dataset.index;

      // 改变currentIndex数据
      this.setData({
        currentIndex: index
      });

      // 将事件的接口传出
      this.triggerEvent("tabbarClick",{index});
    }
  }
})
