// Pages/details/childCops/my-goods-details.js
Component({
  properties: {
    bannerImgs: {
      type: Array,
      value: []
    },
    details: {
      type: Object,
      value: {}
    }
  },
  data: {
    isIconLoad: false
  },
  methods: {
    handleIconLoad(){
      this.setData({
        isIconLoad: true
      })
    }
  }
})
