import { getAuth } from './auth.js'
import init from './init.js'
import { getDeviceMessage, getOSAndBrowser } from './sysAndDevice.js'
import { uploadMessage } from './upload.js'

class Maidian {
  constructor(url, config) {
    /**
     * @param {Object} config
     * {
     *  authType: '', // 用户信息存储位置  none cookie localStorage sessionStorage other
     *  authName: '', // 用户信息key
     * }
     */
    console.log(config)
    this.config = config // 传入的设置
    this.uploadUrl = url // 上报地址
    this.nowLocation = null // 当前路由
    this.broswer = null // 浏览器类型
    this.sys = null // 当前系统
    this.app = null
    this.u = null
    this.broswerVersion = null // 浏览器版本号
    this.broswerLang = null // 浏览器语言
    this.deviceBrowser = null // 浏览器内核
    this.deviceDetail = null // 设备详情
    this.uploadMsg = null
  }

  /**
   * 描述 初始化埋点
   * @date 2021-02-07
   * @returns {any}
   */
  init() {
    init(this)
  }

  /**
   * 描述 获取设备信息
   * @date 2021-02-07
   * @returns {any}
   */
  getDeviceMessage() {
    getDeviceMessage(this)
  }

  /**
   * 描述 监听埋点开始统计
   * @date 2021-02-07
   * @returns {any}
   */
  start() {
    this.sendMsg()
  }

  /**
   * 描述 埋点上报
   * @date 2021-02-07
   * @returns {any}
   */
  sendMsg() {
    uploadMessage(this)
  }

  /**
   * 描述 获取浏览器版本
   * @date 2021-02-05
   * @returns {any} info
   */
  getOSAndBrowser() {
    getOSAndBrowser(this)
  }

  /**
   * 描述 获取用户相关信息
   * @date 2021-02-07
   * @returns {String} auth
   */
  getAuthMessage() {
    getAuth(this)
  }

  handleEvent(type, others){
    const evt = {
      sys: {
        broswer: this.broswer, // 浏览器型号
        browserLang: this.broswerLang, // 浏览器语言
        broswerVersion: this.broswerVersion, // 浏览器版本
        sys: this.sys, // 当前系统
      },
      et: {
        auth: this.getAuthMessage(), // 当前用户信息
        evtTime: new Date().getTime(), // 事件发生事件
        evtType: type, // 事件类型
        evtPath: this.nowLocation, // 事件路由
        others
      },
    }
    this.uploadMsg = evt
    this.sendMsg()
  }

}

export default Maidian
