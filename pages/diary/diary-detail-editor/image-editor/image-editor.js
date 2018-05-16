Page({

  data: {
    imageNumber: 0,
    images: [],
  },

  onLoad: function (options) {
    // 将字符串转化为数组
    var images = JSON.parse(options.images)
    this.setData({
      images: images,
      imageNumber: images.length,
    })
  },

  onAddImage: function () {
    var that = this;
    var imageNumber = this.data.imageNumber;
    var images = this.data.images;
    wx.chooseImage({
      count: 9 - imageNumber, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempPath = res.tempFilePaths;
        var chooseNumber = tempPath.length;
        for (var i = 0; i < chooseNumber; i++) {
          images.push({
            src: tempPath[i],
          });
          imageNumber++;
        }
        that.setData({
          images: images,
          imageNumber: imageNumber,
        });
      }
    });
  },

  onPreview: function (event) {
    var imageUrl = event.currentTarget.dataset.imageurl;
    wx.previewImage({
      urls: [imageUrl],
    });
  },

  onBack: function () {
    // 返回并传参
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      images: this.data.images,
    });
    wx.navigateBack({
      // 返回上一页面
      delta: 1,
    });
  }
})