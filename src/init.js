function init(_this){
  // 页面添加点击冒泡捕获
  document.addEventListener('mousedown', e=>{
    console.log(e)
    const evt = {
      sys: {
        broswer: _this.broswer, // 浏览器型号
        browserLang: _this.broswerLang, // 浏览器语言
        broswerVersion: _this.broswerVersion, // 浏览器版本
        sys: _this.sys, // 当前系统
      },
      et: {
        auth: _this.getAuthMessage(), // 当前用户信息
        evtTime: new Date().getTime(), // 事件发生事件
        evtType: 'click', // 事件类型
        evtPath: _this.nowLocation, // 事件路由
      },
    }
    _this.uploadMsg = evt
  })
  // 页面添加路由记录
  _this.nowLocation = location
  console.log(_this.nowLocation)
  console.log(_this.getOSAndBrowser())
  const msg = _this.getOSAndBrowser().split('/')
  _this.broswer = msg[1]
  _this.sys = msg[0]
  _this.broswerVersion = msg[2]
  _this.getDeviceMessage()
  const auth = _this.getAuthMessage()
  console.log(auth)
}

export default init
