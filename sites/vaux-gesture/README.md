# VAUX — Beyond Touch

AUX Gesture Wearable 的中英文产品网站原型，探索以自然动作替代屏幕触控的下一代 Human Interface。

- 在线版本：[vaux-beyond-touch-gesture.copperguild.chatgpt.site](https://vaux-beyond-touch-gesture.copperguild.chatgpt.site/)
- 简短演示：[docs/vaux-demo.mp4](docs/vaux-demo.mp4)

## 启动方式

需要 Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

默认访问 `http://127.0.0.1:5173`。

如需测试本地 Waitlist，先构建并应用 D1 迁移：

```bash
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_luxuriant_pyro.sql
npm run dev
```

## 技术选择

- Vinext / React 19 / TypeScript：统一页面、API 与 Cloudflare Worker 部署。
- 原生 CSS、SVG 与 Canvas：实现黑银视觉、响应式产品图和实时粒子交互，避免引入重型 3D 依赖。
- MediaDevices API：在浏览器本地分析低分辨率画面变化，以摄像头动作控制 Express 粒子。
- Cloudflare D1 + Drizzle ORM：持久化 Waitlist，并通过唯一索引处理重复邮箱。
- Zod：服务端邮箱及兴趣类型校验。

## 已实现内容

- 中英文一键切换，覆盖导航、产品叙事、场景、开发者与 Waitlist。
- Touch → Gesture → Movement 品牌叙事与响应式概念硬件展示。
- Create：模拟拍照、录像和 REC 状态。
- Express：鼠标、触摸及可选摄像头动作控制的实时粒子场。
- Control：滑动切换设备、焦点高亮与确认反馈。
- Developers：概念 API 与 Gesture Input → Action Mapping → Creative Experience 流程。
- Waitlist：真实保存、格式校验、兴趣分类、大小写标准化、重复提交去重及错误反馈。
- 桌面端与 390px 手机端适配，并支持 `prefers-reduced-motion`。

## 已知限制

- 所有硬件、SDK 与跨设备能力均为概念演示，不代表已经发布的 AUX 产品能力。
- 摄像头模式采用本地画面变化追踪，不是手部关键点识别或机器学习手势模型；视频不会上传。
- 摄像头需要 HTTPS 或 localhost，并需要用户主动授权。
- 当前线上版本为私有 Site，访问者需要使用 ChatGPT 登录。
- Waitlist 未包含邮件发送、管理后台和生产级限流。

## 实际投入时间

约 30 分钟，包含产品叙事、视觉实现、三个交互场景、双语与摄像头功能、Waitlist 数据库、响应式验收及三轮上线迭代；不包含前期需求讨论时间。
