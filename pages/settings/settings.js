// pages/settings/settings.js
Page({

  data: {
    // 需要从后台获取设置数据判断是否匿名分享(默认为是)（或者缓存？）
    isShare: true,
    radioItems: [
      { name: 'horizonial-slide', value: '横划翻页', checked: 'true' },
      { name: 'vertical-slide', value: '竖划翻页' },
    ],
    slide_mode: '横划',
  },

  onLoad: function (options) {

  },

  onShareModeChange: function (event) {
    console.log(event.detail.value);
    // 网络操作？上传后台？或者本地缓存？
  },

  onSlideStyleChange: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['横划', '竖划'],
      success: function (res) {
        var index = res.tapIndex;
        that.setData({
          slide_mode: index === 0 ? '横划' : '竖划',
        });
      }
    });

  }
})