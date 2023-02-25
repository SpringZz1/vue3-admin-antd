# vue3-admin-antd

## 简介
[Vue-admin-antd](https://github.com/SpringZz1/vue3-admin-antd)基于<code>Vue3、Vite3、Pinia和antd Vue</code>等最新前端技术栈的后台管理模板, 是我第一个较为完整的项目, 可供简单的个人项目和中小型项目启动使用

## 功能
&#x1F340;集成[antd-Vue](https://www.antdv.com/components/overview)  
&#x1F34C;集成登录、注销及权限注销  
&#x1F353;集成<code>eslint + prettier</code>, 代码约束和格式化统一  
&#x1F349;集成<code>mock</code>接口服务, 方便在前后端分离时调试代码  
&#x1F34D;集成<code>pinia</code>,vue3官方推荐的数据持久化方案, 轻量、简单、易用

## 快速开始
```
# 克隆项目
git clone https://github.com/SpringZz1/vue3-admin-antd.git

# 进入项目目录
cd vue-admin-antdv

# 安装依赖
npm install

# 启动
npx vite --port=4000
```

### 目录说明
```
vue3-admin-antd  
├── README.md                               // 文件说明
├── index.html                              
├── mock                                    // mock
│   │
│   ├── index.js                            // mock文件的出口
│   ├── modules                             // mock模块 
│   │   ├── index.js                        
│   │   ├── login.js                        // 登录相关api
│   │   └── user.js                         // 用户信息相关api
│   └── utils.js                            // mock请求需要用到的工具方法
├── package-lock.json                       // 依赖锁定文件
├── package.json                            // 依赖描述文件
├── public                                  // 公共资源, 文件夹下的文件会在被打包后直接加入到dist根目录下
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── api                                 // 公共api
│   │   └── config.js
│   ├── assets                              // 静态资源
│   │   ├── base.css
│   │   ├── images                          // 图片
│   │   ├── logo.svg
│   │   ├── main.css                        // 全局css
│   │   └── svg
│   ├── components                          // 全局组件
│   │   ├── common                          // 公共组件
│   │   └── icons                           // icon相关组件
│   ├── layout                              // 菜单基本布局
│   │   ├── components                      // 布局相关组件
│   │   └── index.vue
│   ├── main.js
│   ├── router                              // 路由
│   │   ├── guard                           // 路由守卫
│   │   ├── index.js
│   │   └── routes                          // 路由守卫
│   ├── store                               // 状态管理(pinia)
│   │   ├── index.js
│   │   └── modules                         // 模块
│   ├── styles                              // 全局css文件
│   │   ├── global.css
│   │   └── reset.css
│   ├── utils                               // 全局工具类函数
│   │   ├── index.js
│   │   ├── request                         // 封装axios
│   │   ├── storage                         // 封装存储类
│   │   └── token                           // 封装token方法
│   └── views                               // 页面
│       ├── error-page                      // 错误页
│       ├── login                           // 登录页
│       ├── multimenu                       // 多级菜单
│       └── workbench                       // 工作台
└── vite.config.js                          // vite配置
```
## 未来计划
- 学习多环境配置相关内容, 集成多环境配置、测试、生产环境
- 学习并且集成使用<code>unoss</code>
- 学习使用<code>TypeScript</code>, 使用<code>TypeScript</code>重构项目