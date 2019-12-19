wx.cloud.init();
wx.clearStorageSync();
wx.showLoading({
  title: 'Loading poems ...',
  mask: true
});

App({
  onLaunch: function(options) {
    // Triggered after the Mini Program starts
  }
})