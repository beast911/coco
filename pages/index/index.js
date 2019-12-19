// index/index.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  splitLine: function (line) {
    const splittedLines = line.split(' \\ ');
    return {
      "english": splittedLines[0],
      "chinese": splittedLines[1]
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    let that = this;
    wx.cloud.database().collection('coco').get().then(res => {
      wx.hideLoading();
      that.preparePoems(res.data[0].poems);
    });
  },

  preparePoems: function(rawPoems) {
    const rawPoemsSorted = rawPoems.sort(function (current, next) {
      return current.content.length - next.content.length
    });
    let poemsForDisplay = [];
    for (let i = 0; i < rawPoemsSorted.length; i++) {
      const doubleTitles = this.splitLine(rawPoemsSorted[i].title);
      const poemContent = rawPoemsSorted[i].content;
      let doubleContent = [];
      for (let j = 0; j < poemContent.length; j++) {
        const content = this.splitLine(poemContent[j]);
        doubleContent.push(content);
      }
      const dispPoemObj = {
        "title": doubleTitles,
        "content": doubleContent,
        //"video": poemContent[i].video
      }
      if (rawPoemsSorted[i].video) {
        dispPoemObj.video = rawPoemsSorted[i].video;
      }
      poemsForDisplay.push(dispPoemObj);
    }
    wx.setStorageSync("poems", poemsForDisplay);
    this.data = {};
    this.data.poems = poemsForDisplay;
    this.setData(this.data);
  },

  loadPoem: function(e) {
    wx.navigateTo({
      url: '../poem/poem?poem=' + e.currentTarget.id
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})