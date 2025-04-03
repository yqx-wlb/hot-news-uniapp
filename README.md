# Hot News UniApp

基于 UniApp 开发的热点新闻聚合应用，实时获取各大平台热点信息。

## 功能特点

- 支持多平台热点聚合：

  - 知乎热榜
  - 36 氪热榜
  - 百度热点
  - B 站热榜
  - 微博热搜
  - 抖音热点
  - 虎扑热榜
  - 豆瓣热榜
  - IT 新闻

- 实时数据更新
- 支持多端运行（H5、小程序、App）
- 优雅的 UI 设计
- 支持数据本地缓存

## 技术栈

- UniApp
- Vue 3
- TypeScript
- Vite
- Pinia

## 开发环境要求

- Node.js >= 16
- HBuilderX

## 安装和运行

1. 克隆项目

```bash
git clone [repository-url]
```

2. 安装依赖

```bash
npm install
# 或
yarn install
```

3. 开发模式运行

```bash
# H5
npm run dev:h5

# 微信小程序
npm run dev:mp-weixin
```

4. 打包

```bash
# H5
npm run build:h5

# 微信小程序
npm run build:mp-weixin
```

## 项目结构

```
hot-news-uniapp/
├── src/
│   ├── pages/          # 页面文件
│   ├── components/     # 组件
│   ├── stores/         # Pinia 状态管理
│   ├── utils/          # 工具函数
│   ├── types/          # TypeScript 类型定义
│   └── App.vue         # 应用入口
├── static/             # 静态资源
├── manifest.json       # UniApp 配置
└── package.json        # 项目依赖
```

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (git checkout -b feature/AmazingFeature)
3. 提交你的改动 (git commit -m 'Add some AmazingFeature')
4. 推送到分支 (git push origin feature/AmazingFeature)
5. 创建一个 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件
