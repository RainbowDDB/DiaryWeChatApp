var util = require('../../../utils/util.js');
Page({

  data: {
    height: '',
    item: {
      diary_name: '',
      cover: '/images/icon/diary-cover-default.jpg',
    },

    radioItems: [
      { name: 'single', value: '单人', checked: 'true' },
      { name: 'double', value: '双人' },
    ],
    tempFilePaths: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var height = util.getPageHeight();
    this.setData({
      height: height,
    })
  },

  onNameChange: function (event) {
    var diary_name = event.detail.value;
    this.setData({
      item: {
        diary_name: diary_name,
        cover: this.data.item.cover,
      },
    })
  },

  onCoverChange: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: 'compressed', // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          item: {
            cover: res.tempFilePaths[0],
            diary_name: that.data.item.diary_name,
          }
        });
      }
    })
  },

  onSubmit: function (event) {
    var res = event.detail.value;
    var cookie = wx.getStorageSync('cookie');
    if (res.diary_name) {
      // 上传图片，日记名称和日记类型
      console.log(this.data.item.cover);
      wx.uploadFile({
        url: 'http://120.79.143.94/WechatAppDiary/Api/setDiarys.php',
        filePath: this.data.item.cover,
        name: 'file',
        formData: {
          diary_type: res.diary_type,
          diary_name: res.diary_name,
        },
        header: {
          cookie: cookie,
        },
        success: function (res) {
          // 蜜汁bug，需要先解析才行，stm
          var data = JSON.parse(res.data);
          console.log('上传日记本状态码-->  '+data.code)
          if (data.code == 201) {
            wx.navigateBack({
              // 返回上一页面
              delta: 1,
            })
          } else {
            util.showWarning('添入失败请重试');
          }
        },
        fail: function (res) {
          console.log('接口调用失败-->');
          console.log(res);
        }
      })
    } else {
      util.showWarning('日记名不能为空');
    }
  }
})