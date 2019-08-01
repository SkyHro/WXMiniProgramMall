// Pages/details/childCops/my-tools/my-tools.js
Component({
  properties: {

  },
  data: {
    isHidden: true
  },
  methods: {
    handleCartClick(){
      this.triggerEvent("cartclick");
    },
    imageLoaded(){
      this.setData({
        isHidden: false
      })
    }
  }
})
