Component({
  properties: {
    showModal: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    // 这里是一些组件内部数据  
    mood: '',
    isMoodSetting: false,
  },

  methods: {
    // 这里放置自定义方法
    onMoodChange: function (event) {
      var mood = event.detail.value;
      this.setData({
        mood: mood,
        isMoodSetting: true
      });
      //console.log(this.data.mood);
    },

    hideModal: function () {
      this.setData({
        showModal: false,
      });
      this.triggerEvent('isshowmodal',this.data.showModal);
    },

    onCancel: function () {
      this.setData({
        mood: '',
      });
      this.hideModal();
    },

    onConfirm: function (event) {
      var detail = {
        mood: this.data.mood,
        isMoodSetting: this.data.isMoodSetting,
      }
      this.triggerEvent('moodchange', detail);
      this.hideModal();
    }
  }
})  