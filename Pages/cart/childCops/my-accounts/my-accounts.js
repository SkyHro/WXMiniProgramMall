Component({
  properties: {
    totalPrice: {
      type: Number,
      value: 0
    },
    selectNum: {
      type: Number,
      value: 0
    },
    selectAll: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    // 全选按钮点击事件
    handleSelectAll() {
      // 1.将全选事件发送到主页面中
      this.triggerEvent("selectall");
    }
  }
})