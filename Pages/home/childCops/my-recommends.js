// Pages/home/childCops/my-recommends.js
Component({
  properties: {
    recommends: {
      type: Array,
      value: []
    }
  },
  data: {
    isLoad: false
  },
  methods: {
    // 图片加载完成时回调的方法
    handleImageLoad(){
      if(!this.data.isLoad) {
        console.log("图片加载完成");
        this.data.isLoad = true;
        this.triggerEvent("imageload");
      }
    }
  }
})
