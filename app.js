//app.js
App({
  onLaunch: function () {

    // 获取用户是否授权了个人信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              var userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回  
              // 所以此处加入 callback 以防止这种情况  
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              // 登录
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  console.log('成功获取用户信息-->');
                  console.log(userInfo);
                  if (res.code) {
                    // 发起网络请求
                    // 获取用户信息
                    wx.request({
                      url: this.globalData.url + 'setUser.php',
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
                        console.log('cookie缓存设置,用户信息上传服务器成功-->');
                        console.log(res.data);
                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
            }
          })
        }
      }
    })


  },

  globalData: {
    userInfo: null,
    height: null,
    url: 'http://120.79.143.94/WechatAppDiary/Api/'
  }
})