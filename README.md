# webapp
用Vue+webpack模拟复现腾讯充值(微信公众号)单页应用,持续开发中


# 安装：  npm install
# 运行：  npm run dev
# 地址:   http://localhost:8080


目录结构

│  .gitignore          # 忽略无需git控制的文件  比如 node_modules
│  package.json        # 项目配置
│  README.md           # 项目说明
│  index.html          # 首页
│  index.tpl           # 首页模板  在发布的时候 执行 PRODUCTION=1 webpack 会生成一个d.html并注入脚本，样式，达到版本控制的目的
│  webpack.config.js   # webpack 配置文件
│
├─node_modules
└─src
    │  app.js          # 启动配置，配置路由，过滤器
    │  app.vue         # 主vue
    │  filters.js      # 过滤器
    │  routers.js      # 路由
    │
    ├─components       # 组件
    │      my-component.vue
    │
    ├─css              # 公用样式
    │      common.css
    │
    └─views            # 页面
            list.vue
