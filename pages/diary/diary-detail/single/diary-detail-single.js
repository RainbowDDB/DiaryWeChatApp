var util = require('../../../../utils/util.js');
var diary_util = require('../../../../utils/diary-util.js');
const app = getApp();
var globalData = app.globalData;

Page({
  data: {
    diaryId: '',
    diaryType: '',
    isDate: true,
    isSingleDiary: true,
    scrollHeight: '',
    diary_border: '/images/icon/diary-border.jpg',
    pageNumber: 1,
    timeline: [],
    diaryList: [],
  },

  onLoad: function (options) {
    var diaryId = options.diaryId;
    var diaryName = options.diaryName;
    var diaryType = options.diaryType;
    var height = util.getPageHeight();
    this.setData({
      scrollHeight: height,
      diaryId: diaryId,
      diaryType: diaryType,
    })
    wx.setNavigationBarTitle({
      title: diaryName,
    });
    // util.getSingleDiary(this, diaryId);
  },

  onShow: function () {
    // onShow中获取日记
    var diaryId = this.data.diaryId;
    diary_util.getSingleDiary(this, diaryId);
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
  },

  onPreview: function (event) {
    var imgSrc = event.currentTarget.dataset.imgsrc;
    var pageNumber = this.data.pageNumber;
    var imgList = this.data.diaryList[pageNumber - 1].content.media.images;
    var images = [];
    for (var i = 0; i < imgList.length; i++) {
      images.push(imgList[i].img);
    }
    console.log(images);
    wx.previewImage({
      current: imgSrc,
      urls: images,
    });
  }
})