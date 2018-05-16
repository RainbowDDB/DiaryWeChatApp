// pages/diary/diary-library/diary-library.js
Page({
  data: {
    
  },

  onLoad: function (options) {
    
  },

  onSearch: function (event) {
    var content = event.detail.value;
    console.log(content);
    // 网络请求搜索...搜索中UI提示！！！，跳到详情界面

  },

  onPick: function (event) {
    // 网络请求捡一个...
  }
})