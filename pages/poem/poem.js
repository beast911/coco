// poem/poem.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Split line and content
   */
  splitLine: function(line) {
    const splittedLines = line.split('  \\ ');
    return {
      "english": splittedLines[0],
      "chinese": splittedLines[1]
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    this.data = {};
    let storedPoems = wx.getStorageSync("poems");
    this.data.poem = storedPoems[options.poem];
    this.setData(this.data);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo');
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindPlay: function() {
    this.videoContext.play()
  },
  bindPause: function() {
    this.videoContext.pause()
  },
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  }
})