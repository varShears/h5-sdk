export function getDeviceMessage(_this) {
  let u = navigator.userAgent
  let app = navigator.appVersion // appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
  let browserLang = (
    navigator.browserLanguage || navigator.language
  ).toLowerCase() //获取浏览器语言

  let deviceBrowser = (function () {
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') === -1, //是否web应用程序，没有头部和底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信
      qq: u.match(/\sQQ/i) === ' qq', //是否QQ
    }
  })()

  for (let i in deviceBrowser) {
    if (deviceBrowser[i]) _this.deviceBrowser = i
  }

  console.log('u', u)
  console.log('app', app)
  console.log('browserLang', browserLang)
  console.log('deviceBrowser', _this.deviceBrowser)
  _this.app = app
  _this.u = u
  _this.broswerLang = browserLang
  // this.deviceBrowser = deviceBrowser
}

export function getOSAndBrowser(_this) {
  let os = navigator.platform
  let userAgent = navigator.userAgent
  console.log(userAgent)
  let info = ''
  let tempArray = ''
  if (os.indexOf('Win') > -1) {
    if (userAgent.indexOf('Windows NT 5.0') > -1) {
      info += 'Windows 2000'
    } else if (userAgent.indexOf('Windows NT 5.1') > -1) {
      info += 'Windows XP'
    } else if (userAgent.indexOf('Windows NT 5.2') > -1) {
      info += 'Windows 2003'
    } else if (userAgent.indexOf('Windows NT 6.0') > -1) {
      info += 'Windows Vista'
    } else if (
      userAgent.indexOf('Windows NT 6.1') > -1 ||
      userAgent.indexOf('Windows 7') > -1
    ) {
      info += 'Windows 7'
    } else if (
      userAgent.indexOf('Windows NT 6.2') > -1 ||
      userAgent.indexOf('Windows NT 6.3') > -1 ||
      userAgent.indexOf('Windows 8') > -1
    ) {
      info += 'Windows 8'
    } else if (
      userAgent.indexOf('Windows NT 6.4') > -1 ||
      userAgent.indexOf('Windows NT 10') > -1
    ) {
      info += 'Windows 10'
    } else {
      info += 'Other'
    }
  } else if (os.indexOf('Mac') > -1) {
    info += 'Mac'
  } else if (os.indexOf('X11') > -1) {
    info += 'Unix'
  } else if (os.indexOf('Linux') > -1) {
    info += 'Linux'
  } else {
    info += 'Other'
  }
  info += '/'
  if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent)
    info += tempArray[1] + '/' + tempArray[2]
  } else if (/[Tt]rident(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Tt]rident)\/(\d+\.\d+)/.exec(userAgent)
    if (tempArray[2] === '7.0') {
      tempArray[2] = '11'
    } else if (tempArray[2] === '6.0') {
      tempArray[2] = '10'
    } else if (tempArray[2] === '5.0') {
      tempArray[2] = '9'
    } else if (tempArray[2] === '4.0') {
      tempArray[2] = '8'
    }
    tempArray[1] = 'IE'
    info += tempArray[1] + '/' + tempArray[2]
  } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
    tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent)
    info += tempArray[1] + '/' + tempArray[2]
  } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
    tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(
      userAgent
    )
    info += tempArray[3] + '/' + tempArray[1]
  } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
    tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent)
    info += tempArray[1] + '/' + tempArray[2]
  } else {
    info += 'unknown'
  }
  return info
}
