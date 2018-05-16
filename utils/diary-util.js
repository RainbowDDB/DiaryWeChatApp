const app = getApp();
var globalData = app.globalData;

function setDiary(that, diaryType, text) {
  var cookie = wx.getStorageSync('cookie');
  var images = that.data.images;
  if (diaryType == 'single') {
    wx.request({
      url: globalData.url + 'setDiary.php',
      method: 'POST',
      data: {
        diary_id: that.data.diaryId,
        time: that.data.time,
        mood: that.data.mood,
        text: text,
        weather: that.data.weather.name,
      },
      header: {
        cookie: cookie,
      },
      success: function (res) {
        console.log('日记内容上传-->');
        console.log(res.data);
        wx.showToast({
          title: '日记上传成功！',
          icon: 'success',
        });
        // 两秒之后返回上一编辑页面
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          });
        }, 2000);
      }
    })

    // 视频以及录音未弄，之后补
    // var video = media.video;
    for (var i = 0; i < images.length; i++) {
      console.log('上传图片-->' + i);
      wx.uploadFile({
        url: globalData.url + 'setDiaryImg.php',
        filePath: images[i].src,
        header: {
          cookie: cookie,
        },
        formData: {
          diary_id: that.data.diaryId,
          time: that.data.time,
        },
        name: 'file',
        success: function (res) {
          console.log('日记图片上传-->');
          console.log(res.data);
        }
      })
    }
  } else if (diaryType == 'double') {
    wx.request({
      url: globalData.url + 'setMDiary.php',
      method: 'POST',
      data: {
        diary_id: that.data.diaryId,
        time: that.data.time,
        mood: that.data.mood,
        text: text,
        weather: that.data.weather.name,
      },
      header: {
        cookie: cookie,
      },
      success: function (res) {
        console.log('日记内容上传-->');
        console.log(res.data);
        wx.showToast({
          title: '日记上传成功！',
          icon: 'success',
        });
        // 两秒之后返回上一编辑页面
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          });
        }, 2000);
      }
    })

    // 视频以及录音未弄，之后补
    // var video = media.video;
    for (var i = 0; i < images.length; i++) {
      console.log('上传图片-->' + i);
      wx.uploadFile({
        url: globalData.url + 'setMDiaryImg.php',
        filePath: images[i].src,
        header: {
          cookie: cookie,
        },
        formData: {
          diary_id: that.data.diaryId,
          time: that.data.time,
        },
        name: 'file',
        success: function (res) {
          console.log('日记图片上传-->');
          console.log(res.data);
        }
      })
    }
  }

}

function getDiarys(that) {
  var cookie = wx.getStorageSync('cookie')
  wx.request({
    url: globalData.url + 'getDiarys.php',
    method: 'GET',
    header: {
      cookie: cookie,
    },
    success: function (res) {
      console.log('成功获取日记本数据-->');
      console.log(res.data);
      if (res.statusCode == 200) {
        that.setData({
          diary_key: res.data
        })
      }
    }
  });
}

function getSingleDiary(that, diaryId) {
  var cookie = wx.getStorageSync('cookie');
  wx.request({
    url: globalData.url + 'getDiary.php',
    method: 'POST',
    data: {
      diary_id: diaryId,
    },
    header: {
      cookie: cookie,
    },
    success: function (res) {
      var data = res.data;
      console.log('获取单人日记内容-->');
      console.log(data);
      if (data.code == 201) {
        that.setData({
          timeline: data.timeLine,
          diaryList: data.data,
        })
      }
    }
  });
}

function getDoubleDiary(that, diaryId) {
  var cookie = wx.getStorageSync('cookie');
  wx.request({
    url: globalData.url + 'getMDiary.php',
    method: 'POST',
    data: {
      diary_id: diaryId,
    },
    header: {
      cookie: cookie,
    },
    success: function (res) {
      var data = res.data;
      console.log('获取双人日记内容-->');
      console.log(data);
      if (data.code == 201) {
        that.setData({
          timeline: data.timeLine,
          diaryList: data.data,
        })
      }
    }
  });
}

function deleteDiary(that) {
  var diaryId = that.data.diaryId;
  var diaryType = that.data.diaryType;
  var cookie = wx.getStorageSync('cookie');
  wx.request({
    url: globalData.url + 'deleteDiary.php',
    header: {
      cookie: cookie,
    },
    data: {
      diary_id: diaryId,
      diary_type: diaryType,
      time: that.data.diaryList[that.data.pageNumber - 1].time,
    },
    method: 'POST',
    success: function (res) {
      console.log('删除成功-->');
      console.log(res.data);
      // 成功
      if (res.data.code == 201) {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        });
        diary_util.getSingleDiary(that, diaryId);
      }
    }
  })
}

module.exports = {
  setDiary: setDiary,
  getDiarys: getDiarys,
  getSingleDiary: getSingleDiary,
  getDoubleDiary: getDoubleDiary,
  deleteDiary: deleteDiary,
}