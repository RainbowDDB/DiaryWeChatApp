const app = getApp();
var globalData = app.globalData;
var util = require('../../../../utils/util.js');
var diary_util = require('../../../../utils/diary-util.js');

Page({
  data: {
    diaryId: '',
    diaryType: '',
    isDate: false,
    isSingleDiary: true,
    scrollHeight: '',
    diary_border: '/images/icon/diary-border.jpg',
    pageNumber: 1,
    timeline: [],
    diaryList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var diaryId = options.diaryId;
    var diaryName = options.diaryName;
    var diaryType = options.diaryType;
    var text = wx.getStorageSync('text');
    var height = util.getPageHeight();
    this.setData({
      scrollHeight: height,
      diaryId: diaryId,
      diaryType: diaryType,
    })

    wx.setNavigationBarTitle({
      title: diaryName,
    })
  },

  onShow: function () {
    // onShow中获取日记
    var diaryId = this.data.diaryId;
    diary_util.getDoubleDiary(this, diaryId);
  },

  onPageChange: function (event) {
    this.setData({
      pageNumber: event.detail.current + 1,
    })
  },

  onDay: function (event) {
    // 查看某一天的日记内容
  },

  onEdit: function (event) {
    // 先判断，再编辑
    var date = new Date();
    var timeline = this.data.timeline;
    if (timeline.length != 0) {
      // 如果之前此日记本已有日记
      var lastTime = timeline[timeline.length - 1];
      if ((date.getDate() == lastTime.day) && (date.getMonth() + 1 == lastTime.month)) {
        util.showWarning('今天已经写了哦');
      } else {
        wx.navigateTo({
          url: '../../diary-detail-editor/diary-detail-editor?diaryId=' + this.data.diaryId + '&diaryType=' + this.data.diaryType,
        });
      }
    } else {
      // 如果是第一次打开，还未写日记 
      wx.navigateTo({
        url: '../../diary-detail-editor/diary-detail-editor?diaryId=' + this.data.diaryId + '&diaryType=' + this.data.diaryType,
      });
    }
  },

  onDelete: function () {
    // 删除
    var that = this;
    wx.showModal({
      title: '确认删除？',
      content: '删除之后，这一天的日记将不复存在！',
      cancelText: '不忍心~',
      confirmText: '忍痛删除',
      confirmColor: '#FF0000',
      success: function (res) {
        if (res.confirm) {
          diary_util.deleteDiary(that);
        }
      }
    });
  }
})