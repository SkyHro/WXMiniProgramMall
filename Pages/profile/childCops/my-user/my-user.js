// Pages/profile/childCops/my-user/my-user.js
Component({
  data: {
    isHidden: true
  },
  methods: {
    handleImageLoaded(){
      this.setData({
        isHidden: false
      })
    }
  }
})
