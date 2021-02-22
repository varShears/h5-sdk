# blueSword h5 埋点sdk
---
## 介绍

1. 为h5提供了相关sdk引入方案
2. 提供了无埋点方案，对路由做了监听，能够响应点击事件，并将点击事件上报到服务器
3. 提供了手动埋点的入口，可以通过手动的方式进行自定义埋点

## 使用
sdk引入：

1. umd
   ```
    // 执行run build后将打包后的文件以script的方式引入
    <script src="xxx.ks"></script>
   ```
2. npm 
   ```
   npm install bs-h5sdk
   ```

执行完后实例化Maidian，即可使用，提供了无埋点方式 init方法，也提供了手动埋点方式 handleEvent 参数 为 type 和 others ，前者为事件类型，后者为自定义事件携带参数

