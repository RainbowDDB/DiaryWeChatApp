const app = getApp();
var globalData = app.globalData;
var util = require('../../../utils/util.js');
var diary_util = require('../../../utils/diary-util.js');
var data = require('../../../data/local-data.js');
var global_mood;
var weatherList = data.weatherList;

Page({
  data: {
    diaryId: '',
    diaryType: '',
    showModal: false,
    mood: '',
    time: '',
    isMoodSetting: false,
    weather: {
      name: '多云',
      src: '/images/icon/weather/weather-cloudy.png',
    },
    images: [],
    sound: '',
    video: '',
    text: '',
  },

  onLoad: function (options) {
    // 传入获取几天的日期，返回数组，值是日期，时间和星期几 
    var day = util.formatDay();
    var week = util.formatWeek();
    var diaryId = options.diaryId;
    var diaryType = options.diaryType;
    //var diaryId = options
    this.setData({
      time: day + ' ' + week,
      diaryId: diaryId,
      diaryType: diaryType,
    });
  },

  onChooseImage: function () {
    // 将数组转化为字符串的形式进行页面传参
    var images = JSON.stringify(this.data.images);
    wx.navigateTo({
      url: 'image-editor/image-editor?images=' + images,
    });

  },

  onRecord: function () {
    wx.navigateTo({
      url: 'record-editor/record-editor?sound=' + this.data.sound,
    })
  },

  onChooseVideo: function () {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          item: {
            video: res.tempFilePath,
          }
        });
      }
    });
  },

  onMood: function () {
    // 改变心情（表情)
    this.setData({
      showModal: true,
    })
  },

  onMoodChange: function (event) {
    var result = event.detail;
    this.setData({
      mood: result.mood,
      isMoodSetting: result.isMoodSetting,
    });
  },

  // conponent中数据的双向绑定
  onIsShowModal: function (event) {
    this.setData({
      showModal: event.detail
    });
  },

  onWeatherChange: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['多云', '晴', '雨', '雪', '大风', '雷'],
      success: function (res) {
        that.setData({
          weather: {
            name: weatherList[res.tapIndex].name,
            src: weatherList[res.tapIndex].src,
          }
        });
      }
    });
  },

  // 通过数据双向绑定保证 textarea 的层级影响bug
  onTextChange: function (event) {
    this.setData({
      text: event.detail.value,
    })
  },

  formSubmit: function (event) {
    var diaryType = this.data.diaryType;
    var text = event.detail.value.textarea;
    diary_util.setDiary(this, diaryType, text);

  },

})