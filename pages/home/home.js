const app = getApp();
var util = require('../../utils/util.js');
var diary_util = require('../../utils/diary-util.js');
var globalData = app.globalData;

Page({

  data: {
    diary_key: [],
    userInfo: {},
    hasUserInfo: false,
  },

  onLoad: function (options) {
    var that = this;
    // console.log(app.globalData.userInfo);
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          if (app.globalData.userInfo) {
            that.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
          } else {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回  
            // 所以此处加入 callback 以防止这种情况  
            app.userInfoReadyCallback = res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          }
        }
      }
    });

  },

  onShow: function () {
    diary_util.getDiarys(this);
  },

  onDiaryView: function (event) {
    var diaryId = event.currentTarget.dataset.diaryid;
    var diaryName = event.currentTarget.dataset.diaryname;
    var diaryType = event.currentTarget.dataset.diarytype;
    switch (diaryType) {
      case 'single':
        // 单人
        wx.navigateTo({
          url: '../diary/diary-detail/single/diary-detail-single?diaryId=' + diaryId + '&diaryName=' + diaryName + '&diaryType=' + diaryType,
        });
        break;
      case 'double':
        // 双人
        wx.navigateTo({
          url: '../diary/diary-detail/double/diary-detail-double?diaryId=' + diaryId + '&diaryName=' + diaryName + '&diaryType=' + diaryType,
        });
    }

  },

  onDiaryEdit: function (event) {
    var diaryId = event.currentTarget.dataset.diaryid;
    var diaryType = event.currentTarget.dataset.diarytype;
    var that = this;
    wx.showActionSheet({
      itemList: ['分享', '销毁此日记'],
      success: function (res) {
        var id = res.tapIndex;
        switch (id) {
          case 0:
            //生成二维码保存图片分享
            break;
          case 1:
            // 销毁
            wx.showModal({
              title: '确认删除？',
              content: '删除之后，此日记本将不复存在！',
              cancelText: '不忍心~',
              confirmText: '忍痛删除',
              confirmColor: '#FF0000',
              success: function (res) {
                var cookie = wx.getStorageSync('cookie');
                if (res.confirm) {
                  wx.request({
                    url: globalData.url + 'deleteDiarys.php',
                    method: 'POST',
                    data: {
                      diary_id: diaryId,
                      diary_type: diaryType,
                    },
                    header: {
                      cookie: cookie,
                    },
                    success: function (res) {
                      console.log('删除-->');
                      console.log(res.data);
                      if (res.data.code == 201) {
                        wx.showToast({
                          icon: 'success',
                          title: '删除成功！',
                        });
                        diary_util.getDiarys(that);
                      }
                    }
                  })
                }
              }
            });
            break;
        }
      }
    });
  },

  onGetUserInfo: function (res) {
    var userInfo = res.detail.userInfo;
    app.globalData.userInfo = userInfo;
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    });
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          // 发起网络请求
          // 获取用户信息
          wx.request({
            url: globalData.url + 'setUser.php',
            method: 'POST',
            data: {
              code: res.code,
              nickName: userInfo.nickName,
              avatarUrl: userInfo.avatarUrl,
              gender: userInfo.gender,
              city: userInfo.city,
              province: userInfo.province,
            },
            success: function (res) {
              var cookie = res.header['Set-Cookie'];
              cookie = cookie.split(';')[0];
              wx.setStorageSync('cookie', cookie);
              console.log(res.data);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  onSettings: function () {
    wx.navigateTo({
      url: '../settings/settings',
    })
  },

  onHelp: function () {
    wx.navigateTo({
      url: '../help/help',
    });
  },

  onMessage: function (e) {
    wx.navigateTo({
      url: '../message/message',
    })
  },

  onAdd: function () {
    wx.navigateTo({
      url: '../diary/diary-book-editor/diary-book-editor'
    });
  }
})