var data = require('../../data/local-data.js');
const app = getApp();
var globalData = app.globalData;

Page({

  data: {
    userInfo: {},
    tab: data.tabData,
  },

  onLoad: function (options) {
    
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        userInfo: wx.getStorageSync('userInfo'),
        hasUserInfo: true
      })
    }
    else if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(app.globalData);
      }
    }
  },

  onClick: function (event) {
    var id = event.currentTarget.dataset.id;
    console.log(id);
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '/pages/diary/diary-library/diary-library',
        })
        break;
      case 1:
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/settings/settings',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/help/help',
        })
        break;
    }
  }
})