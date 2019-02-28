# React Touch Base

基于`React` `React router 4` `antd-mobile`的移动端基础框架

### 路由缓存
利用`router 4`自带的exact属性实现路由缓存

原理其实很简单，就是利用了exact属性，例如：

A页面路径为: /a
B页面路径为: /a/b

将A页面Route的`exact`属性设为`false`,

当前浏览器中路径为 /a/b

这时会匹配到/a 和 /a/b两个页面

判断这时页面路径与当前页面路径是否一致，如果不一致的话使用CSS的`transform`属性将页面移出当前可视区
### react hooks
利用react v16.8.1提供的新特性 hooks 编写组件

