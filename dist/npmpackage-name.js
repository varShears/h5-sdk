/*!
* bs-h5sdk v1.0.0
* (c) 2021 lingl
*/
'use strict';

function getAuth(_this) {
  var _this$config = _this.config,
      authType = _this$config.authType,
      authName = _this$config.authName;
  if (authType === 'cookie') {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split('; ');
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split('=');
      if (arr[0] === authName) return arr[1];
    }
    return '';
  }
  if (authType === 'sessionStorage') {
    var auth = sessionStorage.getItem(authName);
    return auth;
  }
  if (authType === 'localStorage') {
    var _auth = localStorage.getItem(authName);
    return _auth;
  }
  if (authType === 'none') {
    return '';
  }
}

function init(_this) {
  document.addEventListener('mousedown', function (e) {
    console.log(e);
    var evt = {
      sys: {
        broswer: _this.broswer,
        browserLang: _this.broswerLang,
        broswerVersion: _this.broswerVersion,
        sys: _this.sys
      },
      et: {
        auth: _this.getAuthMessage(),
        evtTime: new Date().getTime(),
        evtType: 'click',
        evtPath: _this.nowLocation
      }
    };
    _this.uploadMsg = evt;
  });
  _this.nowLocation = location;
  console.log(_this.nowLocation);
  console.log(_this.getOSAndBrowser());
  var msg = _this.getOSAndBrowser().split('/');
  _this.broswer = msg[1];
  _this.sys = msg[0];
  _this.broswerVersion = msg[2];
  _this.getDeviceMessage();
  var auth = _this.getAuthMessage();
  console.log(auth);
}

function getDeviceMessage(_this) {
  var u = navigator.userAgent;
  var app = navigator.appVersion;
  var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();
  var deviceBrowser = function () {
    return {
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') === -1,
      weixin: u.indexOf('MicroMessenger') > -1,
      qq: u.match(/\sQQ/i) === ' qq'
    };
  }();
  for (var i in deviceBrowser) {
    if (deviceBrowser[i]) _this.deviceBrowser = i;
  }
  console.log('u', u);
  console.log('app', app);
  console.log('browserLang', browserLang);
  console.log('deviceBrowser', _this.deviceBrowser);
  _this.app = app;
  _this.u = u;
  _this.broswerLang = browserLang;
}
function getOSAndBrowser(_this) {
  var os = navigator.platform;
  var userAgent = navigator.userAgent;
  console.log(userAgent);
  var info = '';
  var tempArray = '';
  if (os.indexOf('Win') > -1) {
    if (userAgent.indexOf('Windows NT 5.0') > -1) {
      info += 'Windows 2000';
    } else if (userAgent.indexOf('Windows NT 5.1') > -1) {
      info += 'Windows XP';
    } else if (userAgent.indexOf('Windows NT 5.2') > -1) {
      info += 'Windows 2003';
    } else if (userAgent.indexOf('Windows NT 6.0') > -1) {
      info += 'Windows Vista';
    } else if (userAgent.indexOf('Windows NT 6.1') > -1 || userAgent.indexOf('Windows 7') > -1) {
      info += 'Windows 7';
    } else if (userAgent.indexOf('Windows NT 6.2') > -1 || userAgent.indexOf('Windows NT 6.3') > -1 || userAgent.indexOf('Windows 8') > -1) {
      info += 'Windows 8';
    } else if (userAgent.indexOf('Windows NT 6.4') > -1 || userAgent.indexOf('Windows NT 10') > -1) {
      info += 'Windows 10';
    } else {
      info += 'Other';
    }
  } else if (os.indexOf('Mac') > -1) {
    info += 'Mac';
  } else if (os.indexOf('X11') > -1) {
    info += 'Unix';
  } else if (os.indexOf('Linux') > -1) {
    info += 'Linux';
  } else {
    info += 'Other';
  }
  info += '/';
  if (/[Ff]irefox(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Ff]irefox)\/(\d+\.\d+)/.exec(userAgent);
    info += tempArray[1] + '/' + tempArray[2];
  } else if (/[Tt]rident(\/\d+\.\d+)/.test(userAgent)) {
    tempArray = /([Tt]rident)\/(\d+\.\d+)/.exec(userAgent);
    if (tempArray[2] === '7.0') {
      tempArray[2] = '11';
    } else if (tempArray[2] === '6.0') {
      tempArray[2] = '10';
    } else if (tempArray[2] === '5.0') {
      tempArray[2] = '9';
    } else if (tempArray[2] === '4.0') {
      tempArray[2] = '8';
    }
    tempArray[1] = 'IE';
    info += tempArray[1] + '/' + tempArray[2];
  } else if (/[Cc]hrome\/\d+/.test(userAgent)) {
    tempArray = /([Cc]hrome)\/(\d+)/.exec(userAgent);
    info += tempArray[1] + '/' + tempArray[2];
  } else if (/[Vv]ersion\/\d+\.\d+\.\d+(\.\d)* *[Ss]afari/.test(userAgent)) {
    tempArray = /[Vv]ersion\/(\d+\.\d+\.\d+)(\.\d)* *([Ss]afari)/.exec(userAgent);
    info += tempArray[3] + '/' + tempArray[1];
  } else if (/[Oo]pera.+[Vv]ersion\/\d+\.\d+/.test(userAgent)) {
    tempArray = /([Oo]pera).+[Vv]ersion\/(\d+)\.\d+/.exec(userAgent);
    info += tempArray[1] + '/' + tempArray[2];
  } else {
    info += 'unknown';
  }
  return info;
}

function uploadMessage(_this) {
  var xhr = new XMLHttpRequest();
  var uploadUrl = _this.url;
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.open('POST', uploadUrl, true);
  xhr.send(JSON.stringify(_this.uploadMsg));
}

var Maidian = function () {
  function Maidian(url, config) {
    console.log(config);
    this.config = config;
    this.uploadUrl = url;
    this.nowLocation = null;
    this.broswer = null;
    this.sys = null;
    this.app = null;
    this.u = null;
    this.broswerVersion = null;
    this.broswerLang = null;
    this.deviceBrowser = null;
    this.deviceDetail = null;
    this.uploadMsg = null;
  }
  var _proto = Maidian.prototype;
  _proto.init = function init$1() {
    init(this);
  }
  ;
  _proto.getDeviceMessage = function getDeviceMessage$1() {
    getDeviceMessage(this);
  }
  ;
  _proto.start = function start() {
    this.sendMsg();
  }
  ;
  _proto.sendMsg = function sendMsg() {
    uploadMessage(this);
  }
  ;
  _proto.getOSAndBrowser = function getOSAndBrowser$1() {
    getOSAndBrowser();
  }
  ;
  _proto.getAuthMessage = function getAuthMessage() {
    getAuth(this);
  };
  _proto.handleEvent = function handleEvent(type, others) {
    var evt = {
      sys: {
        broswer: this.broswer,
        browserLang: this.broswerLang,
        broswerVersion: this.broswerVersion,
        sys: this.sys
      },
      et: {
        auth: this.getAuthMessage(),
        evtTime: new Date().getTime(),
        evtType: type,
        evtPath: this.nowLocation,
        others: others
      }
    };
    this.uploadMsg = evt;
    this.sendMsg();
  };
  return Maidian;
}();

module.exports = Maidian;
