const app = getApp();
var globalData = app.globalData;
var timer;

// 获取当前时间多少天后的日期和对应星期
function getDates() {
  var todate = getCurrentMonthFirst()
  var dateArry = [];
  var dateObj = dateLater(todate, 0);
  dateArry.push(dateObj);
  return dateArry;
}

/**
   * 传入时间后几天
   * param：传入时间：dates:"2018-04-02",later:往后多少天
   */
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  dateObj.year = date.getFullYear();
  dateObj.month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth());
  dateObj.day = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.week = show_day[day];
  return dateObj;
}

// 获取当前时间
function getCurrentMonthFirst() {
  var date = new Date();
  var todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return todate;
}

function formatDay() {
  var time = getDates();
  var month = time[0].month;
  var year = time[0].year;
  var day = time[0].day;
  return year + '-' + month + '-' + day;
}

function formatWeek() {
  var time = getDates();
  return time[0].week;
}

function getPageHeight() {
  var height;
  wx.getSystemInfo({
    success: function (res) {
      height = res.windowHeight;
    },
  });
  return height;
}


function showWarning(title) {
  wx.showToast({
    title: title,
    image: '/images/icon/warning.png'
  })
}

function startRecord(that) {
  that.setData({
    tempFilePath: '',
  })
  wx.startRecord({
    success: function (res) {
      that.setData({
        tempFilePath: res.tempFilePath,
      })
    },
    fail: function (res) {
      // 录音失败
      console.log(res);
    }
  });
  timer = setInterval(function () {
    var seconds = parseInt(that.data.seconds);
    if (seconds == 60) {
      that.setData({
        minutes: '1',
        seconds: '00',
        isEnding: false,
        isPlayingVoice: false,
      });
      clearInterval(timer);
      wx.stopRecord();
      return;
    }
    seconds = seconds + 1;
    if (seconds < 10) {
      seconds = 0 + (seconds.toString());
    }
    else {
      seconds = seconds.toString();
    }
    that.setData({
      seconds: seconds,
    });
  }, 1000);
}

function stopRecord() {
  clearInterval(timer);
  wx.stopRecord();
}

module.exports = {
  formatDay: formatDay,
  formatWeek: formatWeek,
  getPageHeight: getPageHeight,
  showWarning: showWarning,
  startRecord: startRecord,
  stopRecord: stopRecord,
}
