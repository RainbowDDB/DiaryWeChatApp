var util = require('../../../../utils/util.js');

function record(that) {
  if (that.data.isRecording && that.data.isEnding) {
    // 停止录音
    that.setData({
      isEnding: false,
    });
    util.stopRecord();
  } else if (!that.data.isRecording) {
    // 开始录音
    that.setData({
      isRecording: true,
    });

    util.startRecord(that);
  } else {
    // 重录
    that.setData({
      isEnding: true,
      minutes: '0',
      seconds: '00',
    });
    // 先停止再开始
    util.stopRecord();
    util.startRecord(that);
  }
}

function showModal(that) {
  wx.showModal({
    title: '提示',
    content: '您未授权录音，功能将无法使用',
    showCancel: true,
    confirmText: "授权",
    confirmColor: "#00bfff",
    success: function (res) {
      if (res.confirm) {
        //确认则打开设置页面（重点）
        wx.openSetting({
          success: (res) => {
            console.log(res.authSetting);
            if (!res.authSetting['scope.record']) {
              //未设置录音授权
              console.log("未设置录音授权");
              wx.showModal({
                title: '提示',
                content: '您未授权录音，功能将无法使用',
                showCancel: false,
                success: function (res) {

                },
              })
            } else {
              //第二次才成功授权
              console.log("设置录音授权成功");
              that.setData({
                status: 1,
              })

            }
          },
          fail: function () {
            console.log("授权设置录音失败");
          }
        })
      }
    },
    fail: function (res) {
      console.log(res);
    }
  })
}

Page({
  data: {
    isPlayingVoice: false,
    isEnding: true,
    isRecording: false,
    minutes: '0',
    seconds: '00',
    status: 0,              // 判断是否录音授权 0:未授权
    tempFilePath: '',
  },

  onLoad: function (options) {
    var that = this;
    // 授权
    wx.authorize({
      scope: 'scope.record',
      success: function () {
        //第一次成功授权后 状态切换为1
        that.setData({
          status: 1,
        })
      },
      fail: function () {
        showModal(that);
      }
    });
    var sound = options.sound;
    console.log('由编辑页面传来的录音文件临时路径为-->');
    console.log(sound);
  },

  onRecord: function () {
    var that = this;
    if (this.data.status) {
      record(this);
    } else {
      showModal(that);
    }
  },

  onPlay: function () {
    var isPlaying = this.data.isPlayingVoice;
    var tempFilePath = this.data.tempFilePath;
    this.setData({
      isPlayingVoice: isPlaying ? false : true,
    });
    if (!isPlaying) {
      wx.playVoice({
        filePath: tempFilePath,
      });
    } else {
      wx.pauseVoice();
    }
  },

  onSubmit: function () {
    // 返回并传参
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      sound: this.data.tempFilePath,
    });
    wx.navigateBack({
      // 返回上一页面
      delta: 1,
    });
  }
})